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
timeSlider.value = 0;
    
//Directory and extensions
const dir = "../music/";
let ext = ".mp3";
//For running firefox or opera
const agent = navigator.userAgent.toLowerCase();
agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1 ? ext = ".ogg" : null;


// Audio Object
const audio = new Audio();
audio.src = dir+songs[1]+ext;
audio.loop = false;
// durationTime.innerHTML = audio.duration;



//Control functions

const getAudio = () => {
    playlist_index == 0 && (playlist_index = 1);
    audio.src = dir+songs[playlist_index]+ext;
	audio.play();
}

const loop = () => {
    audio.loop ? (
        audio.loop = false,
        repeatBtn.style.color = '#000'
    ) : (
        audio.loop = true,
        repeatBtn.style.color = '#2ECC71'
    )
}

const shuffle = () => {
    shuffleSwitch ? (
        shuffleSwitch = false,
        shuffleBtn.style.color = '#000'
    ) : (
        shuffleSwitch = true,
        shuffleBtn.style.color = '#2ECC71'
    )
}

const getRandomAudio = () => {
    playlist_index = Math.floor(Math.random() * songs.length);
}

const nextSong = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    setTimeout(() => {
        playBtn.classList.replace('fa-play', 'fa-pause');

    }, 500)

    if (shuffleSwitch) {
        getRandomAudio();

        if (playlist_index == 0) playlist_index = 1;
    } else {
        playlist_index++;
        console.log('playlist index', playlist_index);
	    if (playlist_index > songs.length - 1) {
		    playlist_index = 1;
        }
    }
    timeSlider.value = 0;
    setInfo(playlist_index);
    getAudio();
}

const prevSong = () => {
    if (shuffleSwitch) {
        getRandomAudio();
        if (playlist_index == 0) playlist_index = 1;        
    } else {
        playlist_index--;
	    if (playlist_index < 1) {
		    playlist_index = songs.length - 1;
        }
        playBtn.classList.replace('fa-pause', 'fa-play');
        setTimeout(() => {
            playBtn.classList.replace('fa-play', 'fa-pause');
        }, 500)
    }
    timeSlider.value = 0;
    setInfo(playlist_index);
    getAudio();
}

const switchSong = () => {
    if (playlist_index == (songs.length - 1)) {
        playlist_index = 0;
    } else {
        if (shuffleSwitch) {
            getRandomAudio();
            if (playlist_index == 0) playlist_index = 1;
        } else {
            playlist_index++;	
        }
    }
    playBtn.classList.replace('fa-pause', 'fa-play');
    setTimeout(() => {
        playBtn.classList.replace('fa-play', 'fa-pause');

    }, 500)
    timeSlider.value = 0;
    setInfo(playlist_index);
    getAudio();
}

const playOrPause = () => {
    audio.paused ? audio.play() : audio.pause();
}

const setVoice = () => {
    audio.volume = voiceSlider.value / 100;
}

const seekTimeUpdate = () => {
    if (audio.duration) {
	    timeSlider.value = audio.currentTime;
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
        currentSeconds < 10 &&  (currentSeconds = "0"+currentSeconds); 
        durationSeconds < 10 && (durationSeconds = "0"+durationSeconds); 
        currentMinutes < 10 &&  (currentMinutes = "0"+currentMinutes); 
        durationMinutes < 10 &&  (durationMinutes = "0"+durationMinutes); 
        currentTime.innerHTML = currentMinutes+":"+currentSeconds;
        durationTime.innerHTML = durationMinutes+":"+durationSeconds;
        
        // currentTime.remove();
        // let currentTimeHTML = document.createElement("span");
        // currentTimeHTML.id = 'currenttime';
        // let text = document.createTextNode(currentMinutes+":"+currentSeconds);
        // console.log('text', text);
        // console.log('testt', currentTime.replaceWith(currentTimeHTML));
        // currentTimeHTML.appendChild(text);      
        // currentTime.replaceWith(currentTimeHTML); 
    } else {
        currentTime.innerHTML = "00"+":"+"00";
        durationTime.innerHTML = "00"+":"+"00";
    }
}

//event listeners of control buttons
playBtn.addEventListener('click', (e) => {
    // Change Play/Pause icon
    e.target.classList.contains('fa-play') ? 
    e.target.classList.replace('fa-play', 'fa-pause') :
     e.target.classList.replace('fa-pause', 'fa-play');
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

timeSlider.addEventListener('input', () => audio.currentTime = timeSlider.value);


voiceSlider.addEventListener('mousemove', () => setVoice());

audio.addEventListener('timeupdate', () => seekTimeUpdate());

audio.addEventListener('ended', () => switchSong());



setCovers();

console.log('shuffleSwitchGlobal', shuffleSwitch);
setInfo(document.querySelector('.maincover').getAttribute('id'));
