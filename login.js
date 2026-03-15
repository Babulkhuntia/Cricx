// login.js - Handle authentication

// Sample users data (in real app, this would be from a database)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful! Redirecting to homepage...');
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password!');
            document.getElementById('loginEmail').focus();
        }
    });
}

// Signup form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            alert('User already exists with this email!');
            return;
        }
        
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Signup successful! Please login with your credentials.');
        window.location.href = 'login.html';
    });
}

// Auto-fill demo data for testing (remove in production)
function addDemoUsers() {
    if (users.length === 0) {
        users = [
            {
                id: '1',
                name: 'Demo User',
                email: 'demo@gullycricket.com',
                password: '123456'
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Add demo users on first load
addDemoUsers();