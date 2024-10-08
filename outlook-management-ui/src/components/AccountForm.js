import React, { useState } from 'react';

const AccountForm = () => {
  const [outlookAccount, setOutlookAccount] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-backend.onrender.com/api/add_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outlookAccount, recoveryEmail }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert(`Account ${outlookAccount} added successfully.`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Error adding account. Please try again.");
    }
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
