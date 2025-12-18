// ========================================
// PROJECTS PAGE - FILTERING & SLIDER
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // PROJECT FILTERING
  // ========================================
  
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects with animation
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  
  // ========================================
  // IMAGE SLIDER FUNCTIONALITY
  // ========================================
  
  class ProjectSlider {
    constructor(sliderElement) {
      this.slider = sliderElement;
      this.images = sliderElement.querySelectorAll('.slider-image');
      this.prevBtn = sliderElement.querySelector('.slider-btn.prev');
      this.nextBtn = sliderElement.querySelector('.slider-btn.next');
      this.dotsContainer = sliderElement.querySelector('.slider-dots');
      this.currentIndex = 0;
      this.autoPlayInterval = null;
      
      this.init();
    }
    
    init() {
      // Create dots
      this.createDots();
      
      // Add event listeners
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
      
      // Auto-play
      this.startAutoPlay();
      
      // Pause on hover
      this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    createDots() {
      this.images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => this.goToSlide(index));
        this.dotsContainer.appendChild(dot);
      });
      
      this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
    }
    
    goToSlide(index) {
      // Remove active from all
      this.images[this.currentIndex].classList.remove('active');
      this.dots[this.currentIndex].classList.remove('active');
      
      // Add active to new slide
      this.currentIndex = index;
      this.images[this.currentIndex].classList.add('active');
      this.dots[this.currentIndex].classList.add('active');
    }
    
    next() {
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.images.length) {
        nextIndex = 0;
      }
      this.goToSlide(nextIndex);
    }
    
    prev() {
      let prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = this.images.length - 1;
      }
      this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, 4000); // Change slide every 4 seconds
    }
    
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
    }
  }
  
  // Initialize all sliders
  const sliders = document.querySelectorAll('.project-slider');
  sliders.forEach(slider => {
    new ProjectSlider(slider);
  });
  
  // ========================================
  // SMOOTH SCROLL TO PROJECT
  // ========================================
  
  // Check if there's a hash in the URL
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // Add highlight animation
        target.style.animation = 'highlightProject 1.5s ease-out';
      }
    }, 500);
  }
  
  // ========================================
  // KEYBOARD NAVIGATION FOR SLIDERS
  // ========================================
  
  document.addEventListener('keydown', function(e) {
    // Only if no input is focused
    if (document.activeElement.tagName !== 'INPUT' && 
        document.activeElement.tagName !== 'TEXTAREA') {
      
      const focusedCard = document.querySelector('.project-card:hover .project-slider');
      
      if (focusedCard) {
        const slider = focusedCard.sliderInstance;
        
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevBtn = focusedCard.querySelector('.slider-btn.prev');
          prevBtn.click();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const nextBtn = focusedCard.querySelector('.slider-btn.next');
          nextBtn.click();
        }
      }
    }
  });
  
  // ========================================
  // LAZY LOADING FOR PROJECT IMAGES
  // ========================================
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // If image has data-src, load it
        if (img.hasAttribute('data-src')) {
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  // Observe all slider images
  document.querySelectorAll('.slider-image[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
  
  // ========================================
  // PROJECT CARD ANIMATIONS ON SCROLL
  // ========================================
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  projectCards.forEach(card => {
    cardObserver.observe(card);
  });
  
});

// ========================================
// HIGHLIGHT ANIMATION KEYFRAMES (Add to CSS)
// ========================================
/* 
@keyframes highlightProject {
  0%, 100% {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 20px 60px rgba(230, 126, 34, 0.4);
  }
}
*/