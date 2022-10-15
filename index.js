let bpm = 90;
let intervalIds = [];
const hits = [];
const audio = new Audio('tick.mp3');
let numMeasures = 1;
let measureSubdivision = 16;
let counter = 0;
setupRhythm();

function setupRhythm() {
    const rhythmDiv = document.getElementById('rhythm');
    for (let measure = 0; measure < numMeasures; measure++) {
        for (let subdivision = 0; subdivision < measureSubdivision; subdivision++) {
            const index = subdivision * measure + subdivision;
            const span = document.createElement('span');
            const check = document.createElement('input');
            check.setAttribute('type', 'checkbox');
            span.setAttribute('id', 'rhythm' + index);
            check.setAttribute('onchange', `toggledRhythm(this.checked, ${index})`);
            
            if((index) % 4 === 0) {
                check.setAttribute('checked', true);
                hits[index] = true;
            }
            else {
                hits[index] = false;
            }
    
            span.appendChild(check);
            rhythmDiv.appendChild(span);
        }
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
    //clear on beat color
}

function playSound() {
    let numSubdivisions = measureSubdivision * numMeasures;
    let prevCounter = (counter + numSubdivisions - 1) % numSubdivisions;
    let prevSpan = document.getElementById('rhythm' + prevCounter);
    prevSpan?.setAttribute('class', '');
    let span = document.getElementById('rhythm' + counter);
    span.setAttribute('class', 'onBeat');
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
        start();
    }
}
