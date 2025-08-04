CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- טבלת קליניקות
CREATE TABLE IF NOT EXISTS clinics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  image_url TEXT,
  rating REAL DEFAULT 0.0,
  distance TEXT,
  price_range TEXT,
  features TEXT, -- JSON string of features
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- טבלת שירותים רפואיים
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price_range TEXT,
  duration_minutes INTEGER DEFAULT 30,
  is_urgent BOOLEAN DEFAULT 0,
  category TEXT, -- dental, emergency, imaging, etc.
  icon TEXT, -- bootstrap icon class
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- טבלת סוגי טיפולים
CREATE TABLE IF NOT EXISTS treatment_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price_range TEXT,
  category TEXT,
  icon TEXT,
  is_popular BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- טבלת תורים זמינים
CREATE TABLE IF NOT EXISTS available_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clinic_id INTEGER,
  service_id INTEGER,
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_available BOOLEAN DEFAULT 1,
  is_urgent BOOLEAN DEFAULT 0,
  FOREIGN KEY (clinic_id) REFERENCES clinics (id),
  FOREIGN KEY (service_id) REFERENCES services (id)
);

-- טבלת תורים שזומנו
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  clinic_id INTEGER,
  service_id INTEGER,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'confirmed', -- confirmed, cancelled, completed
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (clinic_id) REFERENCES clinics (id),
  FOREIGN KEY (service_id) REFERENCES services (id)
);

-- טבלת הגדרות משתמש
CREATE TABLE IF NOT EXISTS user_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE,
  language TEXT DEFAULT 'en',
  notifications_enabled BOOLEAN DEFAULT 1,
  appointment_reminders BOOLEAN DEFAULT 1,
  medication_reminders BOOLEAN DEFAULT 1,
  news_updates BOOLEAN DEFAULT 0,
  location_enabled BOOLEAN DEFAULT 1,
  city TEXT,
  radius INTEGER DEFAULT 10,
  biometric_auth BOOLEAN DEFAULT 0,
  auto_lock BOOLEAN DEFAULT 1,
  data_sharing BOOLEAN DEFAULT 0,
  theme TEXT DEFAULT 'light',
  font_size TEXT DEFAULT 'medium',
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- טבלת שאלות תמיכה
CREATE TABLE IF NOT EXISTS support_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic TEXT NOT NULL, -- booking, technical, billing, account, medical, other
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'quick', -- quick, text
  options TEXT, -- JSON array of options for quick questions
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- טבלת מחירים לשירותים
CREATE TABLE IF NOT EXISTS service_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_name TEXT NOT NULL,
  price_range TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);