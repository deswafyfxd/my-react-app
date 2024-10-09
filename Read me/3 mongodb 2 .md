Got it, we'll stick with MongoDB for database operations. Let's make sure everything is up-to-date and clear.

### Revised Plan: MongoDB Integration Only

1. **`database.py`**: Handles MongoDB operations.
2. **`flask_app.py`**: Updated to use MongoDB based on configuration.
3. **Configuration File**: Toggles MongoDB usage on or off.

### 1. `database.py`

**`database.py`**:
```python
import os
from pymongo import MongoClient

def get_db_connection():
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client['outlook_management']
    return db

def add_account(outlook_account, recovery_email):
    db = get_db_connection()
    db.accounts.insert_one({
        "outlook_account": outlook_account,
        "recovery_email": recovery_email
    })

def get_account(outlook_account):
    db = get_db_connection()
    return db.accounts.find_one({"outlook_account": outlook_account})
```

### 2. `flask_app.py`

**`flask_app.py`**:
```python
import os
from flask import Flask, request, jsonify
import yaml
from database import add_account, get_account

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

### 3. Configuration File

**`.env`**:
```env
USE_DATABASE=true
MONGO_URI=your_mongo_db_uri
```

### Update `requirements.txt`

Ensure `pymongo` is included:
```plaintext
discord.py
requests
pyyaml
Flask
gunicorn
psutil
pymongo
```

### Deployment Steps

1. **Commit Changes**: Ensure all changes are committed.
2. **Push to GitHub**: Push changes to your repository.
3. **Deploy on Render**: Ensure the environment variables `USE_DATABASE` and `MONGO_URI` are set correctly.

This setup will enable you to use MongoDB for data management seamlessly. Let me know how it goes or if you encounter any issues!
