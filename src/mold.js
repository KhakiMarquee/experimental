// Fixed Mold class that works with p5.js instance mode
export class Mold {
    constructor(p5Instance) {
        this.p = p5Instance; // Store reference to p5 instance
        
        this.x = this.p.random(this.p.width);
        this.y = this.p.random(this.p.height);
        this.r = 0.5;
        
        this.heading = this.p.random(360);
        this.vx = this.p.cos(this.heading);
        this.vy = this.p.sin(this.heading);
        this.rotAngle = 45;
        
        this.rSensorPos = this.p.createVector(0, 0);
        this.lSensorPos = this.p.createVector(0, 0);
        this.fSensorPos = this.p.createVector(0, 0);      
        this.sensorAngle = 45;
        this.sensorDist = 10;
    }
  
    update() {
        this.vx = this.p.cos(this.heading);
        this.vy = this.p.sin(this.heading);
        
        this.x = (this.x + this.vx + this.p.width) % this.p.width;
        this.y = (this.y + this.vy + this.p.height) % this.p.height;
        
        this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
        this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
        this.getSensorPos(this.fSensorPos, this.heading);

        let index, l, r, f;
        let d = this.p.pixelDensity();
        
        // Bounds checking to prevent array access errors
        const maxIndex = this.p.pixels.length - 1;
        
        index = 4 * (d * this.p.floor(this.rSensorPos.y)) * (d * this.p.width) + 4 * (d * this.p.floor(this.rSensorPos.x));
        r = (index >= 0 && index <= maxIndex) ? this.p.pixels[index] : 0;
        
        index = 4 * (d * this.p.floor(this.lSensorPos.y)) * (d * this.p.width) + 4 * (d * this.p.floor(this.lSensorPos.x));
        l = (index >= 0 && index <= maxIndex) ? this.p.pixels[index] : 0;
        
        index = 4 * (d * this.p.floor(this.fSensorPos.y)) * (d * this.p.width) + 4 * (d * this.p.floor(this.fSensorPos.x));
        f = (index >= 0 && index <= maxIndex) ? this.p.pixels[index] : 0;
        
        if (f > l && f > r) {
            this.heading += 0;
        } else if (f < l && f < r) {
            if (this.p.random(1) < 0.5) {
                this.heading += this.rotAngle;          
            } else {
                this.heading -= this.rotAngle;
            }
        } else if (l > r) {
            this.heading -= this.rotAngle;
        } else if (r > l) {
            this.heading += this.rotAngle;   
        }
    }
  
    display() {
        this.p.noStroke();
        this.p.fill(255);
        this.p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
  
    getSensorPos(sensor, angle) {
        sensor.x = (this.x + this.sensorDist * this.p.cos(angle) + this.p.width) % this.p.width;
        sensor.y = (this.y + this.sensorDist * this.p.sin(angle) + this.p.height) % this.p.height; 
    }
}