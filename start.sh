#!/bin/bash

# Install Rclone using wget as an alternative
wget https://downloads.rclone.org/rclone-current-linux-amd64.deb
sudo dpkg -i rclone-current-linux-amd64.deb

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py
