from flask import Flask
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from rclone_backend import app as rclone_app
from flask_app import create_app

def create_combined_app():
    app = create_app()
    app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
        '/rclone': rclone_app
    })
    return app
