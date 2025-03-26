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