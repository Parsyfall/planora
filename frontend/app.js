import { redirectIfAuthenticated, setToken } from "./auth.js";

redirectIfAuthenticated();

const state = {
  mode: 'login',
  apiBaseUrl: `${window.location.origin}/api`
};

const elements = {
  title: document.getElementById('title'),
  loginMode: document.getElementById('loginMode'),
  signupMode: document.getElementById('signupMode'),
  authForm: document.getElementById('authForm'),
  nameRow: document.getElementById('nameRow'),
  phoneField: document.getElementById('phoneField'),
  roleField: document.getElementById('roleField'),
  submitButton: document.getElementById('submitButton'),
  status: document.getElementById('status'),
  result: document.getElementById('result')
};

function setMode(mode) {
  state.mode = mode;
  const isSignup = mode === 'signup';

  elements.title.textContent = isSignup ? 'Creează cont' : 'Autentificare';
  elements.loginMode.classList.toggle('active', !isSignup);
  elements.signupMode.classList.toggle('active', isSignup);
  elements.nameRow.classList.toggle('hidden', !isSignup);
  elements.phoneField.classList.toggle('hidden', !isSignup);
  elements.roleField.classList.toggle('hidden', !isSignup);
  elements.submitButton.textContent = isSignup ? 'Creează cont' : 'Conectează-te';
}

function setStatus(message, type = '') {
  elements.status.textContent = message;
  elements.status.className = `status ${type}`.trim();
}

function readForm() {
  const formData = new FormData(elements.authForm);
  return Object.fromEntries(formData.entries());
}

function validatePayload(payload) {
  if (!payload.email || !payload.password) {
    return 'Email și parolă sunt obligatorii.';
  }

  if (state.mode === 'signup') {
    if (!payload.firstName || !payload.lastName) {
      return 'Prenumele și numele sunt obligatorii la înregistrare.';
    }
    if (payload.password.length < 8) {
      return 'Parola trebuie să aibă minimum 8 caractere.';
    }
  }

  return '';
}

async function submitAuth(event) {
  event.preventDefault();
  const payload = readForm();
  const validationError = validatePayload(payload);

  if (validationError) {
    setStatus(validationError, 'error');
    return;
  }

  const endpoint = state.mode === 'signup' ? '/auth/register' : '/auth/login';
  const requestBody = state.mode === 'signup'
    ? payload
    : { email: payload.email, password: payload.password };

  setStatus('Se trimite cererea...', '');
  elements.result.textContent = 'Loading...';

  try {
    const response = await fetch(`${state.apiBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json().catch(() => ({ message: 'Răspuns invalid de la server.' }));
    elements.result.textContent = JSON.stringify(data, null, 2);

    if (!response.ok) {
      setStatus(data.message || 'Cererea a eșuat.', 'error');
      return;
    }

    if (data.token) {
      setToken(data.token);
      setTimeout(() => window.location.href = "/dashboard.html", 2000)
    }

    setStatus(state.mode === 'signup' ? 'Cont creat cu succes.' : 'Autentificare reușită.', 'success');
  } catch (error) {
    elements.result.textContent = JSON.stringify({ error: error.message }, null, 2);
    setStatus('Backend-ul nu răspunde sau CORS nu permite cererea.', 'error');
  }
}

elements.loginMode.addEventListener('click', () => setMode('login'));
elements.signupMode.addEventListener('click', () => setMode('signup'));
elements.authForm.addEventListener('submit', submitAuth);

setMode('login');
