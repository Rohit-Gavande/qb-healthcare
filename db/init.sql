
-- init.sql for qb-healthcare demo
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(200),
  dob DATE,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  speciality VARCHAR(100),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE SET NULL,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  reason TEXT,
  status VARCHAR(30) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(id),
  note TEXT,
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO patients (full_name, email, dob) VALUES
  ('Alice Fernandez', 'alice@example.com', '1986-02-14'),
  ('Bob Singh', 'bob@example.com', '1990-08-30');

INSERT INTO doctors (full_name, speciality) VALUES
  ('Dr. Priya Kapoor', 'General Practice'),
  ('Dr. John Doe', 'Cardiology');

INSERT INTO appointments (patient_id, doctor_id, starts_at, ends_at, reason) VALUES
  (1,1, now() + interval '1 day', now() + interval '1 day' + interval '30 minutes', 'General checkup'),
  (2,2, now() + interval '2 days', now() + interval '2 days' + interval '45 minutes', 'Heart palpitations');

INSERT INTO records (patient_id, doctor_id, note) VALUES
  (1,1,'Blood pressure normal. Adviced regular exercise.'),
  (2,2,'EKG recommended. Follow-up in 2 weeks.');
