export const addAudioTracks = (player, audioTracks) => {
  audioTracks.forEach((track) => {
    const audio = document.createElement('track');
    audio.kind = 'captions';
    audio.src = track.src;
    audio.srclang = track.srclang;
    audio.label = track.label;
    document.querySelector('video').appendChild(audio);
  });
};
