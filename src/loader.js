import p5 from 'p5';
import 'p5.sound';
import { initSketch } from '/src/sketch.js';

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const words = [
    "studio",
    "carving", 
    "lab",
    "research",
    "experimental",
    "rendering",
    "sculpting",
    "studio",
    "lab",
    "audiovisual",
    "research",
    "experimental",
    "cutting",
    "studio"
];

const finalWord = "studio";

let wordIndex = 0;
let shuffleCount = 0;
const totalShuffles = randInt(20, 50);

const updateCenterText = () => {
  const shuffleSpan = document.getElementById('shuffling-word');
  if (!shuffleSpan) return;

  if (shuffleCount >= totalShuffles) {
    shuffleSpan.textContent = finalWord;
  } else {
    shuffleSpan.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
    shuffleCount++;
  }
};

const fillBackgroundText = () => {
  const background = document.querySelector('.background-text');
  if (!background) return;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // capital letters
  const repeatCount = 2000; // adjust as needed to fill screen

  let randomText = '';
  for (let i = 0; i < repeatCount; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomText += chars[randomIndex];
  }

  background.textContent = randomText;
};




//fillBackgroundText();
updateCenterText();

const showLoading = () => {
  const screen = document.getElementById('loading-screen');
  if (screen) {
    screen.style.display = 'flex';
  }
};

const hideLoading = () => {
  const screen = document.getElementById('ls-small');
  const lscreen = document.getElementById('loading-screen');
  const background = document.querySelector('.background-text');
  if (screen) screen.style.display = 'none';
  if (lscreen) {lscreen.classList.add('loaded'), background.classList.add('loaded')};
  
};

const moveSiteBodyToApp = () => {
  const app = document.getElementById('app');
  const siteBody = document.querySelector('.site-body');
  if (app && siteBody) {
    app.appendChild(siteBody);
    app.style.display = 'block';
  }
};

const intervalDelay = 150;

const bootstrap = async () => {
  showLoading();
  const targetDiv = document.getElementById('canvas-container');
  new p5(initSketch, targetDiv);
  

  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      updateCenterText();

      if (shuffleCount >= totalShuffles) {
        clearInterval(intervalId);
        resolve();
      }
    }, intervalDelay);
  }).then(async () => {
    moveSiteBodyToApp();
    hideLoading();

    const { initApp } = await import('/src/main.js');
    initApp();
  });
};

bootstrap();
