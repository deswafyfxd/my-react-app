import subprocess
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/rclone/mount', methods=['POST'])
def mount():
    remote = request.json.get('remote')
    local = request.json.get('local')
    command = f"rclone mount {remote} {local}"
    subprocess.Popen(command, shell=True)
    return jsonify({"message": "Mounting started"}), 200

@app.route('/api/rclone/sync', methods=['POST'])
def sync():
    source = request.json.get('source')
    destination = request.json.get('destination')
    command = f"rclone sync {source} {destination}"
    subprocess.run(command, shell=True)
    return jsonify({"message": "Sync completed"}), 200

@app.route('/api/rclone/serve', methods=['POST'])
def serve():
    remote = request.json.get('remote')
    command = f"rclone serve http {remote} --addr :8080"
    subprocess.Popen(command, shell=True)
    return jsonify({"message": "Serving started"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
