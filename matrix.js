// CLOCK (con guardas: no todas las páginas tienen #hero-clock)
function tick() {
  const t = new Date();
  const s = [t.getHours(), t.getMinutes(), t.getSeconds()].map(n => String(n).padStart(2,'0')).join(':');
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.textContent = s;
  const heroClockEl = document.getElementById('hero-clock');
  if (heroClockEl) heroClockEl.textContent = s;
}
tick(); setInterval(tick, 1000);

// MATRIX RAIN — paleta morada
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%ｦｧｨｩｪﾊﾋｻﾐﾑﾒｳｦｵ<>[]{}';
  const fs = 13;
  let drops = Array(Math.floor(innerWidth / fs)).fill(1);
  function draw() {
    ctx.fillStyle = 'rgba(5,0,8,0.055)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fs + 'px Share Tech Mono, monospace';
    drops.forEach((y, i) => {
      const bright = Math.random() > 0.96;
      ctx.fillStyle = bright ? '#f0a0ff' : (Math.random() > 0.65 ? '#d400ff' : '#3a0050');
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
      if (y * fs > canvas.height && Math.random() > 0.974) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(draw, 42);
}

// REVEAL AL HACER SCROLL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
