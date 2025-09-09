const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'quickmed.db');
const db = new sqlite3.Database(dbPath);

// נתונים לדוגמה
const sampleUsers = [
  { username: 'admin', email: 'admin@quickmed.com', password: 'admin123' },
  { username: 'doctor1', email: 'doctor@quickmed.com', password: 'doctor123' },
  { username: 'patient1', email: 'patient@quickmed.com', password: 'patient123' }
];

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

const sampleServices = [
  { name: 'בדיקה כללית', description: 'בדיקה רפואית מקיפה', price_range: '₪200-₪300', duration_minutes: 30, is_urgent: 0, category: 'general', icon: 'bi-heart-pulse' },
  { name: 'צילום רנטגן', description: 'צילום רנטגן לאבחון', price_range: '₪150-₪250', duration_minutes: 15, is_urgent: 0, category: 'imaging', icon: 'bi-camera' },
  { name: 'טיפול דחוף', description: 'טיפול רפואי דחוף', price_range: '₪300-₪500', duration_minutes: 45, is_urgent: 1, category: 'emergency', icon: 'bi-ambulance' },
  { name: 'ייעוץ פסיכולוגי', description: 'ייעוץ וטיפול פסיכולוגי', price_range: '₪250-₪400', duration_minutes: 50, is_urgent: 0, category: 'mental_health', icon: 'bi-person-heart' }
];

// הוספת משתמשים
console.log('🌱 Adding sample users...');
sampleUsers.forEach((user, index) => {
  db.run(
    'INSERT OR IGNORE INTO users (username, email, password) VALUES (?, ?, ?)',
    [user.username, user.email, user.password],
    function(err) {
      if (err) {
        console.error(`❌ Error adding user ${user.username}:`, err.message);
      } else {
        console.log(`✅ User ${user.username} added with ID: ${this.lastID}`);
      }
      
      if (index === sampleUsers.length - 1) {
        addClinics();
      }
    }
  );
});

// הוספת קליניקות
function addClinics() {
  console.log('🏥 Adding sample clinics...');
  sampleClinics.forEach((clinic, index) => {
    db.run(
      'INSERT OR IGNORE INTO clinics (name, image_url, rating, distance, price_range, features, address, phone, email, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [clinic.name, clinic.image_url, clinic.rating, clinic.distance, clinic.price_range, clinic.features, clinic.address, clinic.phone, clinic.email, clinic.website],
      function(err) {
        if (err) {
          console.error(`❌ Error adding clinic ${clinic.name}:`, err.message);
        } else {
          console.log(`✅ Clinic ${clinic.name} added with ID: ${this.lastID}`);
        }
        
        if (index === sampleClinics.length - 1) {
          addServices();
        }
      }
    );
  });
}

// הוספת שירותים
function addServices() {
  console.log('🔧 Adding sample services...');
  sampleServices.forEach((service, index) => {
    db.run(
      'INSERT OR IGNORE INTO services (name, description, price_range, duration_minutes, is_urgent, category, icon) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [service.name, service.description, service.price_range, service.duration_minutes, service.is_urgent, service.category, service.icon],
      function(err) {
        if (err) {
          console.error(`❌ Error adding service ${service.name}:`, err.message);
        } else {
          console.log(`✅ Service ${service.name} added with ID: ${this.lastID}`);
        }
        
        if (index === sampleServices.length - 1) {
          addSampleSlots();
        }
      }
    );
  });
}

// הוספת תורים לדוגמה
function addSampleSlots() {
  console.log('📅 Adding sample appointment slots...');
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const slots = [
    { clinic_id: 1, service_id: 1, date: tomorrow.toISOString().split('T')[0], time: '09:00' },
    { clinic_id: 1, service_id: 2, date: tomorrow.toISOString().split('T')[0], time: '10:30' },
    { clinic_id: 2, service_id: 1, date: tomorrow.toISOString().split('T')[0], time: '14:00' },
    { clinic_id: 2, service_id: 3, date: tomorrow.toISOString().split('T')[0], time: '16:00' }
  ];
  
  slots.forEach((slot, index) => {
    db.run(
      'INSERT OR IGNORE INTO available_slots (clinic_id, service_id, date, time, is_available) VALUES (?, ?, ?, ?, ?)',
      [slot.clinic_id, slot.service_id, slot.date, slot.time, 1],
      function(err) {
        if (err) {
          console.error(`❌ Error adding slot:`, err.message);
        } else {
          console.log(`✅ Slot added for clinic ${slot.clinic_id} at ${slot.time}`);
        }
        
        if (index === slots.length - 1) {
          console.log('🎉 Database seeding completed!');
          console.log('\n📋 Sample login credentials:');
          console.log('👤 Admin: admin@quickmed.com / admin123');
          console.log('👨‍⚕️ Doctor: doctor@quickmed.com / doctor123');
          console.log('👤 Patient: patient@quickmed.com / patient123');
          console.log('🧪 Test: test@example.com / password123');
          db.close();
        }
      }
    );
  });
}

console.log('🚀 Starting database seeding...');
