//p5 editor = p5js.org

let noise; // noise object
let chooseNoise, setVolume, toggleOnOf; //buttons
let fft;

function setup() {
  createCanvas(400, 200);
  noise = new p5.Noise();
  noise.amp(0);

  fft = new p5.FFT();

  toggleOnOf = createButton('play').position(5, 10);
  toggleOnOf.mousePressed(() => {
    if (noise.started) {
      noise.stop();
      toggleOnOf.html('play');
    } else {
      noise.start();
      toggleOnOf.html('stop');
    }
  });

  chooseNoise = createSelect().position(60, 10);
  chooseNoise.option('white');
  chooseNoise.option('pink');
  chooseNoise.option('brown');
  chooseNoise.changed(() => {
    noise.setType(chooseNoise.value());
  })

  setVolume = createSlider(0, 1, 0, 0).position(130, 10);
  setVolume.input(() => {
    noise.amp(setVolume.value(), 0.01);
  })

  stroke('white');
}

function draw() {
  background(80);
  //waveform of noise
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++) {
    point(map(i,0,spectrum.length,0,width), map(spectrum[i],0,255,height,0));
  }

}