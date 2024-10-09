import React from 'react';
import AccountForm from './components/AccountForm';
import { ConfigForm, MountForm, SyncForm, ServeForm } from './components/RcloneConfig';
import { VideoPlayer } from './components/VideoPlayer';

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

  const videoFormats = [
    { src: 'https://your-bucket.s3.amazonaws.com/video-720p.mp4', type: 'video/mp4', label: '720p' },
    { src: 'https://your-bucket.s3.amazonaws.com/video-1080p.mp4', type: 'video/mp4', label: '1080p' },
    { src: 'https://your-bucket.s3.amazonaws.com/video-4k.mp4', type: 'video/mp4', label: '4K' }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Outlook Account Management</h1>
        <AccountForm />
        <ConfigForm />
        <MountForm />
        <SyncForm />
        <ServeForm />
      </header>
      <footer>
        <VideoPlayer 
          src="https://your-bucket.s3.amazonaws.com/video.mkv" 
          subtitles={subtitles} 
          audioTracks={audioTracks}
          videoFormats={videoFormats} 
        />
      </footer>
    </div>
  );
}

export default App;
