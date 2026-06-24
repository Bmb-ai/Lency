const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const progressBar = document.getElementById('progressBar');

let current = 0;
let touchStartX = null;

totalSlidesEl.textContent = String(slides.length).padStart(2, '0');

function pauseVideos() {
  document.querySelectorAll('video').forEach((video) => {
    if (!video.paused) video.pause();
  });
}

function updateHash(index) {
  const id = slides[index].id;
  if (window.location.hash !== `#${id}`) {
    history.replaceState(null, '', `#${id}`);
  }
}

function goTo(index) {
  const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
  if (nextIndex === current) return;

  pauseVideos();
  current = nextIndex;
  render();
}

function next() {
  goTo(current + 1);
}

function prev() {
  goTo(current - 1);
}

function render() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === current);
    slide.classList.toggle('is-before', index < current);
  });


  currentSlideEl.textContent = String(current + 1).padStart(2, '0');
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
  updateHash(current);
}

function loadFromHash() {
  const hash = window.location.hash.replace('#', '');
  const index = slides.findIndex((slide) => slide.id === hash);
  if (index >= 0) current = index;
  render();
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

window.addEventListener('keydown', (event) => {
  const activeTag = document.activeElement?.tagName?.toLowerCase();
  if (activeTag === 'input' || activeTag === 'textarea') return;

  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    next();
  }

  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    prev();
  }

  if (event.key === 'Home') {
    event.preventDefault();
    goTo(0);
  }

  if (event.key === 'End') {
    event.preventDefault();
    goTo(slides.length - 1);
  }

  if (event.key.toLowerCase() === 'f') {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
});

window.addEventListener('hashchange', loadFromHash);

document.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const diff = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 56) {
    diff < 0 ? next() : prev();
  }
  touchStartX = null;
}, { passive: true });

document.querySelectorAll('.video-frame video').forEach((video) => {
  const frame = video.closest('.video-frame');
  const markMissing = () => frame.classList.add('is-missing');

  video.addEventListener('error', markMissing);

  video.addEventListener('loadedmetadata', () => {
    frame.classList.remove('is-missing');
  });

  setTimeout(() => {
    if (video.readyState === 0) markMissing();
  }, 900);
});

loadFromHash();
