
// CLOCK
function tick() {
  const t = new Date();
  const s = [t.getHours(), t.getMinutes(), t.getSeconds()].map(n => String(n).padStart(2,'0')).join(':');
  document.getElementById('clock').textContent = s;
  document.getElementById('hero-clock').textContent = s;
}
tick(); setInterval(tick, 1000);

// MATRIX RAIN — purple palette
const canvas = document.getElementById('matrix-canvas');
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

// REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// SKILL BARS
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.style.width = e.target.dataset.level + '%'; });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-bar-fill').forEach(b => barObs.observe(b));

// INNER NAV ACTIVE
const sections = ['inicio','sobre-mi','mis-proyectos','mis-logros','contacto'];
const navLinks = document.querySelectorAll('.inner-nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && scrollY >= el.offsetTop - 120) current = id;
  });
  navLinks.forEach(a => {
    const href = a.getAttribute('href').replace('#','');
    a.classList.toggle('nav-active', href === current);
  });
});
