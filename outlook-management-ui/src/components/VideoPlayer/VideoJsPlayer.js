import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { addSubtitles } from './subtitles';
import { addAudioTracks } from './AudioTracks';

const VideoJsPlayer = ({ src, subtitles, audioTracks }) => {
  useEffect(() => {
    const player = videojs('video-js-player', {
      controls: true,
      autoplay: false,
      preload: 'auto'
    });

    player.on('ready', () => {
      addSubtitles(player, subtitles);
      addAudioTracks(player, audioTracks);
    });

    return () => {
      player.dispose();
    };
  }, [src, subtitles, audioTracks]);

  return (
    <div className="video-container">
      <video id="video-js-player" className="video-js" controls preload="auto">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoJsPlayer;
