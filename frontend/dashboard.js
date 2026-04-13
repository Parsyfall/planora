const API = `${window.location.origin}/api`;
const token = localStorage.getItem("planora_token");

if (!token) {
    window.location.href = "/";
}

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

const userDataEl = document.getElementById("userData");
const eventsListEl = document.getElementById("eventsList");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("planora_token");
    window.location.href = "/";
});

async function loadUser() {
    try {
        const res = await fetch(`${API}/users/me`, { headers });
        const data = await res.json();
        userDataEl.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        userDataEl.textContent = "Failed to load user";
    }
}

async function loadEvents() {
    try {
        const res = await fetch(`${API}/events`, { headers });
        const data = await res.json();

        eventsListEl.innerHTML = "";

        if (!data.length) {
            eventsListEl.innerHTML = "<li>No events yet</li>";
            return;
        }

        data.forEach(event => {
            const li = document.createElement("li");
            li.textContent = `${event.title} — ${event.date}`;
            eventsListEl.appendChild(li);
        });
    } catch (err) {
        eventsListEl.innerHTML = "<li>Error loading events</li>";
    }
}

loadUser();
loadEvents();