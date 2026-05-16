// CURSOR
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
document.addEventListener('mousemove', e => {
  cur.style.left = (e.clientX - 6) + 'px';
  cur.style.top = (e.clientY - 6) + 'px';
  ring.style.left = (e.clientX - 22) + 'px';
  ring.style.top = (e.clientY - 22) + 'px';
});
document.querySelectorAll('a,button,.pc,.sc,.cr,.mi').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.transform = 'scale(2.5)'; ring.style.transform = 'scale(1.4)'; });
  el.addEventListener('mouseleave', () => { cur.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; });
});

// NAV
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});

// SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('on'), i * 55); });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// MOUSE PARALLAX (hero shapes)
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const dx = e.clientX - cx, dy = e.clientY - cy;
  const s = (id, sx, sy) => {
    const el = document.getElementById(id);
    if (el) el.style.transform = `translate(${dx * sx}px, ${dy * sy}px)`;
  };
  s('hs1', 0.025, 0.02);
  s('hs2', -0.03, -0.025);
  s('hs3', 0.015, 0.03);
  s('dots', 0.01, 0.01);
});

// SCROLL PARALLAX
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const move = (id, speed) => {
    const el = document.getElementById(id);
    if (el) el.style.transform = `translateY(${y * speed}px)`;
  };
  move('hs1', 0.12);
  move('hs2', -0.08);
  move('hs3', 0.06);
});

// COUNT-UP
function countUp(el, to, suffix) {
  let n = 0, dur = 1400, step = 16;
  const inc = to / (dur / step);
  const t = setInterval(() => {
    n = Math.min(n + inc, to);
    el.innerHTML = Math.floor(n) + (suffix ? `<em>${suffix}</em>` : '');
    if (n >= to) clearInterval(t);
  }, step);
}
const numObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    countUp(document.getElementById('n1'), 35, '+');
    countUp(document.getElementById('n2'), 8, '+');
    countUp(document.getElementById('n3'), 2, '');
    countUp(document.getElementById('n4'), 5, 'th');
    numObs.disconnect();
  });
}, { threshold: 0.5 });
const hw = document.querySelector('.hero-nums');
if (hw) numObs.observe(hw);
