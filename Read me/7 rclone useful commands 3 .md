Got it, you’re looking for more ways to customize Rclone operations similar to serving on a different port. Here are various customizable Rclone commands and their functions:

### Bandwidth Limiting
- **Limit Bandwidth Usage**:
  ```bash
  rclone sync myremote:/path/to/source /local/path/to/destination --bwlimit 1M
  ```
  This limits the bandwidth to 1MB/s.

### Data Transfer with Checksum
- **Use Checksum for Transfer Verification**:
  ```bash
  rclone copy myremote:/path/to/source /local/path/to/destination --checksum
  ```
  Ensures files are copied with checksum verification.

### Logging
- **Detailed Logging**:
  ```bash
  rclone sync myremote:/path/to/source /local/path/to/destination --log-file=mylogfile.txt --log-level DEBUG
  ```
  Logs the process to `mylogfile.txt` with detailed debug information.

### Encryption
- **Encrypted Remote Configuration**:
  ```bash
  rclone config create mycrypt crypt remote=myremote:path
  ```

### HTTP Serve with Custom Headers
- **Add Custom HTTP Headers**:
  ```bash
  rclone serve http myremote:/path/to/folder --addr :8080 --header "X-Custom-Header: value"
  ```
  Adds a custom header to HTTP responses.

### Sync Only Specific File Types
- **Sync Only `.jpg` Files**:
  ```bash
  rclone sync myremote:/path/to/source /local/path/to/destination --include "*.jpg"
  ```

### Directory Listings
- **JSON Output**:
  ```bash
  rclone lsd myremote:/path --json
  ```
  Lists directories in JSON format.

### Transfer with Progress Bar
- **Show Progress**:
  ```bash
  rclone copy myremote:/path/to/source /local/path/to/destination --progress
  ```

### Perform a Dry Run
- **Dry Run Mode**:
  ```bash
  rclone sync myremote:/path/to/source /local/path/to/destination --dry-run
  ```
  Simulates the sync operation without making changes.

### Retries and Backoff
- **Set Retries and Backoff**:
  ```bash
  rclone sync myremote:/path/to/source /local/path/to/destination --retries 5 --low-level-retries 10 --retries-sleep 30s
  ```

### Cache Mode for Mounting
- **Mount with Cache**:
  ```bash
  rclone mount myremote:/path /mnt/myremote --vfs-cache-mode full
  ```

These customizations allow you to tailor Rclone's behavior to fit your specific needs. Quite versatile, right? 🚀
