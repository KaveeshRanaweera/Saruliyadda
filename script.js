// Tab functionality
function openTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show the selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-link[data-tab="${tabId}"]`).classList.add('active');
}
function showProducts(category) {
    let allProducts = document.querySelectorAll(".product-card");
    let buttons = document.querySelectorAll(".tab-btn");

    // Hide all products
    allProducts.forEach(product => {
        product.style.display = "none";
    });

    // Show only selected category products
    let selectedProducts = document.querySelectorAll("." + category);
    selectedProducts.forEach(product => {
        product.style.display = "block";
    });

    // Highlight the active tab
    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}
// Add this to your existing script.js
// Automatic slide advancement
function startSlider() {
    const track = document.querySelector('.slider-track');
    let position = 0;
    
    setInterval(() => {
        position = (position + 100) % 200;
        track.style.transform = `translateX(-${position}%)`;
    }, 5000);
}

// Initialize slider after DOM load
document.addEventListener('DOMContentLoaded', startSlider);


// Show Unipower products by default when page loads
document.addEventListener("DOMContentLoaded", function() {
    showProducts('unipower');
});

function openMap(location) {
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${location}`;
    window.open(mapUrl, "_blank");
}


// Mobile menu toggle
function toggleNav() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set home tab as active when page loads
    openTab('home');

    // Mobile menu click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openTab(this.dataset.tab);
            if (window.innerWidth <= 768) {
                toggleNav();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.getElementById('mainNav');
        const menuIcon = document.querySelector('.menu-icon');
        
        if (window.innerWidth <= 768 && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.menu-icon')) {
            nav.classList.remove('active');
        }
    });

    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.getElementById('mainNav').classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  // Select the Learn More button
  const learnMoreBtn = document.querySelector('#home .btn[href="#about"]');
  
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default anchor jump
      
      // Hide all tabs
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      
      // Show About tab
      const aboutTab = document.getElementById('about');
      if (aboutTab) {
        aboutTab.classList.add('active');
        aboutTab.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Optionally update nav active state
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.tab === 'about') {
          link.classList.add('active');
        }
      });
    });
  }
});

/**
 * Main application controller
 */
const App = {
  // Configuration
  config: {
    sliderInterval: 5000,
    mobileBreakpoint: 768,
    defaultTab: 'home',
    defaultProductCategory: 'unipower'
  },

  // Initialize the application
  init() {
    this.cacheElements();
    this.setupEventListeners();
    this.setDefaults();
    this.setupIntersectionObserver();
  },

  // Cache DOM elements
  cacheElements() {
    this.elements = {
      tabs: document.querySelectorAll('.tab'),
      navLinks: document.querySelectorAll('.nav-link'),
      products: document.querySelectorAll('.product-card'),
      productButtons: document.querySelectorAll('.tab-btn'),
      mainNav: document.getElementById('mainNav'),
      menuIcon: document.querySelector('.menu-icon'),
      sliderTrack: document.querySelector('.slider-track'),
      learnMoreBtn: document.querySelector('#home .btn[href="#about"]')
    };
  },

  // Set default states
  setDefaults() {
    this.openTab(this.config.defaultTab);
    this.showProducts(this.config.defaultProductCategory);
  },

  // Setup event listeners
  setupEventListeners() {
    // Navigation
    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Mobile menu
    document.addEventListener('click', (e) => this.handleDocumentClick(e));
    window.addEventListener('resize', () => this.handleWindowResize());

    // Learn more button
    if (this.elements.learnMoreBtn) {
      this.elements.learnMoreBtn.addEventListener('click', (e) => this.handleLearnMoreClick(e));
    }
  },

  // Tab functionality
  openTab(tabId) {
    // Hide all tabs
    this.elements.tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Show the selected tab
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
      targetTab.classList.add('active');
      
      // Update URL hash
      history.pushState(null, null, `#${tabId}`);
    }
    
    // Update active nav link
    this.elements.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  },

  // Product filtering
  showProducts(category) {
    // Hide all products
    this.elements.products.forEach(product => {
      product.style.display = "none";
    });

    // Show only selected category products
    const selectedProducts = document.querySelectorAll(`.${category}`);
    selectedProducts.forEach(product => {
      product.style.display = "block";
    });

    // Highlight the active tab
    this.elements.productButtons.forEach(btn => {
      btn.classList.remove("active");
    });
    
    const activeButton = document.querySelector(`.tab-btn[data-category="${category}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  },

  // Slider functionality
  startSlider() {
    if (!this.elements.sliderTrack) return;

    let position = 0;
    const slides = this.elements.sliderTrack.children;
    const slideCount = slides.length;
    
    // Clone first slide for infinite loop
    if (slideCount > 0) {
      const firstSlide = slides[0].cloneNode(true);
      this.elements.sliderTrack.appendChild(firstSlide);
    }

    this.sliderInterval = setInterval(() => {
      position = (position + 100) % (slideCount * 100);
      this.elements.sliderTrack.style.transition = 'transform 0.5s ease-in-out';
      this.elements.sliderTrack.style.transform = `translateX(-${position}%)`;
      
      // Reset position for infinite loop
      if (position === (slideCount - 1) * 100) {
        setTimeout(() => {
          this.elements.sliderTrack.style.transition = 'none';
          position = 0;
          this.elements.sliderTrack.style.transform = `translateX(-${position}%)`;
        }, 500);
      }
    }, this.config.sliderInterval);
  },

  // Mobile menu toggle
  toggleNav() {
    this.elements.mainNav.classList.toggle('active');
    document.body.classList.toggle('nav-active');
  },

  // Handle navigation clicks
  handleNavClick(e) {
    e.preventDefault();
    const tabId = e.currentTarget.dataset.tab;
    this.openTab(tabId);
    
    if (window.innerWidth <= this.config.mobileBreakpoint) {
      this.toggleNav();
    }
  },

  // Handle document clicks (for mobile menu)
  handleDocumentClick(e) {
    if (window.innerWidth > this.config.mobileBreakpoint) return;
    
    const isNavClick = e.target.closest('.main-nav');
    const isMenuIconClick = e.target.closest('.menu-icon');
    
    if (!isNavClick && !isMenuIconClick && this.elements.mainNav.classList.contains('active')) {
      this.toggleNav();
    }
  },

  // Handle window resize
  handleWindowResize() {
    if (window.innerWidth > this.config.mobileBreakpoint) {
      this.elements.mainNav.classList.remove('active');
      document.body.classList.remove('nav-active');
    }
  },

  // Handle learn more click
  handleLearnMoreClick(e) {
    e.preventDefault();
    this.openTab('about');
    
    const aboutTab = document.getElementById('about');
    if (aboutTab) {
      aboutTab.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  // Setup Intersection Observer for lazy loading
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyElement = entry.target;
            if (lazyElement.dataset.src) {
              lazyElement.src = lazyElement.dataset.src;
              observer.unobserve(lazyElement);
            }
          }
        });
      }, {
        rootMargin: '100px',
        threshold: 0.1
      });

      document.querySelectorAll('[data-src]').forEach(element => {
        observer.observe(element);
      });
    }
  },

  // Clean up on unmount (if using SPA framework)
  destroy() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => App.init());
