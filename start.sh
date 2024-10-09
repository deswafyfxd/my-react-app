# Installing Rclone
curl https://rclone.org/install.sh | sudo bash

# Configuring Rclone
rclone config create myremote drive client_id YOUR_CLIENT_ID client_secret YOUR_CLIENT_SECRET

# Run the Flask app
python app.py
