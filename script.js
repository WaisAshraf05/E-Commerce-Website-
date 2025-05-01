const track = document.getElementById('sliderTrack');

let index = 0;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval;
let autoSlidePaused = false;

function goToSlide(i) {
  index = (i + 3) % 3; // Wrap around 0–2
  track.style.transition = 'transform 0.6s ease-in-out';
  track.style.transform = `translateX(-${index * 100}%)`;
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (!autoSlidePaused) {
      goToSlide(index + 1);
    }
  }, 4000);
}

function stopAutoSlideTemporarily() {
  autoSlidePaused = true;
  clearInterval(autoSlideInterval);
}

function resumeAutoSlide() {
  setTimeout(() => {
    autoSlidePaused = false;
    startAutoSlide();
  }, 3000);
}

// Touch Events
track.addEventListener('touchstart', (e) => {
  stopAutoSlideTemporarily();
  touchStartX = e.touches[0].clientX;
  track.style.transition = 'none';
});

track.addEventListener('touchmove', (e) => {
  touchEndX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
  handleSwipe();
  resumeAutoSlide();
});

// Mouse Events
track.addEventListener('mousedown', (e) => {
  stopAutoSlideTemporarily();
  touchStartX = e.clientX;
  track.style.transition = 'none';
});

track.addEventListener('mousemove', (e) => {
  if (e.buttons !== 1) return;
  touchEndX = e.clientX;
});

track.addEventListener('mouseup', () => {
  handleSwipe();
  resumeAutoSlide();
});
track.addEventListener('mouseover', stopAutoSlideTemporarily);
track.addEventListener('mouseleave', resumeAutoSlide);
function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance < -50) {
    goToSlide(index + 1);
  } else if (swipeDistance > 50) {
    goToSlide(index - 1);
  } else {
    // Restore current slide if swipe was too short
    goToSlide(index);
  }
}

// Initialize
startAutoSlide();