import React, { useState } from 'react';
import AccountForm from './components/AccountForm';
import { ConfigForm, MountForm, SyncForm, ServeForm } from './components/RcloneConfig';
import PlyrPlayer from './components/VideoPlayer/PlyrPlayer';
import VideoJsPlayer from './components/VideoPlayer/VideoJsPlayer';
import FileBrowser from './components/FileBrowser';

function App() {
  const [mediaSrc, setMediaSrc] = useState('');
  const [subtitles, setSubtitles] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [playerType, setPlayerType] = useState('plyr');
  const rcloneServeUrl = process.env.REACT_APP_RCLONE_SERVE_URL;

  const updateMedia = (file) => {
    const src = `${rcloneServeUrl}/${file}`;
    setMediaSrc(src);

    setSubtitles([
      { src: `${src}/subtitles_en.vtt`, srclang: 'en', label: 'English' },
      { src: `${src}/subtitles_te.vtt`, srclang: 'te', label: 'Telugu' },
      { src: `${src}/subtitles_en.srt`, srclang: 'en', label: 'English (SRT)' },
      { src: `${src}/subtitles_fr.ass`, srclang: 'fr', label: 'French (ASS)' }
    ]);

    setAudioTracks([
      { src: `${src}/audio_en.mp3`, srclang: 'en', label: 'English' },
      { src: `${src}/audio_te.ogg`, srclang: 'te', label: 'Telugu' },
      { src: `${src}/audio_custom.aac`, srclang: 'custom', label: 'Director’s Commentary' },
      { src: `${src}/audio_high_quality.wav`, srclang: 'high', label: 'High Quality' }
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Outlook Account Management</h1>
        <button onClick={() => setPlayerType('plyr')}>Use Plyr</button>
        <button onClick={() => setPlayerType('videojs')}>Use Video.js</button>
        <FileBrowser setMediaSrc={updateMedia} />
        {mediaSrc && playerType === 'plyr' && <PlyrPlayer src={mediaSrc} subtitles={subtitles} audioTracks={audioTracks} />}
        {mediaSrc && playerType === 'videojs' && <VideoJsPlayer src={mediaSrc} />}
      </header>
    </div>
  );
}

export default App;
