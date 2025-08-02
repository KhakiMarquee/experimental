export function initStrudelPlayer() {
  const playButton = document.getElementById('play');
  let strudelInitialized = false;

  if (!playButton) return;

  playButton.addEventListener('click', () => {
    try {
      if (!strudelInitialized) {
        window.initStrudel();
        strudelInitialized = true;
      }
      window.note('<c a f e>(3,8)').jux(window.rev).play();
    } catch (e) {
      console.error('Strudel error:', e);
    }
  });
}
