# 🏥 QuickMed - Medical Appointment Management System

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-green" alt="Node.js Express">
  <img src="https://img.shields.io/badge/Database-SQLite-blue" alt="SQLite">
  <img src="https://img.shields.io/badge/Frontend-HTML5%20CSS3%20JS-orange" alt="Frontend">
  <img src="https://img.shields.io/badge/Security-JWT%20bcrypt-red" alt="Security">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
</div>

## 📋 Project Description
QuickMed is a comprehensive medical appointment management system that allows patients to book and manage medical appointments seamlessly. Built with modern web technologies, it provides a secure and user-friendly experience for both patients and healthcare providers.

## ✨ Key Features

### 🔐 **Security & Authentication**
- JWT-based authentication system
- bcrypt password encryption
- Content Security Policy (CSP) compliance
- SQL injection prevention
- XSS and CSRF protection

### 🏥 **Clinic Management**
- **12 Active Clinics** with comprehensive profiles
- Real-time clinic search and filtering
- Professional clinic profiles with images
- Service-based categorization (Dental, Imaging, General, Emergency, Cardiology, Orthopedic)

### 📅 **Smart Appointment Booking**
- **Pre-filled Forms** - Clinic and service details automatically populated
- **3-Step Process** - Streamlined booking experience
- **Real-time Availability** - Live appointment scheduling
- **Smart Confirmation** - Professional success messaging

### 👤 **User Experience**
- **Responsive Design** - Works on all devices
- **Professional UI/UX** - Modern gradients and animations
- **Real-time Updates** - Dynamic data synchronization

### 📊 **Admin Dashboard**
- Real-time statistics and analytics
- User and appointment management
- System monitoring and oversight

## 📅 Development Timeline

### **Phase 1: Foundation 
- Project planning and architecture
- Basic project structure setup
- Database schema design
- User interface development

### **Phase 2: Core Features 
- Authentication system implementation
- Appointment booking functionality
- Admin dashboard development
- Database integration and API endpoints

### **Phase 3: UI/UX Enhancement 
- Homepage redesign with real-time data
- Clinic profile enhancement
- Phone service integration with modal system
- Professional styling and animations

### **Phase 4: Advanced Features 
- Smart booking flow with pre-filled forms
- Appointment confirmation system
- Database integration fixes
- Content Security Policy compliance
- Image management and distribution
- Real-time data integration

## 📊 Weekly Progress Report

### **Week 1 (17/7/2025)**
**Status:** Project planning
**Work:** Defined project idea and technology stack

### **Week 2 (24/7/2025)**
**Status:** Basic development
**Work:** Created project structure, Express server, SQLite database

### **Week 3 (31/7/2025)**
**Status:** UI development
**Work:** Built homepage, registration, login, and profile pages

### **Week 4 (7/8/2025)**
**Status:** Advanced features
**Work:** Created admin panel, clinic profiles, and support pages

### **Week 5 (14/8/2025)**
**Status:** System improvement
**Work:** Fixed fake data issues, added real API endpoints

### **Week 6 (21/8/2025)**
**Status:** Data integration
**Work:** Replaced all hardcoded data with dynamic database content

### **Week 7 (28/8/2025)**
**Status:** Project completion
**Work:** Final testing, validation, and GitHub upload

### **Week 8 (December 2024)**
**Status:** UI/UX enhancement
**Work:** Homepage redesign, clinic profiles, phone service integration

### **Week 9 (January 2025)**
**Status:** Advanced features
**Work:** Smart booking flow, CSP fixes, image management, real-time data

## 🛠️ Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Bootstrap 5, Custom CSS
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt password hashing, helmet.js

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AliHosam20/QuickMed.git
   cd QuickMed
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize Database**
   ```bash
   node init-db.js
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Access the Application**
   Open your browser and navigate to: `http://localhost:3000`

## 📁 Project Structure
```
QuickMed/
├── 📁 public/                    # Frontend Application
│   ├── 🏠 index.html             # Landing page
│   ├── 🏠 homepage.html          # User dashboard
│   ├── 🔐 login.html             # User authentication
│   ├── 📝 register.html          # User registration
│   ├── 🏥 Available.html         # Clinic search
│   ├── 🏥 ClinicProfile.html     # Individual clinic profiles
│   ├── 📅 book-appointment.html  # Appointment booking
│   ├── 📅 my-appointments.html   # User appointments
│   ├── 👤 profile.html           # User profile
│   ├── ⚙️ Admin.html             # Admin dashboard
│   └── 🎨 images/                # Clinic images
├── 📁 server/                    # Backend Application
│   ├── 🚀 app.js                 # Express server & API endpoints
│   ├── 🗄️ db.js                  # Database connection
│   └── 📊 medical_clinics.db     # SQLite database
├── 📄 schema.sql                 # Database schema
├── 🔧 init-db.js                 # Database initialization
├── 📦 package.json               # Dependencies & scripts
└── 📚 README.md                  # Project documentation
```

## 🔌 API Endpoints

### 🔐 **Authentication**
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/users/count` - Get user count

### 🏥 **Clinics**
- `GET /api/clinics` - Get all clinics
- `GET /api/clinics/:id` - Get specific clinic
- `GET /api/clinics/count` - Get clinic count

### 📅 **Appointments**
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Get specific appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/count` - Get appointment count
- `GET /api/appointments/today/count` - Get today's appointments



## 🎯 Key Features Completed

### ✅ **Authentication & Security**
- JWT token-based authentication
- Password encryption with bcrypt
- Content Security Policy (CSP) compliance
- SQL injection prevention
- XSS and CSRF protection

### ✅ **User Management**
- Secure registration and login
- User profile management
- Role-based access control
- Password strength validation

### ✅ **Medical System**
- 12 professional clinic profiles
- Smart appointment booking system
- Real-time appointment display
- Admin dashboard with statistics

### ✅ **User Experience**
- Responsive design for all devices
- Professional UI/UX with animations
- Multi-language support (Hebrew/English)
- Real-time data updates

## 🔗 Links & Resources

- **🌐 GitHub Repository:** [https://github.com/AliHosam20/QuickMed](https://github.com/AliHosam20/QuickMed)
- **🚀 Live Demo:** [http://localhost:3000](http://localhost:3000) (after starting the server)

## 👥 Development Team

| Role | Name 
|------|------
| **Lead Developer** | Hosam Ali 
| **Co-developer** | Shada Habiballah 

## 📅 Project Timeline

- **📅 Start Date:** July 2025
- **📅 Completion Date:** September 2025
- **📅 Status:** ✅ **Production Ready**

---

<div align="center">
  <h3>🚀 Ready to revolutionize medical appointment booking!</h3>
  <p><strong>QuickMed</strong> - Where technology meets healthcare</p>
</div>

