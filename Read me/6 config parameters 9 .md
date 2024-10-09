Yes, by default, Rclone serves on port 8080. However, you can specify a different port if needed.

### Example Command to Serve on a Different Port:
```bash
rclone serve http myremote:/path/to/folder --addr :9090
```

This serves your files on port 9090 instead. If you don’t specify a port, it defaults to 8080. Handy for avoiding conflicts with other services!

All clear? 🚀
