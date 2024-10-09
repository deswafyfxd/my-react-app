import React, { useState } from 'react';

const ConfigForm = () => {
  const [remoteName, setRemoteName] = useState('');
  const [remoteType, setRemoteType] = useState('');
  const [configParams, setConfigParams] = useState('');

  const handleConfigure = async () => {
    const response = await fetch('/api/rclone/configure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ remote_name: remoteName, remote_type: remoteType, config_params: configParams }),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div>
      <h3>Configure Rclone</h3>
      <div>
        <label>Remote Name:</label>
        <input type="text" value={remoteName} onChange={(e) => setRemoteName(e.target.value)} />
        <label>Remote Type:</label>
        <input type="text" value={remoteType} onChange={(e) => setRemoteType(e.target.value)} />
        <label>Config Params:</label>
        <input type="text" value={configParams} onChange={(e) => setConfigParams(e.target.value)} />
        <button onClick={handleConfigure}>Configure</button>
      </div>
    </div>
  );
};

export default ConfigForm;
