import p5 from 'p5';

export default function stoneViewSketch(p) {
  let images = [];
  let angle = 0;
  let targetAngle = 0;
  let autoRotate = true;
  let autoSpeed = 0.005;
  let radius = 200;
  let centerX, centerY;
  let isDragging = false;
  let lastMouseX = 0;

  // Sample image data
  const imageData = [
    { title: "Modern Villa", description: "A contemporary architectural masterpiece featuring clean lines and sustainable materials.", color: "#e74c3c" },
    { title: "Urban Loft", description: "Industrial design meets modern comfort in this converted warehouse space.", color: "#3498db" },
    { title: "Garden House", description: "Seamless integration of indoor and outdoor living spaces with natural materials.", color: "#2ecc71" },
    { title: "Minimalist Retreat", description: "Pure geometric forms create a serene and contemplative living environment.", color: "#f39c12" },
    { title: "Coastal Residence", description: "Ocean-inspired design with panoramic views and sustainable features.", color: "#9b59b6" },
    { title: "Forest Cabin", description: "A harmonious blend of traditional craftsmanship and modern amenities.", color: "#1abc9c" },
    { title: "City Penthouse", description: "Luxury living at its finest with cutting-edge smart home technology.", color: "#e67e22" },
    { title: "Desert Oasis", description: "Climate-responsive design creating cool, comfortable spaces in harsh environments.", color: "#34495e" }
  ];

  p.setup = function() {
    let container = document.getElementById('carouselContainer');
    let canvas = p.createCanvas(p.windowWidth, 300);
    canvas.parent(container);

    centerX = p.windowWidth / 2;
    centerY = p.height + 50; // Position the center below the visible area
    radius = Math.min(p.windowWidth * 0.4, 300);

    for (let i = 0; i < imageData.length; i++) {
      images.push({
        angle: (p.TWO_PI / imageData.length) * i,
        data: imageData[i],
        id: i
      });
    }
  };

  p.draw = function() {
    p.clear();

    angle = p.lerp(angle, targetAngle, 0.05);

    if (autoRotate) {
      targetAngle += autoSpeed;
    }

    let ctx = p.drawingContext;
    ctx.save();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 50, p.PI, p.TWO_PI);
    ctx.clip();

    ctx.fillStyle = createBackgroundPattern();
    ctx.fillRect(0, 0, p.width, p.height);

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      let currentAngle = img.angle + angle;

      if ((currentAngle % p.TWO_PI > p.PI) || (currentAngle % p.TWO_PI < 0)) {
        drawImage(centerX + p.cos(currentAngle) * radius, centerY + p.sin(currentAngle) * radius, img.data, img.id, currentAngle);
      }
    }

    ctx.restore();
  };

  function createBackgroundPattern() {
    let canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, 20, 20);

    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(0, 0, 10, 10);
    ctx.fillRect(10, 10, 10, 10);

    return ctx.createPattern(canvas, 'repeat');
  }

  function drawImage(x, y, data, id, currentAngle) {
    p.push();
    p.translate(x, y);

    let scale = p.map(p.cos(currentAngle), -1, 1, 0.6, 1.2);
    scale = p.constrain(scale, 0.6, 1.2);

    let opacity = p.map(p.cos(currentAngle), -1, 1, 0.3, 1.0);
    opacity = p.constrain(opacity, 0.3, 1.0);

    scale *= 0.8;
    p.rotate(currentAngle + p.PI / 2);

    p.fill(p.red(p.color(data.color)), p.green(p.color(data.color)), p.blue(p.color(data.color)), opacity * 255);
    p.stroke(255, opacity * 255);
    p.strokeWeight(2);
    p.rectMode(p.CENTER);
    p.rect(0, 0, 100 * scale, 80 * scale, 5);

    p.fill(255, opacity * 255);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textSize(10 * scale);
    p.text(data.title, 0, 0);

    images[id].bounds = {
      x: x,
      y: y,
      w: 100 * scale,
      h: 80 * scale,
      scale: scale,
      opacity: opacity
    };

    p.pop();
  }

  p.mousePressed = function() {
    for (let i = 0; i < images.length; i++) {
      if (images[i].bounds && images[i].bounds.opacity > 0.5) {
        let b = images[i].bounds;
        if (p.dist(p.mouseX, p.mouseY, b.x, b.y) < Math.max(b.w, b.h) / 2) {
          openFullscreen(images[i].data);
          return;
        }
      }
    }
    isDragging = true;
    lastMouseX = p.mouseX;
    autoRotate = false;
  };

  p.mouseDragged = function() {
    if (isDragging) {
      let deltaX = p.mouseX - lastMouseX;
      targetAngle += deltaX * 0.01;
      lastMouseX = p.mouseX;
    }
  };

  p.mouseReleased = function() {
    isDragging = false;
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, 300);
    centerX = p.windowWidth / 2;
    radius = Math.min(p.windowWidth * 0.4, 300);
  };

  function moveCarousel(direction) {
    autoRotate = false;
    targetAngle += (p.TWO_PI / images.length) * direction;
  }

  function toggleAutoRotate() {
    autoRotate = !autoRotate;
  }

  function openFullscreen(data) {
    document.getElementById('fullscreenTitle').textContent = data.title;
    document.getElementById('fullscreenDescription').textContent = data.description;
    document.getElementById('fullscreenImage').style.backgroundColor = data.color;
    document.getElementById('fullscreenOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFullscreen() {
    document.getElementById('fullscreenOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Keyboard controls
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowLeft':
        moveCarousel(-1);
        break;
      case 'ArrowRight':
        moveCarousel(1);
        break;
      case ' ':
        e.preventDefault();
        toggleAutoRotate();
        break;
      case 'Escape':
        closeFullscreen();
        break;
    }
  });
}

new p5(stoneViewSketch);
