# Development

## Prerequisites

- [Docker](https://www.docker.com/get-started) (20+)  
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+)  

> No need to install Node.js or MySQL locally — Docker handles everything.

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/Parsyfall/planora.git
cd planora-backend
```

2. **Create `.env` file**

Copy the example and fill the missing secrets

```bash
cp .env.example .env
```

## Running the app

Start the backend, database, and Adminer with Docker Compose:

```bash
docker-compose up --build
```