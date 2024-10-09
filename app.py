import os
from flask import Flask
from threading import Thread
from rclone_backend import app as rclone_app
from flask_app import create_app

def run_discord_bot():
    # Discord bot setup and run code goes here...
    pass

def start_discord_bot():
    Thread(target=run_discord_bot).start()

# Combine the apps
def create_combined_app():
    app = create_app()
    app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
        '/rclone': rclone_app
    })
    return app

if __name__ == "__main__":
    start_discord_bot()
    combined_app = create_combined_app()
    combined_app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
