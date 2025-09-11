export function teamHoverPreview() {
  document.querySelectorAll('.team-member').forEach(member => {
    const bwImg = member.querySelector('img.bw');
    const colourImg = member.querySelector('img.colour');

    if (!bwImg || !colourImg) return;

    // Set initial state
    bwImg.classList.remove('hide');
    colourImg.classList.add('hide');

    member.addEventListener('mouseenter', () => {
      bwImg.classList.add('hide');
      colourImg.classList.remove('hide');
    });

    member.addEventListener('mouseleave', () => {
      bwImg.classList.remove('hide');
      colourImg.classList.add('hide');
    });
  });
}
