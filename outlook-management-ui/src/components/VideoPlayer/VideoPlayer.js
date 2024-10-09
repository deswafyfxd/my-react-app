import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src, subtitles, audioTracks, videoFormats }) => {
  useEffect(() => {
    // Initialize Video.js player
    const player = videojs('my-video', {
      controls: true,
      autoplay: false,
      preload: 'auto',
      controlBar: {
        volumePanel: {
          inline: false, // Volume slider opens directly
          volumeControl: {
            vertical: true, // Slider orientation
            name: 'volumeControl'
          },
          muteToggle: false // Remove mute button
        }
      }
    });

    // Apply truncation and tooltips to track labels
    document.querySelectorAll('.track-label').forEach(label => {
      label.setAttribute('data-fullname', label.textContent);
    });

    return () => {
      player.dispose();
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
