// Cache DOM elements
const domElements = {
    tabs: null,
    navLinks: null,
    mainNav: null,
    menuIcon: null,
    productCards: null,
    tabButtons: null,
    sliderTrack: null,
    mobileOverlay: null
};

// Initialize DOM elements
function initElements() {
    domElements.tabs = document.querySelectorAll('.tab');
    domElements.navLinks = document.querySelectorAll('.nav-link');
    domElements.mainNav = document.getElementById('mainNav');
    domElements.menuIcon = document.querySelector('.menu-icon');
    domElements.productCards = document.querySelectorAll('.product-card');
    domElements.tabButtons = document.querySelectorAll('.tab-btn');
    domElements.sliderTrack = document.querySelector('.slider-track');
    domElements.mobileOverlay = document.querySelector('.mobile-menu-overlay');
}

// Tab functionality
function openTab(tabId) {
    if (!tabId) return;
    
    // Hide all tabs
    domElements.tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show the selected tab
    const tabToOpen = document.getElementById(tabId);
    if (tabToOpen) {
        tabToOpen.classList.add('active');
        if (window.innerWidth <= 768) {
            tabToOpen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Update active nav link
    domElements.navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// Product category filter
function showProducts(category, event) {
    if (!category) return;
    
    // Highlight the active tab button
    domElements.tabButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = event?.target || document.querySelector(`.tab-btn[onclick*="${category}"]`);
    if (activeButton) activeButton.classList.add('active');
    
    // Filter products
    domElements.productCards.forEach(product => {
        product.style.display = product.classList.contains(category) ? 'block' : 'none';
    });
}

// Slider functionality
function startSlider() {
    if (!domElements.sliderTrack) return;
    
    let position = 0;
    const slideInterval = setInterval(() => {
        position = (position + 100) % 200;
        domElements.sliderTrack.style.transform = `translateX(-${position}%)`;
    }, 5000);
    
    return slideInterval;
}

// Map functionality
function openMap(location) {
    if (!location) return;
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
}

// Mobile menu toggle
function toggleNav() {
    if (!domElements.mainNav || !domElements.mobileOverlay) return;
    
    const isExpanded = !domElements.mainNav.classList.contains('active');
    domElements.mainNav.classList.toggle('active', isExpanded);
    domElements.mobileOverlay.classList.toggle('active', isExpanded);
    document.body.classList.toggle('no-scroll', isExpanded);
    domElements.menuIcon.setAttribute('aria-expanded', isExpanded);
}

// Close mobile menu when clicking outside
function handleClickOutside(event) {
    if (window.innerWidth > 768) return;
    if (!event.target.closest('.main-nav') && 
        !event.target.closest('.menu-icon') &&
        domElements.mainNav?.classList.contains('active')) {
        toggleNav();
    }
}

// Handle window resize with debounce
function handleResize() {
    if (window.innerWidth > 768 && domElements.mainNav?.classList.contains('active')) {
        toggleNav();
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Nav link clicks
    domElements.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openTab(this.dataset.tab);
            if (window.innerWidth <= 768) toggleNav();
        });
    });
    
    // Mobile menu toggle
    if (domElements.menuIcon) {
        domElements.menuIcon.addEventListener('click', toggleNav);
    }
    
    // Mobile overlay click
    if (domElements.mobileOverlay) {
        domElements.mobileOverlay.addEventListener('click', toggleNav);
    }
    
    // Window events
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', debounce(handleResize, 200));
    
    // Product tab buttons
    if (domElements.tabButtons) {
        domElements.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
                showProducts(category, e);
            });
        });
    }
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

// Initialize the page
function initPage() {
    initElements();
    setupEventListeners();
    
    // Set initial states
    openTab('home');
    if (domElements.productCards.length) showProducts('unipower');
    if (domElements.sliderTrack) startSlider();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);