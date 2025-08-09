export function drawCustomCursor() {
  // Hide system cursor
  noCursor();

  // Draw a blue dot at the mouse position
  fill(0, 0, 255); // blue
  noStroke();
  ellipse(mouseX, mouseY, 12, 12);
}