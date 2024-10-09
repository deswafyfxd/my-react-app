import React, { useState } from 'react';

const ServeForm = () => {
  const [remote, setRemote] = useState('');

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
      <h3>Serve Remote Storage</h3>
      <div>
        <label>Remote for Serve:</label>
        <input type="text" value={remote} onChange={(e) => setRemote(e.target.value)} />
        <button onClick={handleServe}>Serve</button>
      </div>
    </div>
  );
};

export default ServeForm;
