
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER || 'qbuser',
  password: process.env.DATABASE_PASSWORD || 'qbpass',
  database: process.env.DATABASE_NAME || 'qbhealth'
});

const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => res.json({ message: 'QB Healthcare backend up' }));

// Patients CRUD (read-only demo endpoints)
app.get('/api/patients', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, full_name, email, dob FROM patients ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error' });
  }
});

app.get('/api/patients/:id/records', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT r.id, r.note, r.created_at, d.full_name AS doctor FROM records r LEFT JOIN doctors d ON d.id = r.doctor_id WHERE r.patient_id = $1 ORDER BY r.created_at DESC', [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error' });
  }
});

// Appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT a.id, a.starts_at, a.ends_at, a.reason, a.status,
      p.full_name AS patient, d.full_name AS doctor FROM appointments a
      LEFT JOIN patients p ON p.id = a.patient_id
      LEFT JOIN doctors d ON d.id = a.doctor_id ORDER BY a.starts_at`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { patient_id, doctor_id, starts_at, ends_at, reason } = req.body;
    const { rows } = await pool.query('INSERT INTO appointments (patient_id, doctor_id, starts_at, ends_at, reason) VALUES ($1,$2,$3,$4,$5) RETURNING *', [patient_id, doctor_id, starts_at, ends_at, reason]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error' });
  }
});

// Doctors list
app.get('/api/doctors', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, full_name, speciality FROM doctors ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error' });
  }
});

app.listen(port, () => console.log(`Backend listening on ${port}`));
