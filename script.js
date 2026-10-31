document.getElementById('year').textContent = new Date().getFullYear();

// Ember field — sparks drifting up off an unseen forge, behind the hero only.
// Vanilla canvas, no dependency. Respects prefers-reduced-motion and tab visibility.
(() => {
  const canvas = document.getElementById('emberField');
  if (!canvas) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  let particles = [];
  let running = true;
  let frameId = null;

  const EMBER = [201, 154, 91];   // --accent
  const STEEL = [92, 122, 140];   // --steel
  const COUNT_PER_1000PX2 = 0.018;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    const target = Math.max(18, Math.min(70, Math.round(w * h * COUNT_PER_1000PX2 / 1000)));
    particles = Array.from({ length: target }, spawn);
  }

  function spawn(existing) {
    const steelTint = Math.random() < 0.22;
    const p = existing || {};
    p.x = Math.random() * w;
    p.y = h + Math.random() * 40;
    p.r = Math.random() * 1.3 + 0.4;
    p.speed = Math.random() * 0.26 + 0.08;
    p.drift = (Math.random() - 0.5) * 0.18;
    p.sway = Math.random() * Math.PI * 2;
    p.swaySpeed = Math.random() * 0.012 + 0.004;
    p.alphaMax = Math.random() * 0.5 + 0.18;
    p.color = steelTint ? STEEL : EMBER;
    p.life = 0;
    return p;
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.life += 1;
      p.y -= p.speed;
      p.sway += p.swaySpeed;
      p.x += p.drift + Math.sin(p.sway) * 0.12;
      const fadeIn = Math.min(1, p.life / 60);
      const fadeOut = Math.min(1, (h - p.y) / (h * 0.35));
      const alpha = p.alphaMax * fadeIn * Math.max(0, Math.min(1, fadeOut));
      if (p.y < -10 || p.x < -10 || p.x > w + 10) {
        spawn(p);
        continue;
      }
      const [r, g, b] = p.color;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    frameId = requestAnimationFrame(step);
  }

  if (reduceMotion) {
    // Static single frame: no animation loop at all.
    resize();
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      const [r, g, b] = p.color;
      ctx.fillStyle = `rgba(${r},${g},${b},${p.alphaMax * 0.4})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    window.addEventListener('resize', () => {
      resize();
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const [r, g, b] = p.color;
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alphaMax * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    return;
  }

  resize();
  frameId = requestAnimationFrame(step);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running && !frameId) frameId = requestAnimationFrame(step);
  });
})();

const menuToggle = document.getElementById('menuToggle');
const navInner = document.getElementById('navInner');
const mobilePanel = document.getElementById('mobilePanel');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navInner.classList.toggle('open');
    mobilePanel.style.display = mobilePanel.style.display === 'flex' ? 'none' : 'flex';
  });

  mobilePanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobilePanel.style.display = 'none';
      navInner.classList.remove('open');
    });
  });
}
