export const addSubtitles = (player, subtitles) => {
  subtitles.forEach((sub) => {
    const track = document.createElement('track');
    track.kind = 'subtitles';
    track.src = sub.src;
    track.srclang = sub.srclang;
    track.label = sub.label;
    document.querySelector('video').appendChild(track);
  });
};
