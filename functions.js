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

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            toggleNav();
        }
        openTab(this.dataset.tab);
    });
});

// Set home tab as active when page loads
document.addEventListener('DOMContentLoaded', function() {
    openTab('home');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (window.innerWidth <= 768 && 
        !event.target.closest('.main-nav') && 
        event.target !== menuIcon) {
        nav.classList.remove('active');
    }
});