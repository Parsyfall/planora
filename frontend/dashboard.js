import { requireAuth, clearToken } from "./auth.js";

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
const createBtn = document.getElementById("createEventBtn");
const formContainer = document.getElementById("eventFormContainer");

logoutBtn.addEventListener("click", () => {
    clearToken();
    window.location.href = "/";
});

createBtn.addEventListener("click", () => {
    formContainer.classList.remove("hidden");
});

const form = document.getElementById("eventForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("planora_token");
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
        const res = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Error creating event");
            return;
        }

        form.reset();
        formContainer.classList.add("hidden");

        loadEvents();

    } catch (err) {
        alert("Network error");
    }
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

async function init() {
    const user = await requireAuth();
    if (!user) return;

    userDataEl.textContent = JSON.stringify(user, null, 2);

    loadEvents();
}

init();