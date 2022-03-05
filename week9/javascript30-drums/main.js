//make the appropriate sound file play when the corresponding key is pressed.
const playingClass = 'playing',

const playSound = e => {
    const keyCode = e.keyCode,
        keyElement = document.querySelector(`div[data-key="${keyCode}"]`);

    if(!keyElement) return;

    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    audioElement.currentTime = 0;
    audioElement.play();
}
//remove transition
const removeKeyTransition = e => {
    if(e.propertyName !== 'transform') return;

    e.target.classList.remove(playingClass);
}