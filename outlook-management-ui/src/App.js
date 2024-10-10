import React from 'react';
import AccountForm from './components/AccountForm';
import { ConfigForm, MountForm, SyncForm, ServeForm } from './components/RcloneConfig';
import { VideoPlayer } from './components/VideoPlayer'; // Ensure this import is correct

function App() {
  const subtitles = [
    { src: 'subtitles_en.vtt', srclang: 'en', label: 'English' },
    { src: 'subtitles_te.vtt', srclang: 'te', label: 'Telugu' },
    { src: 'subtitles_en.srt', srclang: 'en', label: 'English (SRT)' },
    { src: 'subtitles_fr.ass', srclang: 'fr', label: 'French (ASS)' }
  ];

  const audioTracks = [
    { src: 'audio_en.m4a', srclang: 'en', label: 'English' },
    { src: 'audio_te.m4a', srclang: 'te', label: 'Telugu' },
    { src: 'audio_custom.m4a', srclang: 'custom', label: 'Director’s Commentary' }
  ];

  const videoSrc = 'https://tvkkdata.tvkishorkumardata.workers.dev/download.aspx?file=%2Fw4dIVtxkbQ039xec4SWaUbRtvQzMDp38oNbYQIgVrm7HCqww1T5GO8mGJyEu8gC&expiry=MBeYHDgLCuhbVwVAx9BNYA%3D%3D&mac=388bfb9514e27a07fe2031e4df7d29ee6babdc49a01ce789fdda8eec1c1b9439';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Outlook Account Management</h1>
        <AccountForm />
        <ConfigForm />
        <MountForm />
        <SyncForm />
        <ServeForm />
        <VideoPlayer 
          src={videoSrc} 
          subtitles={subtitles} 
          audioTracks={audioTracks}
        />
      </header>
    </div>
  );
}

export default App;
