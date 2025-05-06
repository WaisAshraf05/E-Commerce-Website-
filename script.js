// Search bar
document.querySelector('.search-bar button').addEventListener('click', () => {
  const query = document.querySelector('.search-bar input').value.toLowerCase();
  alert(`Search triggered for: ${query}`);
  // Optional: implement filtering logic here
});

// SPA Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.spa-section');

function navigateSPA() {
  const hash = window.location.hash || '#home';
  
  sections.forEach(section => {
    if ('#' + section.id === hash) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
  
  navItems.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// On page load
window.addEventListener('DOMContentLoaded', navigateSPA);
window.addEventListener('hashchange', navigateSPA);