export function drawCustomCursor(p) {
  p.noCursor();
  p.fill('#ADB5BD');
  p.noStroke();
  p.ellipse(p.mouseX, p.mouseY, 12, 12);
}