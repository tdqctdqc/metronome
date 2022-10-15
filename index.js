let bpm = 90;
let intervalIds = [];
const hits = [];
const audio = new Audio('tick.mp3');
let numMeasures = 2;
let measureSubdivision = 16;
function totalSubdivisions() {
    return numMeasures * measureSubdivision;
}
let counter = 0;
setupRhythm();

function setupRhythm() {
    const rhythmDiv = document.getElementById('rhythm');
    for (let measure = 0; measure < numMeasures; measure++) {
        const div = document.createElement('div');
        for (let subdivision = 0; subdivision < measureSubdivision; subdivision++) {
            const index = measureSubdivision * measure + subdivision;
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
            div.appendChild(span);
        }
        rhythmDiv.appendChild(div);
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
    for (let index = 0; index < totalSubdivisions(); index++) {
        const span = document.getElementById('rhythm'+index);
        span.setAttribute('class', '');
    }
    //clear on beat color
}

function playSound() {
    let numSubdivisions = measureSubdivision * numMeasures;
    let prevCounter = (counter + totalSubdivisions() - 1) % totalSubdivisions();
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
    counter = counter % totalSubdivisions();
}

function setBpm(newBpm) {
    bpm = newBpm;
    if(intervalIds.length > 0) {
        start();
    }
}
