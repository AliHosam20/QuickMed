const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      connectSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net"]
    }
  }
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? ['https://yourdomain.com'] : true,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 login attempts per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use('/api/login', authLimiter);
app.use('/api/register', authLimiter);

// Body parsing
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, "..", "public")));

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// מסלול לדף הראשי
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// מסלול הרשמה עם אבטחה מתקדמת
app.post("/api/register", [
  body('username').isLength({ min: 2, max: 50 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Registration validation errors:', errors.array());
    return res.status(400).json({ 
      message: "Validation failed", 
      errors: errors.array() 
    });
  }

  const { username, email, password } = req.body;
  
  // בדיקה שהאימייל לא קיים כבר
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, existingUser) => {
    if (err) {
      console.error("DB error checking existing user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    
    // הצפנת הסיסמה
    const saltRounds = 12;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      
      // הוספת משתמש חדש עם סיסמה מוצפנת
      db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        function(err) {
          if (err) {
            console.error("DB error creating user:", err);
            return res.status(500).json({ message: "Internal server error" });
          }
          
          // יצירת JWT token
          const token = jwt.sign(
            { id: this.lastID, email: email },
            JWT_SECRET,
            { expiresIn: '24h' }
          );
          
          res.status(201).json({ 
            message: "Registration successful", 
            user: { id: this.lastID, username, email },
            token: token
          });
        }
      );
    });
  });
});

// מסלול התחברות עם אבטחה מתקדמת
app.post("/api/login", [
  body('username').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 })
], (req, res) => {
  console.log('Login request received:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ 
      message: "Validation failed", 
      errors: errors.array() 
    });
  }

  const { username, password } = req.body;
  const email = username; // username is actually email from the frontend
  
  console.log('Login attempt:', { email, passwordLength: password ? password.length : 0 });
  
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {
      if (err) {
        console.error("DB error during login:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // בדיקת הסיסמה המוצפנת
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // יצירת JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        
        res.status(200).json({ 
          message: "Login successful", 
          user: { id: user.id, username: user.username, email: user.email },
          token: token
        });
      });
    }
  );
});

// API לקבלת כל הקליניקות
app.get("/api/clinics", (req, res) => {
  const query = `
    SELECT c.*, 
           GROUP_CONCAT(DISTINCT s.name) as services
    FROM clinics c
    LEFT JOIN available_slots a ON c.id = a.clinic_id
    LEFT JOIN services s ON a.service_id = s.id
    GROUP BY c.id
  `;
  
  db.all(query, (err, clinics) => {
    if (err) {
      console.error("DB error fetching clinics:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    // המר features מ-JSON string למערך
    clinics.forEach(clinic => {
      try {
        clinic.features = JSON.parse(clinic.features);
      } catch (e) {
        clinic.features = [];
      }
    });
    
    res.json(clinics);
  });
});

// API לקבלת קליניקה ספציפית
app.get("/api/clinics/:id", (req, res) => {
  const clinicId = req.params.id;
  
  db.get("SELECT * FROM clinics WHERE id = ?", [clinicId], (err, clinic) => {
    if (err) {
      console.error("DB error fetching clinic:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }
    
    // המר features מ-JSON string למערך
    try {
      clinic.features = JSON.parse(clinic.features);
    } catch (e) {
      clinic.features = [];
    }
    
    res.json(clinic);
  });
});

// API לקבלת כל השירותים
app.get("/api/services", (req, res) => {
  db.all("SELECT * FROM services", (err, services) => {
    if (err) {
      console.error("DB error fetching services:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(services);
  });
});

// API לקבלת תורים זמינים
app.get("/api/available-slots", (req, res) => {
  const { clinic_id, service_id, date } = req.query;
  
  let query = `
    SELECT a.*, c.name as clinic_name, s.name as service_name, s.price_range
    FROM available_slots a
    JOIN clinics c ON a.clinic_id = c.id
    JOIN services s ON a.service_id = s.id
    WHERE a.is_available = 1
  `;
  
  const params = [];
  
  if (clinic_id) {
    query += " AND a.clinic_id = ?";
    params.push(clinic_id);
  }
  
  if (service_id) {
    query += " AND a.service_id = ?";
    params.push(service_id);
  }
  
  if (date) {
    query += " AND a.date = ?";
    params.push(date);
  }
  
  query += " ORDER BY a.date, a.time";
  
  db.all(query, params, (err, slots) => {
    if (err) {
      console.error("DB error fetching slots:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(slots);
  });
});

// API לזימון תור
app.post("/api/appointments", (req, res) => {
  const { user_id, clinic_id, service_id, appointment_date, appointment_time, notes } = req.body;
  
  // בדוק שהתור עדיין זמין
  db.get(
    "SELECT * FROM available_slots WHERE clinic_id = ? AND service_id = ? AND date = ? AND time = ? AND is_available = 1",
    [clinic_id, service_id, appointment_date, appointment_time],
    (err, slot) => {
      if (err) {
        console.error("DB error checking slot:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      
      if (!slot) {
        return res.status(400).json({ message: "Slot is not available" });
      }
      
      // צור את התור
      db.run(
        "INSERT INTO appointments (user_id, clinic_id, service_id, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, clinic_id, service_id, appointment_date, appointment_time, notes],
        function(err) {
          if (err) {
            console.error("DB error creating appointment:", err);
            return res.status(500).json({ message: "Internal server error" });
          }
          
          // סמן את התור כלא זמין
          db.run(
            "UPDATE available_slots SET is_available = 0 WHERE clinic_id = ? AND service_id = ? AND date = ? AND time = ?",
            [clinic_id, service_id, appointment_date, appointment_time]
          );
          
          res.status(201).json({ 
            message: "Appointment created successfully", 
            appointment_id: this.lastID 
          });
        }
      );
    }
  );
});

// API לקבלת תורים של משתמש
app.get("/api/appointments/:user_id", (req, res) => {
  const userId = req.params.user_id;
  
  const query = `
    SELECT a.*, c.name as clinic_name, c.address, s.name as service_name, s.price_range
    FROM appointments a
    JOIN clinics c ON a.clinic_id = c.id
    JOIN services s ON a.service_id = s.id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
  `;
  
  db.all(query, [userId], (err, appointments) => {
    if (err) {
      console.error("DB error fetching appointments:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(appointments);
  });
});

// API לשמירת הגדרות משתמש
app.post("/api/user-settings", (req, res) => {
  const { user_id, ...settings } = req.body;
  
  // בדוק אם יש כבר הגדרות למשתמש
  db.get("SELECT * FROM user_settings WHERE user_id = ?", [user_id], (err, existing) => {
    if (err) {
      console.error("DB error checking settings:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (existing) {
      // עדכן הגדרות קיימות
      const updateQuery = `
        UPDATE user_settings SET 
        language = ?, notifications_enabled = ?, appointment_reminders = ?, 
        medication_reminders = ?, news_updates = ?, location_enabled = ?, 
        city = ?, radius = ?, biometric_auth = ?, auto_lock = ?, 
        data_sharing = ?, theme = ?, font_size = ?
        WHERE user_id = ?
      `;
      
      db.run(updateQuery, [
        settings.language, settings.notifications_enabled, settings.appointment_reminders,
        settings.medication_reminders, settings.news_updates, settings.location_enabled,
        settings.city, settings.radius, settings.biometric_auth, settings.auto_lock,
        settings.data_sharing, settings.theme, settings.font_size, user_id
      ], function(err) {
        if (err) {
          console.error("DB error updating settings:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "Settings updated successfully" });
      });
    } else {
      // צור הגדרות חדשות
      const insertQuery = `
        INSERT INTO user_settings (user_id, language, notifications_enabled, appointment_reminders,
        medication_reminders, news_updates, location_enabled, city, radius, biometric_auth,
        auto_lock, data_sharing, theme, font_size)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.run(insertQuery, [
        user_id, settings.language, settings.notifications_enabled, settings.appointment_reminders,
        settings.medication_reminders, settings.news_updates, settings.location_enabled,
        settings.city, settings.radius, settings.biometric_auth, settings.auto_lock,
        settings.data_sharing, settings.theme, settings.font_size
      ], function(err) {
        if (err) {
          console.error("DB error creating settings:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Settings created successfully" });
      });
    }
  });
});

// API לקבלת הגדרות משתמש
app.get("/api/user-settings/:user_id", (req, res) => {
  const userId = req.params.user_id;
  
  db.get("SELECT * FROM user_settings WHERE user_id = ?", [userId], (err, settings) => {
    if (err) {
      console.error("DB error fetching settings:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (!settings) {
      // החזר הגדרות ברירת מחדל
      settings = {
        language: 'en',
        notifications_enabled: 1,
        appointment_reminders: 1,
        medication_reminders: 1,
        news_updates: 0,
        location_enabled: 1,
        city: '',
        radius: 10,
        biometric_auth: 0,
        auto_lock: 1,
        data_sharing: 0,
        theme: 'light',
        font_size: 'medium'
      };
    }
    
    res.json(settings);
  });
});

// API לקבלת סוגי טיפולים
app.get("/api/treatment-types", (req, res) => {
  const { category, popular } = req.query;
  
  let query = "SELECT * FROM treatment_types";
  const params = [];
  
  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }
  
  if (popular === 'true') {
    if (category) {
      query += " AND is_popular = 1";
    } else {
      query += " WHERE is_popular = 1";
    }
  }
  
  query += " ORDER BY is_popular DESC, name ASC";
  
  db.all(query, params, (err, treatments) => {
    if (err) {
      console.error("DB error fetching treatment types:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(treatments);
  });
});

// API לקבלת מחירי שירותים
app.get("/api/service-prices", (req, res) => {
  const { service_name } = req.query;
  
  let query = "SELECT * FROM service_prices";
  const params = [];
  
  if (service_name) {
    query += " WHERE service_name LIKE ?";
    params.push(`%${service_name}%`);
  }
  
  query += " ORDER BY service_name ASC";
  
  db.all(query, params, (err, prices) => {
    if (err) {
      console.error("DB error fetching service prices:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(prices);
  });
});

// API לקבלת מחיר שירות ספציפי
app.get("/api/service-prices/:service_name", (req, res) => {
  const serviceName = req.params.service_name;
  
  db.get("SELECT * FROM service_prices WHERE service_name LIKE ?", [`%${serviceName}%`], (err, price) => {
    if (err) {
      console.error("DB error fetching service price:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (!price) {
      return res.status(404).json({ message: "Service price not found" });
    }
    
    res.json(price);
  });
});

// API לקבלת שאלות תמיכה
app.get("/api/support-questions", (req, res) => {
  const { topic } = req.query;
  
  let query = "SELECT * FROM support_questions";
  const params = [];
  
  if (topic) {
    query += " WHERE topic = ?";
    params.push(topic);
  }
  
  query += " ORDER BY topic, order_index ASC";
  
  db.all(query, params, (err, questions) => {
    if (err) {
      console.error("DB error fetching support questions:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    // המר options מ-JSON string למערך
    questions.forEach(question => {
      if (question.options) {
        try {
          question.options = JSON.parse(question.options);
        } catch (e) {
          question.options = [];
        }
      }
    });
    
    res.json(questions);
  });
});

// API לקבלת שאלות תמיכה לפי נושא
app.get("/api/support-questions/:topic", (req, res) => {
  const topic = req.params.topic;
  
  db.all("SELECT * FROM support_questions WHERE topic = ? ORDER BY order_index ASC", [topic], (err, questions) => {
    if (err) {
      console.error("DB error fetching support questions:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    // המר options מ-JSON string למערך
    questions.forEach(question => {
      if (question.options) {
        try {
          question.options = JSON.parse(question.options);
        } catch (e) {
          question.options = [];
        }
      }
    });
    
    res.json(questions);
  });
});

// API לקבלת שירותים לפי קטגוריה
app.get("/api/services/category/:category", (req, res) => {
  const category = req.params.category;
  
  db.all("SELECT * FROM services WHERE category = ? ORDER BY name ASC", [category], (err, services) => {
    if (err) {
      console.error("DB error fetching services by category:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(services);
  });
});

// API לקבלת שירותים דחופים
app.get("/api/services/urgent", (req, res) => {
  db.all("SELECT * FROM services WHERE is_urgent = 1 ORDER BY name ASC", (err, services) => {
    if (err) {
      console.error("DB error fetching urgent services:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(services);
  });
});

// API לקבלת מספר המשתמשים
app.get("/api/users/count", (req, res) => {
  db.get("SELECT COUNT(*) as count FROM users", (err, result) => {
    if (err) {
      console.error("DB error counting users:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ count: result.count });
  });
});

// API לקבלת מספר הקליניקות
app.get("/api/clinics/count", (req, res) => {
  db.get("SELECT COUNT(*) as count FROM clinics", (err, result) => {
    if (err) {
      console.error("DB error counting clinics:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ count: result.count });
  });
});

// API לקבלת מספר התורים להיום
app.get("/api/appointments/today/count", (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  db.get("SELECT COUNT(*) as count FROM appointments WHERE appointment_date = ?", [today], (err, result) => {
    if (err) {
      console.error("DB error counting today's appointments:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ count: result.count });
  });
});

// API לקבלת מספר התורים הכללי
app.get("/api/appointments/count", (req, res) => {
  db.get("SELECT COUNT(*) as count FROM appointments", (err, result) => {
    if (err) {
      console.error("DB error counting appointments:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ count: result.count });
  });
});

// מסלול מוגן לדוגמה - דורש אימות
app.get("/api/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  db.get("SELECT id, username, email FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) {
      console.error("DB error fetching user profile:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ user });
  });
});

// מסלול לרענון token
app.post("/api/refresh-token", authenticateToken, (req, res) => {
  const newToken = jwt.sign(
    { id: req.user.id, email: req.user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token: newToken });
});

// Appointments API endpoints
// Get user appointments
app.get('/api/appointments', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  db.all(
    'SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC, appointment_time DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Create new appointment
app.post('/api/appointments', authenticateToken, [
  body('clinic_name').notEmpty().trim(),
  body('clinic_type').notEmpty().trim(),
  body('service').notEmpty().trim(),
  body('appointment_date').isISO8601(),
  body('appointment_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('notes').optional().trim()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { clinic_name, clinic_type, service, appointment_date, appointment_time, notes } = req.body;
  const userId = req.user.id;

  // Check if appointment time is available
  db.get(
    'SELECT id FROM appointments WHERE clinic_name = ? AND appointment_date = ? AND appointment_time = ? AND status != "cancelled"',
    [clinic_name, appointment_date, appointment_time],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (row) {
        return res.status(400).json({ error: 'This time slot is already booked' });
      }

      // Create appointment
      db.run(
        'INSERT INTO appointments (user_id, clinic_name, clinic_type, service, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, clinic_name, clinic_type, service, appointment_date, appointment_time, notes || ''],
        function(err) {
          if (err) {
            console.error('Database error creating appointment:', err);
            return res.status(500).json({ error: 'Failed to create appointment' });
          }
          
          res.json({
            id: this.lastID,
            message: 'Appointment created successfully'
          });
        }
      );
    }
  );
});

// Update appointment status
app.put('/api/appointments/:id', authenticateToken, [
  body('status').isIn(['scheduled', 'completed', 'cancelled', 'rescheduled'])
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  db.run(
    'UPDATE appointments SET status = ? WHERE id = ? AND user_id = ?',
    [status, id, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      
      res.json({ message: 'Appointment updated successfully' });
    }
  );
});

// Delete appointment
app.delete('/api/appointments/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.run(
    'DELETE FROM appointments WHERE id = ? AND user_id = ?',
    [id, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      
      res.json({ message: 'Appointment deleted successfully' });
    }
  );
});

// fallback לכל דף שלא נמצא
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Create appointments table
db.run(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    clinic_name TEXT NOT NULL,
    clinic_type TEXT NOT NULL,
    service TEXT NOT NULL,
    appointment_date TEXT NOT NULL,
    appointment_time TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )
`);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
