import React, { useState } from 'react';

const RcloneControls = () => {
  const [remote, setRemote] = useState('');
  const [local, setLocal] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleMount = async () => {
    const response = await fetch('/api/rclone/mount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ remote, local }),
    });
    const result = await response.json();
    alert(result.message);
  };

  const handleSync = async () => {
    const response = await fetch('/api/rclone/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source, destination }),
    });
    const result = await response.json();
    alert(result.message);
  };

  const handleServe = async () => {
    const response = await fetch('/api/rclone/serve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ remote }),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div>
      <h3>Rclone Controls</h3>
      <div>
        <label>Remote:</label>
        <input type="text" value={remote} onChange={(e) => setRemote(e.target.value)} />
        <label>Local:</label>
        <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
        <button onClick={handleMount}>Mount</button>
      </div>
      <div>
        <label>Source:</label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        <label>Destination:</label>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleSync}>Sync</button>
      </div>
      <div>
        <label>Remote for Serve:</label>
        <input type="text" value={remote} onChange={(e) => setRemote(e.target.value)} />
        <button onClick={handleServe}>Serve</button>
      </div>
    </div>
  );
};

export default RcloneControls;
