Yes, having a `.env` file is enough to manage your environment variables for the configuration.

### Example `.env` File:
```plaintext
USE_DATABASE=true
MONGO_URI=your_mongo_db_uri
```

This file will store your environment variables. Make sure it is placed at the root level of your project directory (same level as `flask_app.py` and `database.py`).

### Usage in Code:
Use a library like `python-dotenv` to load these environment variables in your application.

1. **Install `python-dotenv`**:
   ```plaintext
   pip install python-dotenv
   ```

2. **Update Your `flask_app.py` to Load `.env`**:
   ```python
   import os
   from flask import Flask, request, jsonify
   from dotenv import load_dotenv
   import yaml
   from database import add_account, get_account

   load_dotenv()  # Load environment variables from .env file

   def create_app():
       app = Flask(__name__)
       use_database = os.getenv('USE_DATABASE', 'false').lower() in ['true', '1']

       @app.route('/')
       def home():
           return "Bot is running!"
       
       @app.route('/api/add_account', methods=['POST'])
       def add_account_route():
           data = request.json
           outlook_account = data.get('outlookAccount')
           recovery_email = data.get('recoveryEmail')
           if not outlook_account or not recovery_email:
               return jsonify({"error": "Invalid input"}), 400
           
           if use_database:
               try:
                   add_account(outlook_account, recovery_email)
                   return jsonify({"message": f"Account {outlook_account} added with recovery email {recovery_email}"})
               except Exception as e:
                   return jsonify({"error": str(e)}), 500
           else:
               try:
                   with open('accounts.yml', 'r') as file:
                       accounts = yaml.safe_load(file) or {}
                   accounts[outlook_account] = recovery_email
                   with open('accounts.yml', 'w') as file:
                       yaml.safe_dump(accounts, file)
                   return jsonify({"message": f"Account {outlook_account} added with recovery email {recovery_email}"})
               except Exception as e:
                   return jsonify({"error": str(e)}), 500
       
       return app

   if __name__ == "__main__":
       app = create_app()
       app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
   ```

This setup will load your environment variables from the `.env` file and use them in your application. Let me know if you need further assistance!
