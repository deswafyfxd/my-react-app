import React, { useState } from 'react';

const SyncForm = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

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

  return (
    <div>
      <h3>Sync Storage</h3>
      <div>
        <label>Source:</label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        <label>Destination:</label>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleSync}>Sync</button>
      </div>
    </div>
  );
};

export default SyncForm;
