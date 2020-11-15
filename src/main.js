import {NEXT, PREV, setCovers, setInfo, swap} from "./carousel.js";

//event listeners of control buttons
document.getElementById('next').addEventListener('click', () => swap(NEXT));
document.getElementById('prev').addEventListener('click', () => swap(PREV));
// Change Play/Pause icon
document.getElementById('play').addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-play')) {
        e.target.classList.replace('fa-play', 'fa-pause');
    } else {
        e.target.classList.replace('fa-pause', 'fa-play');
    }
});

setCovers();
setInfo(document.querySelector('.maincover').getAttribute('id'));
