import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hammer from 'hammerjs'; // For gesture detection

const VideoPlayer = ({ src, subtitles, audioTracks, videoFormats }) => {
  useEffect(() => {
    // Initialize Video.js player
    const player = videojs('my-video', {
      controls: true,
      autoplay: false,
      preload: 'auto'
    });

    // Gesture controls for volume, brightness, and skipping
    const videoElement = document.getElementById('my-video');
    const hammer = new Hammer(videoElement);

    // Swipe Up/Down on Right Side for Volume Control
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammer.on('swipeup', (ev) => {
      if (ev.center.x > window.innerWidth / 2) {
        let currentVolume = player.volume();
        if (currentVolume < 1) {
          player.volume(Math.min(currentVolume + 0.1, 1)); // Increase volume
        }
      }
    });

    hammer.on('swipedown', (ev) => {
      if (ev.center.x > window.innerWidth / 2) {
        let currentVolume = player.volume();
        if (currentVolume > 0) {
          player.volume(Math.max(currentVolume - 0.1, 0)); // Decrease volume
        }
      }
    });

    // Swipe Up/Down on Left Side for Brightness Control
    hammer.on('swipeup', (ev) => {
      if (ev.center.x < window.innerWidth / 2) {
        document.getElementById('my-video').style.filter = 'brightness(1.5)'; // Increase brightness
      }
    });

    hammer.on('swipedown', (ev) => {
      if (ev.center.x < window.innerWidth / 2) {
        document.getElementById('my-video').style.filter = 'brightness(0.5)'; // Decrease brightness
      }
    });

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
      <video id="my-video" className="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup="{}">
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
