# Planora

# Requirements

Make sure you have installed:

- Node.js (v18+ recommended)
- Docker + Docker Compose  
  OR Podman + podman-compose (Linux)
### How to run

# How to Run (Development)

## 1. Clone repository

```bash
git clone git@github.com:Parsyfall/planora.git
cd planora
```

## 2. Start application with Docker
```bash
docker compose up --build
```

This will start:
- MySQL database
- Backend API (`http://localhost:3001`)
- Frontend (`http://localhost:8088`)
- Adminer (`http://localhost:8080`)