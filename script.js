const audio = document.getElementById('current-track');
const playPauseIcon = document.getElementById('play-pause');
const seekSlider = document.getElementById('seek-slider');
const duration = document.querySelector('.total-duration');
const currentTime = document.querySelector('.current-time');
const title = document.querySelector('.title');
const albumCover = document.querySelector('.album-cover');
const trackPicker =  document.getElementById('track-picker');

// initially display the currentTime
currentTime.textContent = formatTime(audio.currentTime);

// function to update the currentTime
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateCurrentTime() {
    currentTime.textContent = formatTime(audio.currentTime);
    seekSlider.value = Number(audio.currentTime);
}

// adding functionality to the seek-slider
seekSlider.addEventListener('input', (e) => {
    const newTime = e.target.value;
    audio.currentTime = newTime;
    currentTime.textContent = formatTime(newTime);
    
})

// seekSlider change event
seekSlider.addEventListener('change', (e) => {
    if (!audio.paused) {
        audio.play();
    }
})

// adding functionality to the play-pause button
playPauseIcon.src = './icons/circle-play-solid.svg';
playPauseIcon.addEventListener('click', playPause);

function playPause() {
    if (audio.paused) {
        playPauseIcon.src = './icons/pause-solid.svg';
        audio.play();
        audio.addEventListener('timeupdate', updateCurrentTime);
    } else if (!audio.paused) {
        playPauseIcon.src = './icons/circle-play-solid.svg';
        audio.pause();
    }
}

// adding functionality to the track-picker
trackPicker.addEventListener('change', (e) => {
    audio.pause();
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    audio.src = url;
    title.textContent = file.name;
    audio.load();
    // update metadata after loading
    audio.addEventListener('loadedmetadata', () => {
        duration.textContent = formatTime(audio.duration);
        seekSlider.max = audio.duration;
        currentTime.textContent = formatTime(audio.currentTime);
        seekSlider.value = Number(audio.currentTime);
    })
})