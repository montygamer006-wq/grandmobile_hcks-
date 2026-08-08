# GrandMobile HCKS project website

This is a simple full-stack project where:
- Visitors use `index.html` to submit non-sensitive project data.
- Only the authenticated admin can view submissions at `admin.html`.
- Data is stored in a local SQLite database.
- The visitor page never displays the admin dashboard.
- No Gmail passwords or other account credentials are collected.

## Run it

1. Install Node.js.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000`.
6. Admin dashboard: `http://localhost:3000/admin.html`.

Before putting it online:
- Change `ADMIN_PASSWORD` in `server.js`.
- Change the session secret.
- Use HTTPS.
- Use a proper production session store.
- Add rate limiting and stronger password hashing/authentication.

The `/admin.html` URL is not linked from the visitor page, but real security comes from the server-side admin session check, not from hiding the URL.
