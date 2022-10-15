let bpm = 90;
let intervalIds = [];
const audio = new Audio('tick.mp3');


function start() {
    stop();
    let beatsPerSec = bpm / 60;
    let beatsPerMs = beatsPerSec / 1000;
    let msPerBeat = 1 / beatsPerMs;

    let newIntervalId = setInterval(playSound, msPerBeat);
    intervalIds.push(newIntervalId);
}

function stop() {
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];
}

function playSound() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function setBpm(newBpm) {
    bpm = newBpm;
    if(intervalIds.length > 0) {
        console.log('resetting');
        start();
    }
}
