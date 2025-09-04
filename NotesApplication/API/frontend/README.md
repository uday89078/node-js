# Notes Frontend (Vite + React)

## Quick start
```bash
cd notes-frontend
npm install
npm run dev
```

The app expects your backend running at **http://localhost:5000** with routes:
- `POST /api/user/register`  (body: `{ name, email, password }`)
- `POST /api/user/signIn`    (body: `{ email, password }`)
- (optional) `GET /api/notes` (requires Bearer token)

If your backend runs on a different port, update `src/api.js` accordingly.
