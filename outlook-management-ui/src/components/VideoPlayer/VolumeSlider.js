import React from 'react';
import 'video.js/dist/video-js.css';

const VolumeSlider = ({ player }) => {
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    player.volume(newVolume);
  };

  return (
    <input
      type="range"
      className="volume-slider"
      min="0"
      max="1"
      step="0.01"
      onChange={handleVolumeChange}
      orient="vertical"
    />
  );
};

export default VolumeSlider; // Ensure it's a default export
