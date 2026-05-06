# Personal portfolio (FastAPI + React)

Interactive portfolio site with a JWT-protected admin panel and visitor analytics (SQLite).

## Prerequisites

- Python 3.11+
- Node.js 18+

## Local development

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
.\.venv\Scripts\uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Copy `backend/.env.example` to `backend/.env` and adjust if needed.

- API: `http://127.0.0.1:8000`
- Health: `GET /health`
- SQLite: `backend/portfolio.db` (created on first run)

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

- Site: `http://localhost:5173`
- Do **not** set `VITE_API_URL` locally — Vite proxies `/api` to `http://127.0.0.1:8000`.

### Default admin login

- **Username:** `admin`
- **Password:** `admin123`

Change the password under **Admin → Profile** after first login.

---

## Hosting (Netlify + API host)

Netlify serves the **React build** only. Run **FastAPI** on a platform that supports Python (e.g. **Render**, **Railway**, **Fly.io**, or a VPS).

Below is a **full step-by-step** using **Render** for the API and **Netlify** for the site (you can swap Render for Railway/Fly with the same env vars and start command).

### Part A — Push your code to GitHub

1. Create a repository on GitHub (if you do not have one yet).
2. Commit and push this whole `portfolio` project (including `frontend/`, `backend/`, `netlify.toml`).

### Part B — Deploy the backend (example: Render)

1. Go to [render.com](https://render.com) and sign in. Connect your GitHub account.
2. Click **New +** → **Web Service**.
3. Select your **portfolio** repository.
4. Configure the service:
   - **Name:** e.g. `portfolio-api`
   - **Root directory:** `backend`
   - **Runtime:** Python 3
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Under **Environment**, add:
   - **`SECRET_KEY`** — a long random string (generate one; do not use the example from `.env.example` in production).
   - **`CORS_ORIGINS`** — for the first deploy, you can use:  
     `http://localhost:5173,https://placeholder.netlify.app`  
     You will **update this** after Netlify gives you a real URL (Part C, step 8).
6. Click **Create Web Service** and wait until the deploy finishes.
7. Copy your API URL from Render (e.g. `https://portfolio-api-xxxx.onrender.com`).  
   Open `https://YOUR-API-URL/health` in a browser — you should see `{"status":"ok"}`.

**SQLite note:** On free tiers the disk may reset when the service sleeps or redeploys. For a portfolio that is often acceptable; for permanent data, add a **persistent disk** on Render or move to PostgreSQL later.

### Part C — Deploy the frontend on Netlify

1. Go to [netlify.com](https://www.netlify.com) and sign in. Connect GitHub.
2. **Add new site** → **Import an existing project** → choose your **portfolio** repo.
3. Netlify should read [`netlify.toml`](netlify.toml) automatically:
   - Base directory: **`frontend`**
   - Build command: **`npm install && npm run build`**
   - Publish directory: **`dist`**
4. Before the first successful production build, add an environment variable:
   - **Site configuration** → **Environment variables** → **Add a variable**
   - **Key:** `VITE_API_URL`
   - **Value:** your Render API URL **with no trailing slash**, e.g. `https://portfolio-api-xxxx.onrender.com`
   - Scope: **Production** (and **Deploy previews** if you want previews to work against the API too).
5. Click **Deploy site**.
6. When the build finishes, open your Netlify URL (e.g. `https://random-name-123.netlify.app`).
7. If the page loads but data fails: check browser **Network** tab for `/api/...` errors — usually **`VITE_API_URL`** is wrong or the API is still starting (Render free tier can take ~30s after sleep).
8. **Update CORS on the API:** In Render → your web service → **Environment** → set **`CORS_ORIGINS`** to your **exact** Netlify URL plus local dev, for example:  
   `https://random-name-123.netlify.app,http://localhost:5173`  
   Save and let the service redeploy.

### Part D — After everything works

1. Open `https://YOUR-NETLIFY-URL/admin/login` and sign in (`admin` / `admin123` unless you changed them).
2. **Change the admin password** under **Profile**.
3. Optional: in Netlify, set a **custom domain**; then add that origin to **`CORS_ORIGINS`** on the API and redeploy the API.

### Quick reference — environment variables

| Where        | Variable          | Purpose |
|-------------|-------------------|--------|
| API (Render)| `SECRET_KEY`      | JWT signing; must be secret and long. |
| API (Render)| `CORS_ORIGINS`    | Comma-separated **frontend** URLs only (Netlify + optional `http://localhost:5173`). |
| Netlify     | `VITE_API_URL`    | Public API origin, **no** trailing slash. Required for production build. |

See [`frontend/.env.example`](frontend/.env.example). Locally, **do not** set `VITE_API_URL` so the Vite dev proxy keeps working.

---

## Analytics

Visitor tracking uses `POST /api/track`. Geo lookup uses [ipapi.co](https://ipapi.co) (rate limits on free tier).

---

## Updating content

Use the admin UI: **Profile**, **Education**, **Experience**, **Projects**, **Skills**, **Certifications**, **Publications**. Data is stored in the API’s SQLite (or future DB).
