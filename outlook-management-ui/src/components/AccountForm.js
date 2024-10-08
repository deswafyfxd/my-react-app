import React, { useState } from 'react';

const AccountForm = () => {
  const [outlookAccount, setOutlookAccount] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/add_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ outlookAccount, recoveryEmail }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Outlook Account:</label>
        <input
          type="text"
          value={outlookAccount}
          onChange={(e) => setOutlookAccount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Recovery Email:</label>
        <input
          type="email"
          value={recoveryEmail}
          onChange={(e) => setRecoveryEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Account</button>
    </form>
  );
};

export default AccountForm;
