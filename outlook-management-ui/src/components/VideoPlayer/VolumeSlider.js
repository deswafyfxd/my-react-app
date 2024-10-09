import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');

class VolumeSliderPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);

    player.on('ready', () => {
      // Ensure volume slider is vertical
      const volumePanel = player.controlBar.volumePanel;
      volumePanel.vertical(true);
    });
  }
}

videojs.registerPlugin('volumeSliderPlugin', VolumeSliderPlugin);
