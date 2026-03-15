// DOM elements
const addMatchBtn = document.getElementById('addMatchBtn');
const logoutBtn = document.getElementById('logoutBtn');
const hamburger = document.querySelector('.hamburger');

// Run after page loads
document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
    initMobileMenu();
});

// Check login status
function checkLoginStatus() {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");

    if (user) {

        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";

        if (addMatchBtn) addMatchBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "inline-block";

    } else {

        if (loginLink) loginLink.style.display = "inline-block";
        if (signupLink) signupLink.style.display = "inline-block";

        if (addMatchBtn) addMatchBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
    }
}

// Mobile menu
function initMobileMenu() {

    if (!hamburger) return;

    hamburger.addEventListener('click', function () {

        const navLinks = document.querySelector('.nav-links');

        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

    });

}

// Add match button
if (addMatchBtn) {

    addMatchBtn.addEventListener('click', function () {

        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user) {

            alert("Please login first");
            window.location.href = "login.html";
            return;

        }

        window.location.href = "add-match.html";

    });

}

// Logout button
if (logoutBtn) {

    logoutBtn.addEventListener('click', function () {

        localStorage.removeItem("currentUser");
        window.location.reload();

    });

}
