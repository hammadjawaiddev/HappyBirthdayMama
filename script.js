/* =================================================================
   MAMA'S BIRTHDAY — MAIN SCRIPT
   ---------------------------------------------------------------
   Sections:
   1. Loader
   2. Ambient Particle / Starfield Canvas
   3. Floating Hearts (hero)
   4. Typed.js subtitle
   5. AOS init
   6. Cursor glow + card tilt
   7. Ripple buttons
   8. Letter opening effect
   9. LightGallery
   10. Cake — blow candles
   11. Gift box
   12. Music player
   13. Swiper wishes
   14. Final section — fireworks / confetti / balloons
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. LOADER
     Simulate a short premium load, then fade loader out and
     fade the site in. Adjust MIN_LOAD_MS to taste.
  ============================================================ */
  const loader = document.getElementById('loader');
  const loaderBarFill = document.querySelector('.loader-bar-fill');
  const site = document.getElementById('site');
  const MIN_LOAD_MS = 1800;

  gsap.to(loaderBarFill, { width: '100%', duration: MIN_LOAD_MS / 1000, ease: 'power2.inOut' });

  window.setTimeout(() => {
    loader.classList.add('loader-hidden');
    site.classList.add('site-visible');
    document.body.style.overflow = '';
    // Kick off entrance animation for hero once visible
    gsap.fromTo('.hero-content > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
  }, MIN_LOAD_MS);

  /* ============================================================
     2. AMBIENT PARTICLE / STARFIELD CANVAS
     Soft gold specks drifting slowly across the background —
     purely decorative, respects reduced motion.
  ============================================================ */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pCanvas = document.getElementById('particles-canvas');
  const pCtx = pCanvas.getContext('2d');
  let stars = [];

  function resizeCanvas(){
    pCanvas.width = window.innerWidth;
    pCanvas.height = document.documentElement.scrollHeight;
  }

  function initStars(){
    const count = Math.min(120, Math.floor(window.innerWidth / 12));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * pCanvas.width,
      y: Math.random() * pCanvas.height,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.15 + 0.02,
      alpha: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.82 ? 'pink' : 'gold'
    }));
  }

  function drawStars(){
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    stars.forEach(s => {
      pCtx.beginPath();
      pCtx.fillStyle = s.hue === 'pink'
        ? `rgba(242,166,184,${s.alpha})`
        : `rgba(212,175,55,${s.alpha})`;
      pCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      pCtx.fill();
      s.y -= s.speed;
      if (s.y < -10) s.y = pCanvas.height + 10;
    });
    if (!reduceMotion) requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  initStars();
  drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

  /* ============================================================
     3. FLOATING HEARTS (hero background)
  ============================================================ */
  const heartsField = document.getElementById('hearts-field');
  function spawnHeart(){
    if (!heartsField) return;
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > 0.5 ? '❤' : '♥';
    const size = Math.random() * 14 + 10;
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = size + 'px';
    heart.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    heart.style.animationDuration = (Math.random() * 6 + 8) + 's';
    heartsField.appendChild(heart);
    setTimeout(() => heart.remove(), 15000);
  }
  if (!reduceMotion){
    for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 700);
    setInterval(spawnHeart, 1800);
  }

  /* ============================================================
     4. TYPED.JS — HERO SUBTITLE
  ============================================================ */
  if (window.Typed){
    new Typed('#typed-subtitle', {
      strings: [
        'The heart of our family.',
        'Our forever inspiration.',
        'The reason we are who we are.',
        'Loved beyond measure, today and always.'
      ],
      typeSpeed: 42,
      backSpeed: 22,
      backDelay: 1800,
      startDelay: 400,
      loop: true,
      showCursor: false
    });
  }

  /* ============================================================
     5. AOS INIT
  ============================================================ */
  if (window.AOS){
    AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ============================================================
     6. CURSOR GLOW + CARD TILT
  ============================================================ */
  const cursorGlow = document.querySelector('.cursor-glow');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
    });
  }

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ============================================================
     7. RIPPLE BUTTONS
  ============================================================ */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const span = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      span.className = 'ripple-effect';
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - rect.left - size / 2) + 'px';
      span.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(span);
      setTimeout(() => span.remove(), 700);
    });
  });

  /* ============================================================
     8. LETTER OPENING EFFECT
     Flaps slide away and the paper fades in once the letter
     section scrolls into view.
  ============================================================ */
  const flapLeft = document.getElementById('flap-left');
  const flapRight = document.getElementById('flap-right');
  const letterPaper = document.getElementById('letter-paper');
  const letterCard = document.getElementById('letter-card');

  if ('IntersectionObserver' in window && letterCard){
    const letterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          flapLeft.classList.add('opened');
          flapRight.classList.add('opened');
          setTimeout(() => letterPaper.classList.add('revealed'), 500);
          letterObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    letterObserver.observe(letterCard);
  }

  /* ============================================================
     9. LIGHTGALLERY
  ============================================================ */
  const galleryEl = document.getElementById('lg-gallery');
  if (galleryEl && window.lightGallery){
    lightGallery(galleryEl, {
      selector: '.gallery-item',
      plugins: [window.lgZoom],
      speed: 400,
      download: false
    });
  }

  /* ============================================================
     10. CAKE — BLOW THE CANDLES
  ============================================================ */
  const blowBtn = document.getElementById('blow-btn');
  const cakeEl = document.getElementById('cake');
  const cakeMessage = document.getElementById('cake-message');

  if (blowBtn){
    blowBtn.addEventListener('click', () => {
      if (cakeEl.classList.contains('blown')) return;
      cakeEl.classList.add('blown');
      cakeMessage.textContent = 'Happy Birthday, Mama! Your wish is on its way. ✨';

      if (window.confetti){
        const rect = cakeEl.getBoundingClientRect();
        confetti({
          particleCount: 140,
          spread: 80,
          startVelocity: 38,
          origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
          colors: ['#D4AF37', '#E9CE7C', '#F2A6B8', '#F5F1EA']
        });
      }
      // a few floating hearts as celebration
      for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 120);
    });
  }

  /* ============================================================
     11. GIFT BOX
  ============================================================ */
  const giftBox = document.getElementById('gift-box');
  const giftMessage = document.getElementById('gift-message');

  if (giftBox){
    giftBox.addEventListener('click', () => {
      const alreadyOpen = giftBox.classList.contains('opened');
      giftBox.classList.toggle('opened');
      giftMessage.classList.toggle('shown');

      if (!alreadyOpen){
        if (window.confetti){
          const rect = giftBox.getBoundingClientRect();
          confetti({
            particleCount: 90,
            spread: 100,
            startVelocity: 30,
            origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
            colors: ['#D4AF37', '#F2A6B8', '#F5F1EA']
          });
        }
        for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 100);
      }
    });
  }

  /* ============================================================
     12. MUSIC PLAYER
     Replace assets/song.mp3 in index.html with your real audio
     file — controls below work with any standard audio source.
  ============================================================ */
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const progress = document.getElementById('progress');
  const volume = document.getElementById('volume');
  const timeCurrent = document.getElementById('time-current');
  const timeDuration = document.getElementById('time-duration');

  function formatTime(sec){
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  if (audio && playBtn){
    playBtn.addEventListener('click', () => {
      if (audio.paused){
        audio.play().catch(() => {
          // No audio source provided yet — gracefully ignore.
        });
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play', () => {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    });
    audio.addEventListener('pause', () => {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    });
    audio.addEventListener('loadedmetadata', () => {
      progress.max = audio.duration || 100;
      timeDuration.textContent = formatTime(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
      progress.value = audio.currentTime;
      timeCurrent.textContent = formatTime(audio.currentTime);
    });
    progress.addEventListener('input', () => {
      audio.currentTime = progress.value;
    });
    volume.addEventListener('input', () => {
      audio.volume = volume.value / 100;
    });
    audio.volume = 0.8;
  }

  /* ============================================================
     13. SWIPER — WISHES CAROUSEL
  ============================================================ */
  if (window.Swiper){
    new Swiper('.wishes-swiper', {
      loop: true,
      spaceBetween: 24,
      grabCursor: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        0: { slidesPerView: 1 },
        720: { slidesPerView: 2 },
        1100: { slidesPerView: 2 }
      }
    });
  }

  /* ============================================================
     14. FINAL SECTION — FIREWORKS / CONFETTI / BALLOONS
  ============================================================ */
  const loveBtn = document.getElementById('love-btn');
  const fireworksCanvas = document.getElementById('fireworks-canvas');
  const fCtx = fireworksCanvas.getContext('2d');
  const balloonField = document.getElementById('balloon-field');
  const finalGlow = document.querySelector('.final-glow');

  function resizeFireworks(){
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  }
  resizeFireworks();
  window.addEventListener('resize', resizeFireworks);

  function launchFirework(x, y){
    const particles = [];
    const colors = ['#D4AF37', '#E9CE7C', '#F2A6B8', '#F5F1EA'];
    const count = 46;
    for (let i = 0; i < count; i++){
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return particles;
  }

  let allParticles = [];
  let fireworksRunning = false;

  function animateFireworks(){
    fCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    allParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.045; // gravity
      p.life -= 0.012;
      fCtx.globalAlpha = Math.max(p.life, 0);
      fCtx.fillStyle = p.color;
      fCtx.beginPath();
      fCtx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
      fCtx.fill();
    });
    fCtx.globalAlpha = 1;
    allParticles = allParticles.filter(p => p.life > 0);

    if (allParticles.length > 0){
      requestAnimationFrame(animateFireworks);
    } else {
      fireworksRunning = false;
      fireworksCanvas.classList.remove('active');
    }
  }

  function startFireworksShow(){
    fireworksCanvas.classList.add('active');
    const bursts = 5;
    for (let i = 0; i < bursts; i++){
      setTimeout(() => {
        const x = Math.random() * fireworksCanvas.width * 0.7 + fireworksCanvas.width * 0.15;
        const y = Math.random() * fireworksCanvas.height * 0.4 + fireworksCanvas.height * 0.1;
        allParticles = allParticles.concat(launchFirework(x, y));
        if (!fireworksRunning){
          fireworksRunning = true;
          animateFireworks();
        }
      }, i * 350);
    }
  }

  function spawnBalloon(){
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const colors = ['#D4AF37', '#F2A6B8', '#F5F1EA', '#E9CE7C'];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 90 + '%';
    balloon.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    balloon.style.setProperty('--rot', (Math.random() * 16 - 8) + 'deg');
    balloon.style.animationDuration = (Math.random() * 3 + 6) + 's';
    balloonField.appendChild(balloon);
    setTimeout(() => balloon.remove(), 10000);
  }

  function sparkleBurst(){
    for (let i = 0; i < 24; i++){
      setTimeout(() => {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✦';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.color = Math.random() > 0.5 ? '#D4AF37' : '#F2A6B8';
        sparkle.style.fontSize = (Math.random() * 14 + 8) + 'px';
        sparkle.style.zIndex = '996';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        sparkle.style.opacity = '1';
        document.body.appendChild(sparkle);
        requestAnimationFrame(() => {
          sparkle.style.opacity = '0';
          sparkle.style.transform = 'translateY(-30px) scale(1.6)';
        });
        setTimeout(() => sparkle.remove(), 1300);
      }, i * 40);
    }
  }

  if (loveBtn){
    loveBtn.addEventListener('click', () => {
      // background glow pulse
      finalGlow.style.transition = 'none';
      finalGlow.style.opacity = '1';
      finalGlow.style.background = 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(242,166,184,0.28), transparent 70%)';
      requestAnimationFrame(() => {
        finalGlow.style.transition = 'background 2.5s ease, opacity 2.5s ease';
        setTimeout(() => {
          finalGlow.style.background = 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.12), transparent 70%)';
        }, 100);
      });

      startFireworksShow();
      sparkleBurst();

      if (window.confetti){
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 }, colors: ['#D4AF37', '#F2A6B8', '#F5F1EA'] });
        setTimeout(() => confetti({ particleCount: 120, angle: 60, spread: 70, origin: { x: 0 }, colors: ['#D4AF37', '#F2A6B8'] }), 300);
        setTimeout(() => confetti({ particleCount: 120, angle: 120, spread: 70, origin: { x: 1 }, colors: ['#D4AF37', '#F2A6B8'] }), 300);
      }

      for (let i = 0; i < 16; i++) setTimeout(spawnHeart, i * 90);
      for (let i = 0; i < 10; i++) setTimeout(spawnBalloon, i * 220);
    });
  }

});
