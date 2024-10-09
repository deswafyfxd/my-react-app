#!/bin/bash

# Install Rclone
curl https://rclone.org/install.sh | sudo bash

# Configure Rclone (optional, depending on your needs)
# Example: rclone config create myremote drive client_id YOUR_CLIENT_ID client_secret YOUR_CLIENT_SECRET

# Start the Flask app
python app.py
