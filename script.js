const audio = document.getElementById('current-track');
const playPauseIcon = document.getElementById('play-pause');
const seekSlider = document.getElementById('seek-slider');
const duration = document.querySelector('.total-duration');
const currentTime = document.querySelector('.current-time');
const title = document.querySelector('.title');
const albumCover = document.querySelector('.album-cover');
const trackPicker =  document.getElementById('track-picker');
let files = trackPicker.files; // FileList containing a list of objects representing the track files which is not a proper array
const next = document.getElementById('next');
const previous = document.getElementById('previous');

// update the track files with their URLs
let playListArray = Array.from(files).map((file) => {
    return {
        name: file.name,
        url: URL.createObjectURL(file)
    }
})

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
    // audio.pause();
    // console.log(playListArray);
    // const url = URL.createObjectURL(file);
    const firstTrack =  playListArray[0];
    audio.src = playListArray[0].url;
    title.textContent = firstTrack.name;
    audio.load();
    // update metadata after loading
    audio.addEventListener('loadedmetadata', () => {
        duration.textContent = formatTime(audio.duration);
        seekSlider.max = audio.duration;
        currentTime.textContent = formatTime(audio.currentTime);
        seekSlider.value = Number(audio.currentTime);
    })
    
})

// adding functionality to the next button
next.addEventListener('click', () => {
    const currentIndex = playListArray.findIndex((track) => track.url === audio.src);
    let nextIndex = currentIndex + 1;
    if (nextIndex < playListArray.length) {
        audio.load();
        audio.src = playListArray[nextIndex].url;
        title.textContent = playListArray[nextIndex].name;
        console.log(nextIndex);
        audio.play();
    } else {
        audio.load();
        nextIndex = 0;
        audio.src = playListArray[nextIndex].url;
        title.textContent = playListArray[nextIndex].name;
        audio.play();
    }
})

// adding functionality to the previous button
previous.addEventListener('click', () => {
    const currentIndex = playListArray.findIndex((track) => track.url === audio.src);
    let previousIndex =  currentIndex - 1;
    if (previousIndex >= 0) {
        audio.load();
        audio.src = playListArray[previousIndex].url;
        title.textContent = playListArray[previousIndex].name;
        audio.play();
    } else {
        audio.load();
        previousIndex =  playListArray.length - 1;
        audio.src = playListArray[previousIndex].url;
        title.textContent = playListArray[previousIndex].name;
        audio.play();
    }
})