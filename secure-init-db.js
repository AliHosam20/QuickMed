const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'quickmed.db');
const schemaPath = path.resolve(__dirname, 'schema.sql');

// מחיקת מסד נתונים קיים אם קיים
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🗑️  Removed existing database');
}

const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema, (err) => {
  if (err) {
    console.error('❌ Failed to create tables:', err.message);
  } else {
    console.log('✅ Tables created successfully');
    addSecureUsers();
  }
});

async function addSecureUsers() {
  console.log('🔐 Adding secure users...');
  
  const users = [
    { username: 'Admin User', email: 'admin@quickmed.com', password: 'Admin123!@#' },
    { username: 'Doctor Smith', email: 'doctor@quickmed.com', password: 'Doctor123!@#' },
    { username: 'Patient John', email: 'patient@quickmed.com', password: 'Patient123!@#' },
    { username: 'Test User', email: 'test@example.com', password: 'Test123!@#' }
  ];

  for (const user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      
      db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, hashedPassword],
        function(err) {
          if (err) {
            console.error(`❌ Error adding user ${user.username}:`, err.message);
          } else {
            console.log(`✅ User ${user.username} added with ID: ${this.lastID}`);
          }
        }
      );
    } catch (error) {
      console.error(`❌ Error hashing password for ${user.username}:`, error);
    }
  }
  
  // הוספת נתונים נוספים
  setTimeout(() => {
    addSampleData();
  }, 1000);
}

function addSampleData() {
  console.log('📊 Adding sample data...');
  
  const sampleClinics = [
    {
      name: 'מרפאת לב בריאות',
      image_url: '/images/clinic1.jpg',
      rating: 4.8,
      distance: '2.5 ק"מ',
      price_range: '₪200-₪500',
      features: JSON.stringify(['חניה חינם', 'נגישות לנכים', 'מחלקת חירום']),
      address: 'רחוב הרצל 15, תל אביב',
      phone: '03-1234567',
      email: 'info@levhealth.co.il',
      website: 'www.levhealth.co.il'
    },
    {
      name: 'מרכז רפואי דיגיטלי',
      image_url: '/images/clinic2.jpg',
      rating: 4.6,
      distance: '1.8 ק"מ',
      price_range: '₪150-₪400',
      features: JSON.stringify(['טיפול דיגיטלי', 'תורים מקוונים', 'מעקב אפליקציה']),
      address: 'שדרות רוטשילד 30, תל אביב',
      phone: '03-7654321',
      email: 'contact@digitalmed.co.il',
      website: 'www.digitalmed.co.il'
    }
  ];

  sampleClinics.forEach((clinic, index) => {
    db.run(
      'INSERT INTO clinics (name, image_url, rating, distance, price_range, features, address, phone, email, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [clinic.name, clinic.image_url, clinic.rating, clinic.distance, clinic.price_range, clinic.features, clinic.address, clinic.phone, clinic.email, clinic.website],
      function(err) {
        if (err) {
          console.error(`❌ Error adding clinic ${clinic.name}:`, err.message);
        } else {
          console.log(`✅ Clinic ${clinic.name} added with ID: ${this.lastID}`);
        }
      }
    );
  });

  const sampleServices = [
    { name: 'בדיקה כללית', description: 'בדיקה רפואית מקיפה', price_range: '₪200-₪300', duration_minutes: 30, is_urgent: 0, category: 'general', icon: 'bi-heart-pulse' },
    { name: 'צילום רנטגן', description: 'צילום רנטגן לאבחון', price_range: '₪150-₪250', duration_minutes: 15, is_urgent: 0, category: 'imaging', icon: 'bi-camera' },
    { name: 'טיפול דחוף', description: 'טיפול רפואי דחוף', price_range: '₪300-₪500', duration_minutes: 45, is_urgent: 1, category: 'emergency', icon: 'bi-ambulance' }
  ];

  sampleServices.forEach((service, index) => {
    db.run(
      'INSERT INTO services (name, description, price_range, duration_minutes, is_urgent, category, icon) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [service.name, service.description, service.price_range, service.duration_minutes, service.is_urgent, service.category, service.icon],
      function(err) {
        if (err) {
          console.error(`❌ Error adding service ${service.name}:`, err.message);
        } else {
          console.log(`✅ Service ${service.name} added with ID: ${this.lastID}`);
        }
      }
    );
  });

  console.log('🎉 Secure database initialization completed!');
  console.log('\n🔐 Secure login credentials:');
  console.log('👤 Admin: admin@quickmed.com / Admin123!@#');
  console.log('👨‍⚕️ Doctor: doctor@quickmed.com / Doctor123!@#');
  console.log('👤 Patient: patient@quickmed.com / Patient123!@#');
  console.log('🧪 Test: test@example.com / Test123!@#');
  console.log('\n⚠️  IMPORTANT: Change these passwords in production!');
  
  db.close();
}
