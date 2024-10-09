import os
from flask import Flask, request, jsonify
import yaml
from database import add_account, get_account
from dotenv import load_dotenv

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
