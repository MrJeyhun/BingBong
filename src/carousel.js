import {artists, songs, covers} from "./mockdata.js";
import {playlist_index, shuffleSwitch} from "./main.js";

const coversLength = document.querySelectorAll(".app__carousel ul li.app__carousel__item").length;
export const NEXT = 1;
export const PREV = -1;
let startItem = 1;
const leftpos = coversLength;
const resetCount = coversLength;

export const setCovers = () => {
    for (let id = 1; id <= coversLength; id++) {
        document.getElementById(`${id}`).style.backgroundImage = `url(${covers[id]})`;
    }
}

export const setInfo = (id) => {
    console.log('setInfoID', id);
    document.getElementById('song').textContent = `${songs[id]}`;
    document.getElementById('artist').textContent = `${artists[id]}`;
}

//swap cover and music info
export const swap = (direction) => {
    if (direction == PREV) {
        let leftItem = document.querySelector('.leftcover').getAttribute('id') - 1;

        if (leftItem == 0) leftItem = coversLength;

        document.querySelector('.rightcover').classList.replace('rightcover', 'backcover');
        document.querySelector('.maincover').classList.replace('maincover', 'rightcover');
        document.querySelector('.leftcover').classList.replace('leftcover', 'maincover');
        document.getElementById(`${leftItem}`).classList.replace('backcover', 'leftcover')

        startItem--;
        if (startItem < 1) startItem = coversLength;
    }

    if (direction == NEXT) {
        let position = 0;

        const setPosition = (positionValue) => {
            if (positionValue != 'leftposition') {
                // Increment image list id
                position++;

                // If final result is greater than image count, reset position
                if (startItem + position > resetCount) {
                    position = 1 - startItem;
                }
            }

            // Setting the left positioned item
            if (positionValue == "leftposition") {
                // Left positioned image should always be one left than main positioned image
                position = startItem - 1;
  
                // Reset last image in list to left position if first image is in main position
                if (position < 1) {
                    position = coversLength;
                }
            }

            return position;
        }

        document.getElementById(`${startItem}`).classList.replace('maincover', 'leftcover');
        document.getElementById(`${startItem + setPosition()}`).classList.replace('rightcover', 'maincover');
        document.getElementById(`${startItem + setPosition()}`).classList.replace('backcover', 'rightcover');
        document.getElementById(`${setPosition('leftposition')}`).classList.replace('leftcover', 'backcover');

        startItem++;
        position = 0;
        if (startItem > coversLength) startItem = 1;
    }

    setInfo(document.querySelector('.maincover').getAttribute('id'));
}

