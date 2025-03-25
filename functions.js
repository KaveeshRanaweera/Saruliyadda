// Function to open tabs
function openTab(tabId) {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
}

// Default: Show home tab on page load
document.addEventListener("DOMContentLoaded", function () {
    openTab('home');
});

// Open right-side navigation
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

// Close right-side navigation
function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}
