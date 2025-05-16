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


