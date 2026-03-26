/* ═══════════════════════════════════════════════════════════════
   CYBERSECURITY PORTFOLIO v2 — STORYTELLING EDITION
   Boot · Per-section particles · Tilt · Terminal typing ·
   Counters · Scroll progress · Cursor glow
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── 1. BOOT SCREEN ──────────────────────────────────────
  const bootData = [
    { t: '[*] Initializing Security System...', c: 'info',    d: 0 },
    { t: '[+] Loading kernel modules.............. OK', c: 'success', d: 400 },
    { t: '[+] Establishing encrypted tunnel....... OK', c: 'success', d: 800 },
    { t: '[+] Verifying biometric identity........ OK', c: 'success', d: 1200 },
    { t: '[!] Firewall active — scanning ports...', c: 'warning', d: 1600 },
    { t: '[+] Decrypting portfolio data........... OK', c: 'success', d: 2000 },
    { t: '[+] All systems operational............. OK', c: 'success', d: 2400 },
    { t: '>>> ACCESS GRANTED <<<',                       c: 'access',  d: 3000 },
  ];

  const bootBox = document.getElementById('boot-lines');
  const bootEl  = document.getElementById('boot-screen');

  document.body.style.overflow = 'hidden';

  bootData.forEach(({ t, c, d }) => {
    setTimeout(() => {
      const ln = document.createElement('div');
      ln.className = `line ${c}`;
      ln.textContent = t;
      bootBox.appendChild(ln);
    }, d);
  });

  setTimeout(() => {
    bootEl.classList.add('hidden');
    document.body.style.overflow = '';
    initParticles();
    triggerReveal();
    startTerminalTyping();
  }, 4200);


  // ─── 2. PER-SECTION PARTICLE CANVASES ─────────────────────
  function initParticles() {
    document.querySelectorAll('[data-particles]').forEach(sec => {
      const type   = sec.dataset.particles;
      const canvas = sec.querySelector('.section-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      function resize() {
        canvas.width  = sec.offsetWidth;
        canvas.height = sec.offsetHeight;
      }
      resize();

      const ro = new ResizeObserver(resize);
      ro.observe(sec);

      if (type === 'matrix')  matrixRain(ctx, canvas);
      if (type === 'float')   floatParticles(ctx, canvas);
      if (type === 'grid')    gridParticles(ctx, canvas);
      if (type === 'glow')    glowParticles(ctx, canvas);
    });
  }

  /* ── MATRIX RAIN (hero) ──────────────────────────────────── */
  function matrixRain(ctx, canvas) {
    const chars = 'アイウエオカキクケコ0123456789ABCDEF<>/{}[]#$%';
    const fs = 14;
    let cols = Math.floor(canvas.width / fs);
    let drops = Array.from({ length: cols }, () => Math.random() * -50);

    function draw() {
      ctx.fillStyle = 'rgba(6,10,16,.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,255,136,.32)';
      ctx.font = `${fs}px "Share Tech Mono",monospace`;

      cols = Math.floor(canvas.width / fs);
      while (drops.length < cols) drops.push(0);

      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── FLOATING PARTICLES (about, experience, achievements, education) ── */
  function floatParticles(ctx, canvas) {
    const count = Math.min(60, Math.floor(canvas.width * canvas.height / 12000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.6,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.35 + 0.08,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.a})`;
        ctx.fill();
      });
      // connect nearby
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0,255,136,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── GRID / TECH PATTERN (skills, projects, certifications) ─ */
  function gridParticles(ctx, canvas) {
    const spacing = 50;
    let offset = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offset = (offset + 0.15) % spacing;

      ctx.strokeStyle = 'rgba(0,255,136,.04)';
      ctx.lineWidth = 0.5;

      for (let x = offset; x < canvas.width; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = offset; y < canvas.height; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // dots at intersections
      for (let x = offset; x < canvas.width; x += spacing) {
        for (let y = offset; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,229,255,.12)';
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── GLOW PARTICLES (contact) ──────────────────────────── */
  function glowParticles(ctx, canvas) {
    const count = 25;
    const orbs = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 40 + 20,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? 155 : 187,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy;
        if (o.x < -o.r || o.x > canvas.width + o.r)  o.dx *= -1;
        if (o.y < -o.r || o.y > canvas.height + o.r) o.dy *= -1;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},100%,60%,.06)`);
        g.addColorStop(1, `hsla(${o.hue},100%,50%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }


  // ─── 3. HERO TYPING ANIMATION ─────────────────────────────
  const heroEl = document.getElementById('heroTyping');
  const phrases = [
    'VAPT Expert | Network Defender | Ethical Hacker',
    'Penetration Testing | Bug Hunting | Threat Analysis',
    'Secure Systems | Proactive Defense | Risk Mitigation',
  ];
  let pIdx = 0, cIdx = 0, deleting = false;

  function heroType() {
    const cur = phrases[pIdx];
    heroEl.textContent = deleting
      ? cur.substring(0, --cIdx)
      : cur.substring(0, ++cIdx);

    let delay = deleting ? 30 : 55;
    if (!deleting && cIdx === cur.length) { delay = 2000; deleting = true; }
    else if (deleting && cIdx === 0)      { deleting = false; pIdx = (pIdx + 1) % phrases.length; delay = 400; }
    setTimeout(heroType, delay);
  }
  setTimeout(heroType, 4600);


  // ─── 4. TERMINAL TYPING (About section) ───────────────────
  function startTerminalTyping() {
    const el = document.getElementById('terminalTyping');
    if (!el) return;
    const lines = [
      'A passionate <strong>Cybersecurity Enthusiast</strong> with hands-on experience in',
      '<strong>Penetration Testing</strong>, <strong>Vulnerability Assessment</strong>,',
      'and <strong>Network Security</strong>.',
      '',
      'I think like an attacker to defend like a pro.',
      'Ethical hacking mindset · Offensive + Defensive security.',
      'Real-world problem solver who breaks to protect.',
    ];
    let li = 0, ci = 0;
    function next() {
      if (li >= lines.length) return;
      if (lines[li] === '') {
        el.innerHTML += '<br>';
        li++; ci = 0;
        setTimeout(next, 200);
        return;
      }
      // We write HTML-safe: parse tags as whole units
      const raw = lines[li];
      if (ci < raw.length) {
        // If we hit a '<', find closing '>' and add whole tag
        if (raw[ci] === '<') {
          const end = raw.indexOf('>', ci);
          el.innerHTML += raw.substring(ci, end + 1);
          ci = end + 1;
        } else {
          el.innerHTML += raw[ci];
          ci++;
        }
        setTimeout(next, 18);
      } else {
        el.innerHTML += '<br>';
        li++; ci = 0;
        setTimeout(next, 100);
      }
    }
    // Start after a short delay when about section is first visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          observer.disconnect();
          next();
        }
      });
    }, { threshold: 0.3 });
    const aboutSec = document.getElementById('about');
    if (aboutSec) observer.observe(aboutSec);
  }


  // ─── 5. NAVBAR ────────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', scrollY > 60);
    highlightNav();
    updateProgress();
  });

  function highlightNav() {
    const sy = scrollY + 160;
    sections.forEach(s => {
      const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
      if (link) link.classList.toggle('active', sy >= s.offsetTop && sy < s.offsetTop + s.offsetHeight);
    });
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  allLinks.forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }));


  // ─── 6. SCROLL PROGRESS BAR ──────────────────────────────
  const progressBar = document.getElementById('scrollProgress');

  function updateProgress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (scrollY / h) * 100 : 0;
    progressBar.style.width = pct + '%';
  }


  // ─── 7. SCROLL REVEAL ────────────────────────────────────
  function triggerReveal() {
    const els = document.querySelectorAll('.reveal');
    const trigger = window.innerHeight * 0.88;
    els.forEach(el => {
      if (el.getBoundingClientRect().top < trigger) el.classList.add('active');
    });
  }
  window.addEventListener('scroll', triggerReveal);


  // ─── 8. ANIMATED COUNTERS ────────────────────────────────
  let countersRan = false;

  function animateCounters() {
    if (countersRan) return;
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    // Check if any counter is visible
    const first = nums[0];
    if (first.getBoundingClientRect().top > window.innerHeight) return;

    countersRan = true;
    nums.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const prefix = el.textContent.startsWith('#') ? '#' : '';
      let cur = 0;
      const inc = Math.ceil(target / 50);
      const iv = setInterval(() => {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(iv); }
        el.textContent = prefix + cur;
      }, 30);
    });
  }
  window.addEventListener('scroll', animateCounters);


  // ─── 9. PROJECT CARD 3D TILT ─────────────────────────────
  document.querySelectorAll('.proj-card').forEach(card => {
    const inner = card.querySelector('.proj-inner');
    if (!inner || window.matchMedia('(pointer: coarse)').matches) return;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 8;   // max 8deg
      const rotX = ((cy - y) / cy) * 8;
      inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateX(0) rotateY(0)';
    });
  });


  // ─── 10. CURSOR GLOW (DESKTOP) ───────────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:fixed;width:320px;height:320px;border-radius:50%;
      background:radial-gradient(circle,rgba(0,255,136,.055) 0%,transparent 70%);
      pointer-events:none;z-index:9990;transform:translate(-50%,-50%);
      transition:left .08s linear,top .08s linear;
    `;
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }


  // ─── 11. SMOOTH SCROLL ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) { e.preventDefault(); tgt.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });


  // ─── 12. CONTACT FORM (Web3Forms) ─────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn span');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';

      try {
        const formData = new FormData(form);
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          btn.textContent = 'Message Sent! ✓';
          form.reset();
        } else {
          btn.textContent = 'Failed — Try Again';
        }
      } catch (err) {
        btn.textContent = 'Error — Try Again';
      }

      setTimeout(() => { btn.textContent = originalText; }, 3000);
    });
  }

})();
