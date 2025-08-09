import{ Mold } from '/src/mold.js';

export function initSketch(p) {
    let molds = [];
    let num = 4000;
    let d;

    p.setup = function() {
        p.createCanvas(1500, 1500);
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
}
