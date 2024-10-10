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

  const videoSrc = 'https://test-videos.co.uk/vids/jellyfish/mkv/1080/Jellyfish_1080_10s_1MB.mkv';

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
