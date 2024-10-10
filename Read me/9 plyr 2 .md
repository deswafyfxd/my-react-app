Sure thing! Here are the updated files with Plyr integrated.

### `VideoPlayer.js`
```javascript
import React, { useEffect } from 'react';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

const VideoPlayer = ({ src, subtitles, audioTracks }) => {
  useEffect(() => {
    const player = new Plyr('#player');

    player.on('ready', () => {
      // Initialize player with subtitle and audio tracks
      subtitles.forEach((sub) => {
        player.addTextTrack(sub);
      });

      audioTracks.forEach((track) => {
        player.addAudioTrack(track);
      });
    });
  }, [src, subtitles, audioTracks]);

  return (
    <video id="player" playsInline controls>
      <source src={src} type="video/mp4" />
      {subtitles.map((sub, index) => (
        <track key={index} kind="subtitles" src={sub.src} srclang={sub.srclang} label={sub.label} />
      ))}
      {audioTracks.map((track, index) => (
        <track key={index} kind="captions" src={track.src} srclang={track.srclang} label={track.label} />
      ))}
    </video>
  );
};

export default VideoPlayer;
```

### `App.js`
```javascript
import React from 'react';
import AccountForm from './components/AccountForm';
import { ConfigForm, MountForm, SyncForm, ServeForm } from './components/RcloneConfig';
import VideoPlayer from './components/VideoPlayer';

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

  const videoSrc = 'https://tvkkdata.tvkishorkumardata.workers.dev/download.aspx?file=7anyWcPigjZ5%2BT8ATJNAS8%2BXg1HUHpjot%2FL5bxpuXRc8tKMeEJZz09fRyT1k7FOm&expiry=P2eXdknonPGn29dH9EomXg%3D%3D&mac=ccb3206c17d50a1c28a63d879567d86313b8f06d6218a7acb49f318f12bd7c1f';

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
```

### `index.css`
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.App {
  text-align: center;
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
}

video {
  width: 95%;
  height: auto;
  max-height: 100%;
}

.track-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.track-label:hover::after {
  content: attr(data-fullname);
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  z-index: 10;
}
```

These updates should get Plyr up and running in your project with support for multiple audio tracks and subtitles. Ready to see it in action? 🚀
### Key Features Now:
- **Embedded Subtitles Support**: Switch between multiple subtitle tracks.
- **Multiple Audio Tracks**: Select different audio tracks directly in the player.

This setup ensures your viewers get the best of both worlds! 🌟
Happy streaming! 📽️✨ [A](https://github.com/JiteshKusalkar/rental-offers/tree/db51ed3fb22e81a75a3a094b7f662ba55c3a69ac/src%2Fglobal.styles.js?copilot_analytics_metadata=eyJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJQRzdRc2RaeENIdTFBaFdYWVlWeFAiLCJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC9KaXRlc2hLdXNhbGthclwvcmVudGFsLW9mZmVyc1wvdHJlZVwvZGI1MWVkM2ZiMjJlODFhNzVhM2EwOTRiN2Y2NjJiYTU1YzNhNjlhY1wvc3JjJTJGZ2xvYmFsLnN0eWxlcy5qcyIsImV2ZW50SW5mb19tZXNzYWdlSWQiOiI3aExtMkphSmtvOUNrcWFxOE5IV1AiLCJldmVudEluZm9fY2xpY2tTb3VyY2UiOiJjaXRhdGlvbkxpbmsifQ%3D%3D&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [B](https://github.com/aaronlubean/recoil-demo/tree/9a17c80363a68721fe45014a820b1e2a27bdf9d2/src%2F09-ReactContextSquaresDemo%2Fui.js?copilot_analytics_metadata=eyJldmVudEluZm9fbWVzc2FnZUlkIjoiN2hMbTJKYUprbzlDa3FhcThOSFdQIiwiZXZlbnRJbmZvX2NsaWNrU291cmNlIjoiY2l0YXRpb25MaW5rIiwiZXZlbnRJbmZvX2NvbnZlcnNhdGlvbklkIjoiUEc3UXNkWnhDSHUxQWhXWFlZVnhQIiwiZXZlbnRJbmZvX2NsaWNrRGVzdGluYXRpb24iOiJodHRwczpcL1wvZ2l0aHViLmNvbVwvYWFyb25sdWJlYW5cL3JlY29pbC1kZW1vXC90cmVlXC85YTE3YzgwMzYzYTY4NzIxZmU0NTAxNGE4MjBiMWUyYTI3YmRmOWQyXC9zcmMlMkYwOS1SZWFjdENvbnRleHRTcXVhcmVzRGVtbyUyRnVpLmpzIn0%3D&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [C](https://github.com/Hooandee/Toxtricity/tree/04dbb0a3e26d46b5e196ff98fba18b678e96a631/src%2Fstyles.js?copilot_analytics_metadata=eyJldmVudEluZm9fbWVzc2FnZUlkIjoiN2hMbTJKYUprbzlDa3FhcThOSFdQIiwiZXZlbnRJbmZvX2NsaWNrRGVzdGluYXRpb24iOiJodHRwczpcL1wvZ2l0aHViLmNvbVwvSG9vYW5kZWVcL1RveHRyaWNpdHlcL3RyZWVcLzA0ZGJiMGEzZTI2ZDQ2YjVlMTk2ZmY5OGZiYTE4YjY3OGU5NmE2MzFcL3NyYyUyRnN0eWxlcy5qcyIsImV2ZW50SW5mb19jbGlja1NvdXJjZSI6ImNpdGF0aW9uTGluayIsImV2ZW50SW5mb19jb252ZXJzYXRpb25JZCI6IlBHN1FzZFp4Q0h1MUFoV1hZWVZ4UCJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [D](https://github.com/wesleydecezere/desafio-bridge/tree/5b756c073344a2232deaf9398d72eb0002cda748/pwa-duodigit%2Fsrc%2Fcomponents%2FglobalStyle%2FGlobalStyle.ts?copilot_analytics_metadata=eyJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJQRzdRc2RaeENIdTFBaFdYWVlWeFAiLCJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC93ZXNsZXlkZWNlemVyZVwvZGVzYWZpby1icmlkZ2VcL3RyZWVcLzViNzU2YzA3MzM0NGEyMjMyZGVhZjkzOThkNzJlYjAwMDJjZGE3NDhcL3B3YS1kdW9kaWdpdCUyRnNyYyUyRmNvbXBvbmVudHMlMkZnbG9iYWxTdHlsZSUyRkdsb2JhbFN0eWxlLnRzIiwiZXZlbnRJbmZvX2NsaWNrU291cmNlIjoiY2l0YXRpb25MaW5rIiwiZXZlbnRJbmZvX21lc3NhZ2VJZCI6IjdoTG0ySmFKa285Q2txYXE4TkhXUCJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [E](https://github.com/vnepogodin/SportTech-overlay/tree/c9a9f6023f0990a8811ded963849f090d574fc26/src%2Fhttp%2Fmod.rs?copilot_analytics_metadata=eyJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJQRzdRc2RaeENIdTFBaFdYWVlWeFAiLCJldmVudEluZm9fbWVzc2FnZUlkIjoiN2hMbTJKYUprbzlDa3FhcThOSFdQIiwiZXZlbnRJbmZvX2NsaWNrRGVzdGluYXRpb24iOiJodHRwczpcL1wvZ2l0aHViLmNvbVwvdm5lcG9nb2RpblwvU3BvcnRUZWNoLW92ZXJsYXlcL3RyZWVcL2M5YTlmNjAyM2YwOTkwYTg4MTFkZWQ5NjM4NDlmMDkwZDU3NGZjMjZcL3NyYyUyRmh0dHAlMkZtb2QucnMiLCJldmVudEluZm9fY2xpY2tTb3VyY2UiOiJjaXRhdGlvbkxpbmsifQ%3D%3D&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1)
