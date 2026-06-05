(function() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const chars = '01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOP<>{}[]()=+-*/&|^~%#@!?';
  const fontSize = 14;

  function init() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / fontSize);
    drops = Array(cols).fill(1).map(() => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(7, 0, 13, 0.07)';
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const y = drops[i] * fontSize;
      ctx.fillStyle = '#cc55ff';
      ctx.font = fontSize + 'px "Share Tech Mono", monospace';
      ctx.fillText(char, i * fontSize, y);
      ctx.fillStyle = 'rgba(140,0,200,0.45)';
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y - fontSize);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5 + Math.random() * 0.5;
    }
  }

  init();
  window.addEventListener('resize', init);
  setInterval(draw, 50);
})();
