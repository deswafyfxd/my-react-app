#!/bin/bash

# Install Rclone
curl https://rclone.org/install.sh | sudo bash

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py
