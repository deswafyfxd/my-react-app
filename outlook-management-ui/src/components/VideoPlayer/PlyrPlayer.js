import React, { useEffect } from 'react';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

const PlyrPlayer = ({ src, subtitles, audioTracks }) => {
  useEffect(() => {
    const player = new Plyr('#plyr-player', {
      captions: { active: true, update: true, language: 'en' },
      quality: { default: 720, options: [1080, 720, 480] },
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'fullscreen', 'pip', 'quality', 'speed']
    });

    player.on('ready', () => {
      addSubtitles(player, subtitles);
      addAudioTracks(player, audioTracks);
    });

    return () => {
      player.destroy();
    };
  }, [src, subtitles, audioTracks]);

  return (
    <div className="video-container">
      <video id="plyr-player" playsInline controls>
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
      </video>
    </div>
  );
};

export { PlyrPlayer };
