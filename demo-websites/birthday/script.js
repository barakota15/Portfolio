(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), 700));

  const updateCountdown = () => {
    const target = new Date('2026-08-22T20:00:00-04:00').getTime();
    const distance = Math.max(0, target - Date.now());
    const values = [Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24, Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60];
    ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => { const el = $('#' + id); if (el) el.textContent = String(values[index]).padStart(2, '0'); });
  };
  updateCountdown(); setInterval(updateCountdown, 1000);

  const nav = $('.nav'), progress = $('#progress'), toTop = $('#to-top'); let previousY = 0;
  const onScroll = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${Math.min(100, max ? (y / max) * 100 : 0)}%`;
    nav.classList.toggle('stuck', y > 75); nav.classList.toggle('hidden', y > previousY && y > 500);
    toTop.classList.toggle('show', y > 700); previousY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const menu = $('.menu-toggle'), menuLinks = $('#nav-links');
  menu.addEventListener('click', () => { const isOpen = menuLinks.classList.toggle('open'); menu.classList.toggle('open', isOpen); menu.setAttribute('aria-expanded', String(isOpen)); });
  $$('#nav-links a').forEach(link => link.addEventListener('click', () => { menuLinks.classList.remove('open'); menu.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

  const theme = $('#theme-toggle');
  const applyTheme = dark => { document.body.classList.toggle('dark', dark); theme.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode'); localStorage.setItem('luna-theme', dark ? 'dark' : 'light'); };
  applyTheme(localStorage.getItem('luna-theme') === 'dark'); theme.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark')));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .13 });
  $$('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  const canvas = $('#confetti'), ctx = canvas.getContext('2d'); let pieces = [], animationFrame;
  const resizeCanvas = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
  resizeCanvas(); window.addEventListener('resize', resizeCanvas);
  const burst = (x = innerWidth / 2, y = innerHeight * .32, amount = 120) => {
    const colors = ['#fbbf24', '#ec4899', '#a78bfa', '#ffffff'];
    pieces.push(...Array.from({ length: amount }, () => ({ x, y, vx:(Math.random()-.5)*12, vy:(Math.random()*-9)-2, size:Math.random()*6+3, color:colors[Math.floor(Math.random()*colors.length)], tilt:Math.random()*6, rot:Math.random()*Math.PI }))); 
    if (!animationFrame) drawConfetti();
  };
  const drawConfetti = () => { ctx.clearRect(0,0,innerWidth,innerHeight); pieces = pieces.filter(p => p.y < innerHeight + 30 && p.size > .35); pieces.forEach(p => { p.vy += .13; p.x += p.vx; p.y += p.vy; p.rot += .12; p.size *= .992; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.58); ctx.restore(); }); animationFrame = pieces.length ? requestAnimationFrame(drawConfetti) : null; };
  setTimeout(() => burst(innerWidth / 2, innerHeight * .19, 95), 900);

  const lightbox = $('#lightbox'), lightboxImage = $('#lightbox-image'), lightboxCaption = $('#lightbox-caption');
  $$('.gallery-item').forEach(item => item.addEventListener('click', () => { const image = $('img', item); lightboxImage.src = item.dataset.full; lightboxImage.alt = image.alt; lightboxCaption.textContent = image.alt; lightbox.showModal(); document.body.classList.add('no-scroll'); }));
  const closeLightbox = () => { lightbox.close(); document.body.classList.remove('no-scroll'); };
  $('.lightbox-close').addEventListener('click', closeLightbox); lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

  const rsvpForm = $('#rsvp-form'), success = $('#rsvp-success'), error = $('#form-error');
  rsvpForm.addEventListener('submit', event => { event.preventDefault(); error.textContent = ''; if (!rsvpForm.checkValidity()) { error.textContent = 'Please add your name, email, and RSVP choice.'; rsvpForm.reportValidity(); return; } success.classList.add('show'); burst(innerWidth * .72, innerHeight * .5, 165); });
  $('#close-success').addEventListener('click', () => { success.classList.remove('show'); rsvpForm.reset(); });

  const wishForm = $('#wish-form'), wishList = $('#wish-list');
  wishForm.addEventListener('submit', event => { event.preventDefault(); if (!wishForm.checkValidity()) { wishForm.reportValidity(); return; } const data = new FormData(wishForm); const card = document.createElement('article'); card.className = 'wish-card visible'; card.innerHTML = `<span>“</span><p></p><footer>— <i></i> <b>♥</b></footer>`; $('p', card).textContent = data.get('wishText'); $('i', card).textContent = data.get('wishName'); wishList.prepend(card); wishForm.reset(); toast('Your birthday wish is on its way to Luna ♥'); burst(innerWidth * .33, innerHeight * .65, 48); });

  let audioContext, ambienceTimer, playing = false; const music = $('#music-player');
  const playTone = (frequency, start, duration, type = 'sine', volume = .025) => { const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(); oscillator.type = type; oscillator.frequency.value = frequency; gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(volume, start + .04); gain.gain.exponentialRampToValueAtTime(.001, start + duration); oscillator.connect(gain).connect(audioContext.destination); oscillator.start(start); oscillator.stop(start + duration + .05); };
  const startAmbience = () => { if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)(); if (audioContext.state === 'suspended') audioContext.resume(); const playPhrase = () => { const now = audioContext.currentTime; [261.63,329.63,392,523.25,392,329.63].forEach((note,i) => playTone(note,now+i*.24,.5,i===3?'triangle':'sine',.018)); }; playPhrase(); ambienceTimer = setInterval(playPhrase, 3600); };
  music.addEventListener('click', () => { playing = !playing; music.classList.toggle('playing', playing); music.setAttribute('aria-pressed', String(playing)); $('.music-icon', music).textContent = playing ? '❚❚' : '▶'; $('.music-label', music).textContent = playing ? 'Playing' : 'Play the mood'; if (playing) { startAmbience(); toast('A little celebratory sparkle, just for you ✦'); } else { clearInterval(ambienceTimer); if (audioContext) audioContext.suspend(); } });

  const toastBox = $('#toast'); let toastTimer; const toast = message => { toastBox.textContent = message; toastBox.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastBox.classList.remove('show'), 3100); };
  const shareUrl = encodeURIComponent(window.location.href), shareText = encodeURIComponent("You're invited to Luna's 30th — a night to remember!");
  $$('.share-button').forEach(button => button.addEventListener('click', async () => { const kind = button.dataset.share; if (kind === 'whatsapp') window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, '_blank', 'noopener'); else if (kind === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank', 'noopener'); else if (kind === 'instagram') { await navigator.clipboard?.writeText('#LunaTurns30 #CheersTo30'); toast('Instagram caption copied — now bring the sparkle!'); } else { try { await navigator.clipboard.writeText(window.location.href); toast('Invitation link copied to your clipboard.'); } catch { toast('Copy this invitation’s address from your browser.'); } } }));

  document.addEventListener('keydown', event => { if (event.key === 'Escape' && lightbox.open) closeLightbox(); });
})();
