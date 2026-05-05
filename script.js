/* ══════════════════════════════════════════════════
   Theme
══════════════════════════════════════════════════ */
(function () {
  const html = document.documentElement;
  const btn  = document.getElementById('themeBtn');
  const icon = document.getElementById('themeIcon');

  const sys    = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const saved  = localStorage.getItem('theme');
  let current  = saved || sys;

  applyTheme(current);

  btn.addEventListener('click', () => {
    current = current === 'dark' ? 'light' : 'dark';
    applyTheme(current);
    localStorage.setItem('theme', current);
  });

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    icon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
})();

/* ══════════════════════════════════════════════════
   1. Particle Network Canvas
══════════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;
  const mouse  = { x: null, y: null };

  function getColors() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      dot:  light ? 'rgba(109,40,217,0.5)'  : 'rgba(139,92,246,0.55)',
      line: light ? [109, 40, 217]           : [139, 92, 246],
    };
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }

  function init() {
    const n = Math.min(Math.floor(W * H / 14000), 110);
    particles = Array.from({ length: n }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r:  Math.random() * 1.8 + .6,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const { dot, line } = getColors();
    const LINK = 130, PULL = 160;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < PULL) { const f = (PULL - d) / PULL * .5; p.x += dx / d * f; p.y += dy / d * f; }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dot;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q  = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          const a = (1 - d / LINK) * .18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${line[0]},${line[1]},${line[2]},${a})`;
          ctx.lineWidth   = .5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize',    resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resize();
  draw();
})();

/* ══════════════════════════════════════════════════
   2. Custom Cursor
══════════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(pointer:coarse)').matches) return;

  const dot  = document.getElementById('cDot');
  const ring = document.getElementById('cRing');
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove',  e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown',  () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',    () => document.body.classList.remove('cursor-click'));

  document.querySelectorAll('a,button,.tilt,.mag,.ibtn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  (function loop() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
})();

/* ══════════════════════════════════════════════════
   3. Typewriter
══════════════════════════════════════════════════ */
(function () {
  const el  = document.getElementById('typeTarget');
  const sub = document.getElementById('heroSub');
  const cur = document.getElementById('tCursor');
  const name = 'Drishti Rana';
  const desc = "AI & Software Engineer  ·  Jabalpur Engineering College '24";
  let i = 0, j = 0, phase = 0;

  function type() {
    if (phase === 0) {
      if (i < name.length) { el.textContent += name[i++]; setTimeout(type, 80); }
      else { phase = 1; setTimeout(type, 600); }
    } else {
      cur.style.display = 'none';
      if (j < desc.length) { sub.textContent += desc[j++]; setTimeout(type, 28); }
    }
  }
  setTimeout(type, 400);
})();

/* ══════════════════════════════════════════════════
   4. Scroll Reveal
══════════════════════════════════════════════════ */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════════
   5. Active nav on scroll
══════════════════════════════════════════════════ */
(function () {
  const links = document.querySelectorAll('.nl');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.dataset.s === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('section[id]').forEach(s => io.observe(s));

  links.forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(l.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ══════════════════════════════════════════════════
   6. 3D Card Tilt + spotlight
══════════════════════════════════════════════════ */
(function () {
  const MAX = 12;
  document.querySelectorAll('.tilt').forEach(card => {
    const spot = card.querySelector('.spot');

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      card.style.transform = `perspective(900px) rotateY(${dx * MAX}deg) rotateX(${-dy * MAX}deg) translateZ(4px)`;
      if (spot) {
        spot.style.setProperty('--sx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--sy', `${e.clientY - r.top}px`);
      }
    });

    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ══════════════════════════════════════════════════
   7. Animated SVG Rings + Count-up
══════════════════════════════════════════════════ */
(function () {
  const CIRC = 238.76;
  document.querySelectorAll('.rf').forEach(c => { c.style.strokeDashoffset = CIRC; });

  const row = document.querySelector('.stats-row');
  if (!row) return;

  let fired = false;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting || fired) return;
    fired = true; io.disconnect();

    document.querySelectorAll('.rf').forEach(c => {
      const pct = parseFloat(c.dataset.pct) || 0;
      c.style.strokeDashoffset = CIRC * (1 - pct / 100);
    });

    document.querySelectorAll('.snum').forEach(el => {
      const to = +el.dataset.to, dur = 1600, start = performance.now();
      (function step(now) {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * to).toLocaleString();
        if (t < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }, { threshold: .3 });

  io.observe(row);
})();

/* ══════════════════════════════════════════════════
   8. Magnetic hover
══════════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const S = .3;
  document.querySelectorAll('.mag').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(e.clientX - r.left - r.width  / 2) * S}px`);
      el.style.setProperty('--my', `${(e.clientY - r.top  - r.height / 2) * S}px`);
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
})();
