```markdown
# Outlook Management UI

This project provides a web interface to manage Outlook accounts and recovery emails, integrated with Rclone for cloud storage operations.

## Features

- Add and manage Outlook accounts and recovery emails.
- Configure, mount, sync, and serve cloud storage using Rclone.
- Integrated with MongoDB for secure data storage.


## Project Structure

```
your-repo/
├── backend/
│   ├── app.py
│   ├── flask_app.py
│   ├── rclone_backend.py
│   ├── requirements.txt
│   ├── database.py
│   ├── start.sh
│   └── .env
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
    │   ├── App.js
    │   ├── index.js
    │   ├── index.css (optional)
    │   ├── App.css (optional)
    ├── package.json
    ├── .gitignore
    ├── README.md
```


## Setup and Deployment

1. **Backend Service Setup:**
   - **Root Directory:** Set to `backend`
   - **Build Command:**
     ```bash
     chmod +x start.sh && ./start.sh
     ```
   - **Start Command:**
     ```bash
     python app.py
     ```
   - **Environment Variables:** `USE_DATABASE` and `MONGO_URI`

2. **Front-End Service Setup:**
   - **Root Directory:** Set to `outlook-management-ui`
   - **Build Command:**
     ```bash
     NODE_OPTIONS=--openssl-legacy-provider npm install && npm run build
     ```
   - **Publish Directory:**
     ```plaintext
     build
     ```

## Usage

### Rclone Configuration

- **Configure:**
  - Remote Name: Name for the remote configuration.
  - Remote Type: Type of cloud storage (e.g., `drive`, `s3`).
  - Config Params: Additional parameters needed for setup.

- **Mount:**
  - Remote: Remote name and path.
  - Local: Local directory to mount the remote storage.

- **Sync:**
  - Source: Source path.
  - Destination: Destination path.

- **Serve:**
  - Remote for Serve: Remote name and path.

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
