from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/api/rclone/configure', methods=['POST'])
def configure_rclone():
    remote_name = request.json.get('remote_name')
    remote_type = request.json.get('remote_type')
    config_params = request.json.get('config_params')

    command = f"rclone config create {remote_name} {remote_type} {config_params}"
    subprocess.run(command, shell=True)
    return jsonify({"message": "Rclone configured successfully"}), 200

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
