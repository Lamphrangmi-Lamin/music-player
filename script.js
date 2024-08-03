const audio = document.getElementById('current-track');
const playPauseIcon = document.getElementById('play-pause');
const seeklSlider = document.getElementById('seek-slider');

playPauseIcon.src = './icons/circle-play-solid.svg';
playPauseIcon.addEventListener('click', playPause);

function playPause() {
    if (audio.paused) {
        playPauseIcon.src = './icons/pause-solid.svg';
        audio.play();
    } else if (!audio.paused) {
        playPauseIcon.src = './icons/circle-play-solid.svg';
        audio.pause();
    }
}
