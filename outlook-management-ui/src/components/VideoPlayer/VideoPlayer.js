import React, { useEffect } from 'react';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

const VideoPlayer = ({ src, subtitles, audioTracks }) => {
  useEffect(() => {
    const player = new Plyr('#player');

    player.on('ready', () => {
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

export default VideoPlayer; // Ensure this line is here
