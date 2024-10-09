#!/bin/bash

# Install Rclone
curl https://rclone.org/install.sh | sudo bash

# Start the Flask app
python app.py
