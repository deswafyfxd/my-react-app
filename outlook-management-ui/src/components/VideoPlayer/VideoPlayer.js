import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hammer from 'hammerjs'; // For gesture detection

const VideoPlayer = ({ src, subtitles, audioTracks, videoFormats }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize Video.js player
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto'
    });

    // Gesture controls for skipping
    const hammer = new Hammer(videoRef.current);

    // Double-tap left to rewind, right to fast-forward
    hammer.on('doubletap', (ev) => {
      if (ev.center.x < window.innerWidth / 2) {
        player.currentTime(player.currentTime() - 10);
      } else {
        player.currentTime(player.currentTime() + 10);
      }
    });

    // Apply truncation and tooltips to track labels
    document.querySelectorAll('.track-label').forEach(label => {
      label.setAttribute('data-fullname', label.textContent);
    });

    return () => {
      player.dispose();
      hammer.destroy();
    };
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} id="my-video" className="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup="{}">
        {videoFormats.map((format, index) => (
          <source key={index} src={format.src} type={format.type} />
        ))}
        {subtitles.map((sub, index) => (
          <track key={index} kind="subtitles" src={sub.src} srclang={sub.srclang} label={sub.label} className="track-label" />
        ))}
        {audioTracks.map((track, index) => (
          <track key={index} kind="captions" src={track.src} srclang={track.srclang} label={track.label} className="track-label" />
        ))}
      </video>
    </div>
  );
};

export default VideoPlayer;
