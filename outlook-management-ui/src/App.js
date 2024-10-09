import React from 'react';
import AccountForm from './components/AccountForm';
import RcloneConfig from './components/RcloneConfig';
import { VideoPlayer } from './components/VideoPlayer';

function App() {
  const subtitles = [
    { src: 'subtitles_en.vtt', srclang: 'en', label: 'English' },
    { src: 'subtitles_te.vtt', srclang: 'te', label: 'Telugu' },
    { src: 'subtitles_en.srt', srclang: 'en', label: 'English (SRT)' },
    { src: 'subtitles_fr.ass', srclang: 'fr', label: 'French (ASS)' } // Added SSA/ASS format
  ];

  const audioTracks = [
    { src: 'audio_en.m4a', srclang: 'en', label: 'English' },
    { src: 'audio_te.m4a', srclang: 'te', label: 'Telugu' },
    { src: 'audio_custom.m4a', srclang: 'custom', label: 'Director’s Commentary' }  // Custom Name Example
  ];

  const videoFormats = [
    { src: 'path/to/your/video-720p.mp4', type: 'video/mp4', label: '720p' },
    { src: 'path/to/your/video-1080p.mp4', type: 'video/mp4', label: '1080p' },
    { src: 'path/to/your/video-4k.mp4', type: 'video/mp4', label: '4K' },
    { src: 'path/to/your/video.mkv', type: 'video/x-matroska' },  // Added MKV format
    { src: 'path/to/your/video.hevc', type: 'video/h265' },  // Added H.265/HEVC format
    { src: 'path/to/your/video.wav', type: 'audio/wav' },  // Added WAV format
    { src: 'path/to/your/video.aac', type: 'audio/aac' },  // Added AAC format
    { src: 'path/to/your/video.m4a', type: 'audio/mp4' }   // Added M4A format
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Outlook Account Management</h1>
        <AccountForm />
        <RcloneConfig />
        <VideoPlayer 
          src="path/to/your/video.mkv" 
          subtitles={subtitles} 
          audioTracks={audioTracks}
          videoFormats={videoFormats} 
        />
      </header>
    </div>
  );
}

export default App;
