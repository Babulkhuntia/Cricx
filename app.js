// app.js - Main application logic and common functionality

// DOM elements
const addMatchBtn = document.getElementById('addMatchBtn');
const logoutBtn = document.getElementById('logoutBtn');
const hamburger = document.querySelector('.hamburger');

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initMobileMenu();
    // Load matches if on homepage
    if (document.getElementById('liveMatches')) {
        loadMatches();
    }
});

// Check if user is logged in
function checkLoginStatus() {
    const user = getCurrentUser();
    if (user) {
        document.querySelector('.nav-links a[href="login.html"]').style.display = 'none';
        document.querySelector('.nav-links a[href="signup.html"]').style.display = 'none';
        addMatchBtn.style.display = 'flex';
        logoutBtn.style.display = 'flex';
    } else {
        document.querySelector('.nav-links a[href="login.html"]').style.display = 'block';
        document.querySelector('.nav-links a[href="signup.html"]').style.display = 'block';
        addMatchBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

// Get current logged-in user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Initialize mobile menu
function initMobileMenu() {
    hamburger.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Add match button click handler
if (addMatchBtn) {
    addMatchBtn.addEventListener('click', function() {
        if (!getCurrentUser()) {
            alert('Please login to add matches!');
            window.location.href = 'login.html';
            return;
        }
        window.location.href = 'add-match.html';
    });
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        checkLoginStatus();
        window.location.reload();
    });
}

// Mobile responsiveness
function handleResize() {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const hamburgerActive = hamburger.classList.contains('active');
        if (hamburgerActive) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
}

window.addEventListener('resize', handleResize);

// Set today's date as default for date inputs
document.querySelectorAll('input[type="date"]').forEach(input => {
    if (!input.value) {
        input.valueAsDate = new Date();
    }
});