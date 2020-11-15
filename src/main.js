import {NEXT, PREV, setCovers, setInfo, swap} from "./carousel.js";
import {songs} from "./mockdata.js";

//Control buttons
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const timeSlider = document.getElementById('timeslider');
const voiceSlider = document.getElementById('voiceslider');
let currentTime = document.getElementById('currenttime');
let durationTime = document.getElementById('duration');

//Control variables
let seeking = false;
let getTo;
export let playlist_index = 1;
export let shuffleSwitch = false;
    
//Directory and extensions
const dir = "../music/";
const ext = ".mp3";
//For running firefox or opera
const agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext = ".ogg";
}

// Audio Object
const audio = new Audio();
audio.src = dir+songs[1]+ext;
audio.loop = false;


//Control functions

const getAudio = () => {
    if (playlist_index == 0) playlist_index = 1;
    audio.src = dir+songs[playlist_index]+ext;
	audio.play();
}

const loop = () => {
    if (audio.loop) {
        audio.loop = false;
        repeatBtn.style.color = '#000';

    } else {
        audio.loop = true;
        repeatBtn.style.color = '#2ECC71';

    }
}

const shuffle = () => {
    if (shuffleSwitch) {
        shuffleSwitch = false;
        shuffleBtn.style.color = '#000';
    } else {
        shuffleSwitch = true;
        shuffleBtn.style.color = '#2ECC71';
    }
}

const nextSong = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    setTimeout(() => {
        playBtn.classList.replace('fa-play', 'fa-pause');

    }, 500)
    timeSlider.value = 0;

    if (shuffleSwitch) {
        playlist_index = Math.floor(Math.random() * songs.length);
        console.log('playlistIndex', playlist_index);

        if (playlist_index == 0) playlist_index = 1;
        setInfo(playlist_index);
        getAudio();
    } else {
        playlist_index++;
        console.log('playlist index', playlist_index);
	    if (playlist_index > songs.length - 1) {
		    playlist_index = 1;
        }
        getAudio();
    }
    
}

const prevSong = () => {
    playlist_index--;
	if (playlist_index < 1) {
		playlist_index = songs.length - 1;
    }
    playBtn.classList.replace('fa-pause', 'fa-play');
    setTimeout(() => {
        playBtn.classList.replace('fa-play', 'fa-pause');

    }, 500)
    timeSlider.value = 0;
    getAudio();
}

const switchSong = () => {
    if (playlist_index == (songs.length - 1)) {
        playlist_index = 0;
    } else {
        playlist_index++;	
    }
    playBtn.classList.replace('fa-pause', 'fa-play');
    setTimeout(() => {
        playBtn.classList.replace('fa-play', 'fa-pause');

    }, 500)
    getAudio();
}

const playOrPause = () => {
    // console.log('audiosrc', audio.src);
    console.log('audicrnttime', audio.currentTime);

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

const goThisTime = (event) => {
    if (audio.duration == 0) {
        null
    } else {
        if (seeking) {
            console.log('tmsldVl', timeSlider.value);
            // timeSlider.value = event.clientX - timeSlider.offsetLeft;
            getTo = audio.duration * (timeSlider.value / 100);
            console.log('getTo', getTo);
            audio.currentTime = getTo;
        }
    } 
}

const setVoice = () => {
    audio.volume = voiceSlider.value / 100;
}

const seekTimeUpdate = () => {
    if (audio.duration) {
        let getCurrentTimeFromAudio = audio.currentTime * (100 / audio.duration);
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
        if(currentSeconds < 10){ currentSeconds = "0"+currentSeconds; }
        if(durationSeconds < 10){ durationSeconds = "0"+durationSeconds; }
        if(currentMinutes < 10){ currentMinutes = "0"+currentMinutes; }
        if(durationMinutes < 10){ durationMinutes = "0"+durationMinutes; }
        currentTime.innerHTML = currentMinutes+":"+currentSeconds;
        durationTime.innerHTML = durationMinutes+":"+durationSeconds;
    } else {
        currentTime.innerHTML = "00"+":"+"00";
        durationTime.innerHTML = "00"+":"+"00";
    }
}

//event listeners of control buttons
playBtn.addEventListener('click', (e) => {
    // Change Play/Pause icon
    if (e.target.classList.contains('fa-play')) {
        e.target.classList.replace('fa-play', 'fa-pause');
    } else {
        e.target.classList.replace('fa-pause', 'fa-play');
    }
    playOrPause();
});

nextBtn.addEventListener('click', () => {
    swap(NEXT);
    nextSong();
});

prevBtn.addEventListener('click', () => {
    swap(PREV);
    prevSong();
});

repeatBtn.addEventListener('click', () => loop());

shuffleBtn.addEventListener('click', () => shuffle());

timeSlider.addEventListener('mousedown', (event) => {
    seeking = true;
    goThisTime(event); 
});
timeSlider.addEventListener('mousemove', (event) => {
    goThisTime(event); 
});
timeSlider.addEventListener('mouseup', () => {
    seeking = false; 
});

voiceSlider.addEventListener('mousemove', () => setVoice());

audio.addEventListener('timeupdate', () => seekTimeUpdate());
audio.addEventListener('ended', () => switchSong());



setCovers();

console.log('shuffleSwitchGlobal', shuffleSwitch);
setInfo(document.querySelector('.maincover').getAttribute('id'));
