const API = `${window.location.origin}/api`;

export function getToken() {
  return localStorage.getItem("planora_token");
}

export function setToken(token) {
  localStorage.setItem("planora_token", token);
}

export function clearToken() {
  localStorage.removeItem("planora_token");
}

export async function requireAuth() {
  const token = getToken();

  if (!token) {
    window.location.href = "/";
    return null;
  }

  try {
    const res = await fetch(`${API}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error();

    return await res.json();
  } catch {
    clearToken();
    window.location.href = "/";
    return null;
  }
}

export function redirectIfAuthenticated() {
  const token = getToken();
  if (token) {
    window.location.href = "/dashboard.html";
  }
}