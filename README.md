### `README.md`
```markdown
# Outlook Management UI

This project provides a web interface to manage Outlook accounts and recovery emails, integrated with Rclone for cloud storage operations and Video.js for media streaming.

## Features

- Add and manage Outlook accounts and recovery emails.
- Configure, mount, sync, and serve cloud storage using Rclone.
- Stream video and audio using Video.js, supporting multiple formats and resolutions up to 4K.
- Dynamic labeling for audio tracks and subtitles, with truncation and tooltips for long names.
- Responsive design for seamless playback on mobile devices, TVs, and desktops.

## Project Structure

```
your-repo/
├── backend/
│   ├── app.py
│   ├── discord_bot.py
│   ├── combined_app.py
│   ├── flask_app.py
│   ├── rclone_backend.py
│   ├── requirements.txt
│   ├── database.py
│   ├── start.sh
│   ├── .env
└── outlook-management-ui/
    ├── public/
    │   ├── index.html
    │   ├── robots.txt
    │   ├── manifest.json
    ├── src/
    │   ├── components/
    │   │   ├── AccountForm.js
    │   │   ├── RcloneConfig/
    │   │   │   ├── ConfigForm.js
    │   │   │   ├── MountForm.js
    │   │   │   ├── SyncForm.js
    │   │   │   ├── ServeForm.js
    │   │   │   ├── index.js
    │   │   ├── VideoPlayer/
    │   │   │   ├── VideoPlayer.js
    │   │   │   ├── Subtitles.js
    │   │   │   ├── AudioTracks.js
    │   │   │   ├── Controls.js
    │   │   │   ├── index.js
    │   ├── App.js
    │   ├── index.js
    │   ├── index.css
    ├── package.json
    ├── .gitignore
    ├── README.md
```

## Setup and Deployment

### Backend Service

1. **Root Directory**: `backend`
2. **Build Command**:
   ```bash
   chmod +x start.sh
   ```
3. **Start Command**:
   ```bash
   ./start.sh
   ```

### Front-End Service

1. **Root Directory**: `outlook-management-ui`
2. **Build Command**:
   ```bash
   npm install && npm install video.js && NODE_OPTIONS=--openssl-legacy-provider npm run build
   ```
3. **Publish Directory**:
   ```plaintext
   build
   ```

### Usage

- **Configure Rclone**: Use the web interface to set up Rclone configurations.
- **Manage Accounts**: Add and manage Outlook accounts and recovery emails.
- **Stream Media**: Use Video.js to stream video and audio files, supporting multiple formats and resolutions.

### Running Locally

1. Navigate to the `backend` directory and set up the virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. Start the backend:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

3. Navigate to the `outlook-management-ui` directory and start the frontend:
   ```bash
   cd ../outlook-management-ui
   npm install
   npm start
   ```
