Sure thing! Here’s how your project should be structured to deploy both the back-end and front-end on Render:

### Repository Structure

```
your-repo/
├── backend/
│   ├── app.py
│   ├── flask_app.py
│   ├── requirements.txt
│   └── accounts.yml
└── outlook-management-ui/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── AccountForm.js
    │   ├── App.js
    │   ├── index.js
    │   └── ...
    └── package.json
```

### Backend Files

**`backend/app.py`**:
```python
import discord
import requests
import yaml
import psutil
import os
from threading import Thread
from flask_app import create_app

# Function to get accounts from GitHub
def fetch_accounts():
    url = 'https://raw.githubusercontent.com/deswafyfxd/disc-data-strore/main/accounts.yml'
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch accounts: {e}")
        return {}
    return yaml.safe_load(response.text).get('accounts', {})

# Function to get recovery email from fetched data
def get_recovery_email(outlook_account, accounts):
    return accounts.get(outlook_account)

# Function to get system stats
def get_system_stats():
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    stats = {
        "cpu": f"{cpu}%",
        "memory": f"Total: {memory.total // (1024 ** 2)} MB, Available: {memory.available // (1024 ** 2)} MB, Used: {memory.percent}%",
        "disk": f"Total: {disk.total // (1024 ** 3)} GB, Used: {disk.used // (1024 ** 3)} GB, Free: {disk.free // (1024 ** 3)} GB, Used: {disk.percent}%"
    }
    
    return stats

# Set up Discord intents
intents = discord.Intents.default()
intents.message_content = True

# Discord bot client
client = discord.Client(intents=intents)

# Event when the bot is ready
@client.event
async def on_ready():
    print(f'Logged in as {client.user}')

# Event to handle messages
@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('!get_recovery'):
        parts = message.content.split(' ')
        if len(parts) != 2:
            await message.channel.send("Please use the correct format: `!get_recovery <outlook_account>`")
            return
        
        try:
            outlook_account = parts[1]
            accounts = fetch_accounts()
            recovery_email = get_recovery_email(outlook_account, accounts)
            if recovery_email:
                response_message = f'The recovery email for {outlook_account} is {recovery_email}'
            else:
                response_message = f'No recovery email found for {outlook_account}'
            await message.channel.send(response_message)
        except Exception as e:
            await message.channel.send(f"An error occurred: {e}")

    if message.content.startswith('!system_stats'):
        try:
            stats = get_system_stats()
            response_message = (
                f"**CPU Usage**: {stats['cpu']}\n"
                f"**Memory**: {stats['memory']}\n"
                f"**Disk**: {stats['disk']}\n"
            )
            await message.channel.send(response_message)
        except Exception as e:
            await message.channel.send(f"An error occurred: {e}")

def run_discord_bot():
    try:
        client.run(os.getenv('DISCORD_TOKEN'))
    except Exception as e:
        print(f"Failed to connect: {e}")

# Main entry point
def start_discord_bot():
    Thread(target=run_discord_bot).start()

if __name__ == "__main__":
    start_discord_bot()
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
```

**`backend/flask_app.py`**:
```python
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
```

**`backend/requirements.txt`**:
```plaintext
discord.py
requests
pyyaml
Flask
gunicorn
psutil
```

**`backend/accounts.yml`**:
```yaml
accounts:
  your_outlook_account@example.com: your_recovery_email@example.com
```

### Front-End Files

**`outlook-management-ui/src/components/AccountForm.js`**:
```javascript
import React, { useState } from 'react';

const AccountForm = () => {
  const [outlookAccount, setOutlookAccount] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/add_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ outlookAccount, recoveryEmail }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Outlook Account:</label>
        <input
          type="text"
          value={outlookAccount}
          onChange={(e) => setOutlookAccount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Recovery Email:</label>
        <input
          type="email"
          value={recoveryEmail}
          onChange={(e) => setRecoveryEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Account</button>
    </form>
  );
};

export default AccountForm;
```

**`outlook-management-ui/src/App.js`**:
```javascript
import React from 'react';
import AccountForm from './components/AccountForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Outlook Account Management</h1>
        <AccountForm />
      </header>
    </div>
  );
}

export default App;
```

**`outlook-management-ui/package.json`**:
```json
{
  "name": "outlook-management-ui",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5000"
}
```

### Running in Render

#### Step 1: Deploy the Back-End

1. Create a new Web Service on Render.
2. Connect your GitHub repository and select the branch containing your `backend` folder.
3. Set the **Build Command**: `pip install -r requirements.txt`
4. Set the **Start Command**: `gunicorn flask_app:app`
5. Add the Environment Variable `DISCORD_TOKEN` with your Discord token.
6. Click on "Create Web Service" and wait for Render to deploy.

#### Step 2: Deploy the Front-End

1. Create a new Static Site on Render.
2. Connect your GitHub repository and select the branch containing your `outlook-management-ui` folder.
3. Set the **Build Command**: `npm install && npm run build`
4. Set the **Publish Directory**: `build`
5. Click on "Create Static Site" and wait for Render to deploy.

This setup ensures that your back-end service is running on Render, handling API requests and Discord bot commands, and your front-end React app is deployed and serving your user interface. 

Let me know if you run into any issues or need further assistance!
