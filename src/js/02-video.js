import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
startCurrentPlay();

player.on('timeupdate', throttle(onCurrentTime, 1000));

function onCurrentTime(evt) {
  localStorage.setItem('videoplayer-current-time', evt.seconds);
}

function startCurrentPlay() {
  const saveTime = localStorage.getItem('videoplayer-current-time');
  if (saveTime) {
    player.setCurrentTime(saveTime);
  }
}
