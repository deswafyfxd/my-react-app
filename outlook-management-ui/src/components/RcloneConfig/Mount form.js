import React, { useState } from 'react';

const MountForm = () => {
  const [remote, setRemote] = useState('');
  const [local, setLocal] = useState('');

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

  return (
    <div>
      <h3>Mount Remote Storage</h3>
      <div>
        <label>Remote:</label>
        <input type="text" value={remote} onChange={(e) => setRemote(e.target.value)} />
        <label>Local:</label>
        <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
        <button onClick={handleMount}>Mount</button>
      </div>
    </div>
  );
};

export default MountForm;
