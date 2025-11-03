// Animation on scroll functionality
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Animate stats counting
  const statNumbers = document.querySelectorAll('.stat-number');
  const options = {
    threshold: 0.5
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target, 0, parseInt(entry.target.textContent), 1500);
        statsObserver.unobserve(entry.target);
      }
    });
  }, options);
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
  
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.id === 'successCount' ? '%' : '+');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
});