from flask import Flask, request, jsonify

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        return "Bot is running!"
    
    @app.route('/api/add_account', methods=['POST'])
    def add_account():
        data = request.json
        outlook_account = data.get('outlookAccount')
        recovery_email = data.get('recoveryEmail')
        if not outlook_account or not recovery_email:
            return jsonify({"error": "Invalid input"}), 400
        
        try:
            # Here, you would normally save the account to a database or a file
            return jsonify({"message": f"Account {outlook_account} added with recovery email {recovery_email}"})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
