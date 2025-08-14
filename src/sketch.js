import{ Mold } from '/src/mold.js';

export function initSketch(p) {
    let molds = [];
    let num = window.innerWidth <= 768 ? 500 : 7500; 
    let d;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('canvas-container');
        p.angleMode(p.DEGREES);
        d = p.pixelDensity();
        
        // Pass 'p' to each Mold instance
        for (let i = 0; i < num; i++) {
            molds[i] = new Mold(p);
        }
        
        console.log(`Created ${num} molds`); // Debug log
    };

    p.draw = function() {
        p.background(0, 5);
        p.loadPixels();
        
        for (let i = 0; i < num; i++) {
            molds[i].update();
            molds[i].display();
        }
        
        // Optional: show frame rate for debugging
        if (p.frameCount % 60 === 0) {
            console.log(`FPS: ${p.frameRate().toFixed(1)}`);
        }
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
}
