* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background: radial-gradient(circle at top, #172554 0%, #080b14 45%, #030508 100%);
  color: #f5f7ff;
  line-height: 1.6;
}

header {
  padding: 28px 20px;
  text-align: center;
  border-bottom: 1px solid #27304b;
}

header h1 {
  margin: 0;
  letter-spacing: 2px;
}

.card,
.container {
  width: min(900px, 92%);
  margin: 30px auto;
  padding: 28px;
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(109, 124, 255, 0.18);
  border-radius: 18px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.35),
    0 0 30px rgba(79, 70, 229, 0.08);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}
h1,
h2 {
  line-height: 1.3;
}

 label {
  display: block;
  margin: 22px 0;
  font-weight: 700;
  font-size: 14px;
  color: #dbe4ff;
  letter-spacing: 0.2px;
}
input,
textarea,
select {
  width: 100%;
  margin-top: 9px;
  padding: 14px 15px;
  border-radius: 11px;
  border: 1px solid #334155;
  background: rgba(8, 13, 25, 0.85);
  color: #f8fafc;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #6d7cff;
  background: #0b1222;
  box-shadow: 0 0 0 3px rgba(109, 124, 255, 0.15);
}

input:focus,
textarea:focus,
select:focus {
  border-color: #6d7cff;
}

textarea {
  min-height: 110px;
  resize: vertical;
}

button {
  border: 0;
  padding: 13px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  background: linear-gradient(135deg, #6d7cff, #4f46e5);
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.35);
  opacity: 0.95;
}

button:active {
  transform: translateY(0);
}

button.secondary {
  background: #35405e;
}

button.danger {
  background: #b83c4d;
}

button.success {
  background: #2e9d65;
}

.muted {
  color: #aab4cf;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 25px;
  overflow: hidden;
  border: 1px solid #303b5a;
  border-radius: 12px;
}

th,
td {
  text-align: left;
  padding: 14px;
  border-bottom: 1px solid #303b5a;
  vertical-align: middle;
}

th {
  background: #1b2540;
}

tr:last-child td {
  border-bottom: 0;
}

td button {
  margin: 3px;
}

/* Cars */

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 30px;
}

.car-card {
  background: #10172a;
  border: 1px solid #2c3858;
  border-radius: 15px;
  overflow: hidden;
  transition: 0.2s;
}

.car-card:hover {
  transform: translateY(-4px);
}

.car-card img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  display: block;
}

.car-card h2,
.car-card p {
  margin-left: 18px;
  margin-right: 18px;
}

.car-card h2 {
  margin-top: 16px;
  margin-bottom: 5px;
}

.car-card p {
  color: #aab4cf;
  margin-bottom: 18px;
}

/* Waiting page */

#status {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  background: #0d1426;
  color: #aab4cf;
  text-align: center;
}

/* Mobile */

@media (max-width: 700px) {
  .card,
  .container {
    width: 94%;
    margin: 25px auto;
    padding: 22px;
  }

  .row {
    flex-direction: column;
    align-items: stretch;
  }

  table {
    display: block;
    overflow-x: auto;
    font-size: 13px;
  }

  th,
  td {
    padding: 10px;
    white-space: nowrap;
  }

  .cars-grid {
    grid-template-columns: 1fr;
  }
}
#status {
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(109, 124, 255, 0.08);
  border: 1px solid rgba(109, 124, 255, 0.18);
  color: #cbd5ff;
  font-size: 14px;
  text-align: center;
}
h1,
h2,
h3 {
  color: #f8fafc;
  line-height: 1.2;
  letter-spacing: -0.3px;
}

h1 {
  font-size: 32px;
  margin-bottom: 12px;
}

h2 {
  font-size: 22px;
  margin-top: 20px;
}

h3 {
  font-size: 18px;
} 
.card:hover,
.container:hover {
  border-color: rgba(109, 124, 255, 0.35);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.4),
    0 0 35px rgba(79, 70, 229, 0.12);
}

a {
  color: #9aa7ff;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #c7ceff;
}
