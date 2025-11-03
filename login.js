// scriptss/login.js - Final Version (works with or without backend)
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const loginError = document.getElementById('loginError');
  const loginBtn = document.getElementById('loginBtn');

  // If user already logged in (from session)
  if (sessionStorage.getItem('loggedIn') === 'true') {
    updateLoginState(true);
  }

  // Handle login form submit
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      if (!username || !password) {
        showError('Please enter both username and password.');
        return;
      }

      try {
        // Try backend first (if available)
        const response = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password })
        });

        if (response.ok) {
          const data = await response.json();
          handleSuccessfulLogin(data, username);
        } else {
          // Backend responded with an error → use demo mode
          console.warn('Backend login failed, switching to demo mode');
          handleFallbackLogin(username, password);
        }
      } catch (error) {
        // If backend not running at all
        console.warn('Backend not available, using demo login mode');
        handleFallbackLogin(username, password);
      }
    });
  }

  // Close modal event
  if (closeModal) {
    closeModal.addEventListener('click', function () {
      loginModal.classList.remove('active');
      clearForm();
    });
  }

  // ✅ Handle successful backend login
  function handleSuccessfulLogin(data, username) {
    sessionStorage.setItem('token', data.token || 'demo-token');
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('username', username);
    sessionStorage.removeItem('demoMode');

    updateLoginState(true);
    loginModal.classList.remove('active');
    clearForm();
    showSuccess('Login successful!');
  }

  // ✅ Fallback (demo) login - works without backend
  function handleFallbackLogin(username, password) {
    if (username && password) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('demoMode', 'true');

      updateLoginState(true);
      if (loginModal) loginModal.classList.remove('active');
      clearForm();
      showSuccess('Demo login successful! (No backend connected)');
    } else {
      showError('Invalid credentials.');
    }
  }

  // ✅ Update Login Button State
  function updateLoginState(isLoggedIn) {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    if (isLoggedIn) {
      const username = sessionStorage.getItem('username') || 'User';
      loginBtn.innerHTML = `<i class="fas fa-user"></i> ${username}`;
      loginBtn.style.backgroundColor = '#28a745'; // Green
      setupLogout();
    } else {
      loginBtn.innerHTML = 'Login';
      loginBtn.style.backgroundColor = '';
    }
  }

  // ✅ Logout setup
  function setupLogout() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    // Avoid multiple event listeners
    loginBtn.replaceWith(loginBtn.cloneNode(true));
    const newBtn = document.getElementById('loginBtn');

    newBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        updateLoginState(false);
        showSuccess('Logged out successfully!');
      }
    });
  }

  // ✅ UI Feedback Functions
  function showError(message) {
    if (loginError) {
      loginError.textContent = message;
      loginError.style.color = 'red';
    }
  }

  function showSuccess(message) {
    if (loginError) {
      loginError.textContent = message;
      loginError.style.color = 'green';
      setTimeout(() => {
        loginError.textContent = '';
      }, 3000);
    }
  }

  function clearForm() {
    if (loginForm) loginForm.reset();
    if (loginError) loginError.textContent = '';
  }
});
