let bpm = 90;
let intervalIds = [];
const hits = [];
const audio = new Audio('tick.mp3');
let counter = 0;
setupRhythm();

function setupRhythm() {
    const rhythmDiv = document.getElementById('rhythm');
    for (let index = 0; index < 16; index++) {
        const check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.setAttribute('id', 'rhythm' + index);
        check.setAttribute('onchange', `toggledRhythm(this.checked, ${index})`);

        if((index) % 4 === 0) {
            check.setAttribute('checked', true);
            hits[index] = true;
        }
        else {
            hits[index] = false;
        }
        rhythmDiv.appendChild(check);
        console.log(hits);
    }
}

function toggledRhythm(pressed, index) {
    hits[index] = pressed;
}

function start() {
    stop();
    let beatsPerSec = bpm / 60;
    let beatsPerMs = beatsPerSec / 1000;
    let msPerBeat = 1 / beatsPerMs;
    let msPerSubdiv = msPerBeat / 4;

    let newIntervalId = setInterval(playSound, msPerSubdiv);
    intervalIds.push(newIntervalId);
}

function stop() {
    counter = 0;
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];
}

function playSound() {
    if(hits[counter] === true) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
    counter++;
    counter = counter % 16;
}

function setBpm(newBpm) {
    bpm = newBpm;
    if(intervalIds.length > 0) {
        console.log('resetting');
        start();
    }
}
