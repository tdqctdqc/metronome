let bpm = 90;
let intervalIds = [];
const hits = [];
const tick = new Audio('tick.mp3');
const currentSubdivClass = 'currentSubdiv';
let numMeasures = 2;
let beatSubdivs = [0, 4, 8, 12];
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
            check.addEventListener('change', e => toggledSubdivisionActive(e.target.checked, index));
            if(beatSubdivs.includes(subdivision)) {
                check.setAttribute('checked', true);
                span.classList.add('beat');
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

function toggledSubdivisionActive(pressed, index) {
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
        const span = getSubdivisionSpan(index);
        span.classList.remove(currentSubdivClass);
    }
}

function playSound() {
    let numSubdivisions = measureSubdivision * numMeasures;
    let prevCounter = (counter + totalSubdivisions() - 1) % totalSubdivisions();
    let prevSpan = getSubdivisionSpan(prevCounter);
    prevSpan.classList.remove(currentSubdivClass);
    let span = getSubdivisionSpan(counter);
    span.classList.add(currentSubdivClass);
    if(hits[counter] === true) {
        tick.pause();
        tick.currentTime = 0;
        tick.play();
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

function getSubdivisionSpan(index) {
    return document.getElementById('rhythm' + index);
}
