const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// מסלול לדף הראשי
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// מסלול הרשמה
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  
  // בדיקה שהשדות לא ריקים
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  // בדיקה שהאימייל לא קיים כבר
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, existingUser) => {
    if (err) {
      console.error("DB error checking existing user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    
    // הוספת משתמש חדש
    db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      function(err) {
        if (err) {
          console.error("DB error creating user:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        
        res.status(201).json({ 
          message: "Registration successful", 
          user: { id: this.lastID, username, email } 
        });
      }
    );
  });
});

// מסלול התחברות
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  // username is actually email from the frontend
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (err) {
        console.error("DB error during login:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (user) {
        res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email } });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
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

// fallback לכל דף שלא נמצא
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
