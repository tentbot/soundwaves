const FREQ_STEP = 10;
const AMP_STEP = 0.05;
const TOGGLE_KEY = 32;  //Space bar
let freq = 440;
let amp = 0;
let playing = false;
let wave;
let fft;

function setup() {
    createCanvas(windowWidth, windowHeight);
    wave = new p5.Oscillator();
    wave.setType('sine');
    wave.freq(freq);
    wave.amp(0);
    wave.start();
    fft = new p5.FFT();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(4);
}

function draw() {
    background(0);
    if (playing) {
        wave.amp(amp);
    } else {
        wave.amp(0);
    }
    wave.freq(freq);
    let waveform = fft.waveform();
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();
}

function keyPressed() {
    if (keyCode === TOGGLE_KEY) {
        playing = !playing;
    }
}

function keyTyped() {
    if (key === 'd') {
        freq += FREQ_STEP;
    } else if (key === 'a') {
        freq -= FREQ_STEP;
    } else if (key === 'w') {
        amp += AMP_STEP;
    } else if (key === 's') {
        amp -= AMP_STEP;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}