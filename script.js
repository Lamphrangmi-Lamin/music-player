const audio = document.getElementById('current-track');
const playPauseIcon = document.getElementById('play-pause');
const seeklSlider = document.getElementById('seek-slider');
const duration = document.querySelector('.total-duration');
const currentTime = document.querySelector('.current-time');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const albumCover = document.querySelector('.album-cover');

// initially display the currentTime
currentTime.textContent = formatTime(audio.currentTime);
duration.textContent = formatTime(audio.duration);
seeklSlider.max = audio.duration;

// function to update the currentTime

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
// function updateCurrentTime() {
//     currentTime.textContent = Number(audio.currentTime).toFixed();
//     seeklSlider.value = Number(audio.currentTime);
// }

function updateCurrentTime() {
    currentTime.textContent = formatTime(audio.currentTime);
    seeklSlider.value = Number(audio.currentTime);
}

// adding functionality to the seek-slider
seeklSlider.addEventListener('input', (e) => {
    currentTime.textContent = e.target.value;
    audio.currentTime = e.target.value;
    audio.play();
})

// adding functionality to the play-pause button
playPauseIcon.src = './icons/circle-play-solid.svg';
playPauseIcon.addEventListener('click', playPause);

function playPause() {
    if (audio.paused) {
        title.textContent = 'IIT BOMBAY MOVIE';
        artist.textContent = 'NITISH KUMAR';
        playPauseIcon.src = './icons/pause-solid.svg';
        audio.play();
        audio.addEventListener('timeupdate', updateCurrentTime);
    } else if (!audio.paused) {
        playPauseIcon.src = './icons/circle-play-solid.svg';
        audio.pause();
    }
}
