import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoJsPlayer = ({ src }) => {
  useEffect(() => {
    const player = videojs('video-js-player', {
      controls: true,
      autoplay: false,
      preload: 'auto'
    });
    return () => {
      player.dispose();
    };
  }, [src]);

  return (
    <div className="video-container">
      <video id="video-js-player" className="video-js" controls preload="auto">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoJsPlayer;
