/* Deck runtime: nav, speaker view, timer, overview. No dependencies. */
(() => {
  const stage = document.getElementById('stage');
  const slides = [...document.querySelectorAll('.slide')];
  const bar = document.getElementById('bar');
  const num = document.getElementById('num');
  const tag = document.getElementById('tag');
  const help = document.getElementById('help');
  const isSpeaker = new URLSearchParams(location.search).has('speaker');
  const chan = 'BroadcastChannel' in window ? new BroadcastChannel('sc-deck') : null;

  let i = 0;
  let overview = false;

  const clamp = (n) => Math.max(0, Math.min(slides.length - 1, n));

  function render(push = true) {
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    bar.style.width = ((i + 1) / slides.length * 100) + '%';
    num.textContent = (i + 1) + ' / ' + slides.length;
    tag.textContent = slides[i].dataset.tag || '';
    // Section slides sit on a light neutral, so the chrome has to flip with them.
    document.body.classList.toggle('on-section', slides[i].classList.contains('section'));
    document.body.classList.toggle('on-title', slides[i].classList.contains('title'));
    if (isSpeaker) paintSpeaker();
    if (push) {
      try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) { /* file:// */ }
      if (chan) chan.postMessage({ type: 'goto', i, from: isSpeaker });
    }
    if (overview) slides[i].scrollIntoView({ block: 'nearest' });
  }

  function go(n) { const c = clamp(n); if (c === i) return; i = c; render(); }

  // ---- speaker view ----
  let t0 = null, running = false, elapsed = 0;
  const TARGET_MIN = 135;
  function paintSpeaker() {
    const s = slides[i];
    const notes = s.querySelector('.notes');
    document.querySelector('#sv-notes .body').innerHTML = notes ? notes.innerHTML : '<p class="tiny">—</p>';
    const nxt = slides[i + 1];
    document.querySelector('#sv-next .kick').textContent = nxt ? (nxt.dataset.tag || 'next') : 'end';
    const h = nxt ? nxt.querySelector('h1, h2, .statement, .ask .q') : null;
    document.querySelector('#sv-next .title').textContent = nxt ? (h ? h.textContent.trim() : '—') : 'Questions.';
    document.querySelector('#sv-clock .meta').textContent =
      'slide ' + (i + 1) + ' / ' + slides.length + '  ·  target ' + TARGET_MIN + ' min';
  }

  function tick() {
    if (running && t0 !== null) elapsed = Date.now() - t0;
    const total = Math.floor(elapsed / 1000);
    const el = document.querySelector('#sv-clock .t');
    if (!el) return;
    el.textContent = String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');
    el.classList.toggle('over', total > TARGET_MIN * 60);
  }

  if (isSpeaker) {
    document.body.classList.add('speaker');
    setInterval(tick, 250);
    document.getElementById('sv-toggle').addEventListener('click', () => {
      if (running) { running = false; } else { t0 = Date.now() - elapsed; running = true; }
      document.getElementById('sv-toggle').textContent = running ? 'pause' : 'start';
    });
    document.getElementById('sv-reset').addEventListener('click', () => {
      running = false; elapsed = 0; t0 = null;
      document.getElementById('sv-toggle').textContent = 'start'; tick();
    });
  }

  if (chan) {
    chan.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'goto' && m.from !== isSpeaker) { i = clamp(m.i); render(false); }
      if (m.type === 'theme') document.documentElement.dataset.theme = m.theme;
    };
  }

  // ---- keys ----
  const NEXT = ['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter', 'n'];
  const PREV = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'p'];

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;

    if (k === '?' || k === '/') { help.classList.toggle('on'); e.preventDefault(); return; }
    if (help.classList.contains('on')) { help.classList.remove('on'); if (k === 'Escape') return; }

    if (NEXT.includes(k)) { go(i + 1); e.preventDefault(); }
    else if (PREV.includes(k)) { go(i - 1); e.preventDefault(); }
    else if (k === 'Home') { go(0); }
    else if (k === 'End') { go(slides.length - 1); }
    else if (k === 'f' || k === 'F') {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    }
    else if (k === 't' || k === 'T') {
      const t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = t;
      try { localStorage.setItem('deck-theme', t); } catch (err) { /* file:// */ }
      if (chan) chan.postMessage({ type: 'theme', theme: t });
    }
    else if (k === 'o' || k === 'O' || (k === 'Escape' && overview)) {
      overview = !overview; stage.classList.toggle('overview', overview);
      slides.forEach((s) => s.style.display = overview ? 'flex' : '');
      if (!overview) render(false);
    }
    else if (k === 's' || k === 'S') {
      if (isSpeaker) return;
      open(location.pathname + '?speaker#' + (i + 1), 'sc-deck-speaker', 'width=1280,height=800');
    }
    else if (k === 'b' || k === 'B' || k === '.') {
      document.body.style.visibility = document.body.style.visibility === 'hidden' ? '' : 'hidden';
    }
    else if (/^[0-9]$/.test(k)) {
      buf += k; clearTimeout(bufT); bufT = setTimeout(() => { go(parseInt(buf, 10) - 1); buf = ''; }, 550);
    }
  });

  let buf = '', bufT = null;

  stage.addEventListener('click', (e) => {
    if (overview) {
      const s = e.target.closest('.slide');
      if (s) { i = slides.indexOf(s); overview = false; stage.classList.remove('overview'); slides.forEach((x) => x.style.display = ''); render(); }
      return;
    }
    if (e.target.closest('a, video, button')) return;
    go(i + (e.clientX < innerWidth * 0.25 ? -1 : 1));
  });

  try {
    const saved = localStorage.getItem('deck-theme');
    if (saved) document.documentElement.dataset.theme = saved;
  } catch (e) { /* file:// */ }

  const hash = parseInt(location.hash.slice(1), 10);
  if (hash) i = clamp(hash - 1);
  render(false);
})();
