import React from 'react';
import AccountForm from './components/AccountForm';
import RcloneConfig from './components/RcloneConfig';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Outlook Account Management</h1>
        <AccountForm />
        <RcloneConfig />
      </header>
    </div>
  );
}

export default App;
