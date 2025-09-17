# 🏥 QuickMed - Medical Appointment Management System

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-green" alt="Node.js Express">
  <img src="https://img.shields.io/badge/Database-SQLite-blue" alt="SQLite">
  <img src="https://img.shields.io/badge/Frontend-HTML5%20CSS3%20JS-orange" alt="Frontend">
  <img src="https://img.shields.io/badge/Security-JWT%20bcrypt-red" alt="Security">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status">
</div>

## 📋 Project Description
QuickMed is a comprehensive, production-ready medical appointment management system designed to revolutionize how patients book and manage their medical appointments. Built with modern web technologies, it provides a seamless, secure, and user-friendly experience for both patients and healthcare providers.

## ✨ Key Features

### 🔐 **Advanced Security**
- JWT-based authentication system
- bcrypt password encryption
- Content Security Policy (CSP) compliance
- SQL injection prevention
- XSS and CSRF protection

### 🏥 **Smart Clinic Management**
- **12 Active Clinics** with comprehensive profiles
- Real-time clinic search and filtering
- Professional clinic profiles with images
- Service-based categorization (Dental, Imaging, General, Emergency, Cardiology, Orthopedic)

### 📅 **Intelligent Appointment Booking**
- **Pre-filled Forms** - Clinic and service details automatically populated
- **3-Step Process** - Streamlined booking experience
- **Real-time Availability** - Live appointment scheduling
- **Smart Confirmation** - Professional success messaging

### 👤 **User Experience**
- **Responsive Design** - Works perfectly on all devices
- **Multi-language Support** - Hebrew and English
- **Professional UI/UX** - Modern gradients and animations
- **Real-time Updates** - Dynamic data synchronization

### 📊 **Admin Dashboard**
- Real-time statistics and analytics
- User and appointment management
- System monitoring and oversight
- Comprehensive reporting tools

## Weekly Progress Report

### Week 1 (17/7/2025)
**Status:** Did not start work
**Notes:** I was unsure which topic to choose for the project

### Week 2 (24/7/2025)
**Status:** Started writing the idea
**Work Completed:**
- Defined the idea: fast medical appointment booking system
- Project planning and architecture
- Technology selection: Node.js, Express, SQLite, HTML/CSS/JavaScript

### Week 3 (31/7/2025)
**Status:** Basic project development
**Work Completed:**
- Created basic project structure
- Defined package.json with required dependencies
- Created basic Express server
- Set up SQLite database
- Created database schema (schema.sql)

### Week 4 (7/8/2025)
**Status:** User interface development
**Work Completed:**
- Created homepage (index.html)
- Developed registration page (register.html)
- Developed login page (login.html)
- Basic CSS design with Bootstrap
- Created user profile page (profile.html)

### Week 5 (14/8/2025)
**Status:** Advanced features development
**Work Completed:**
- Created admin page (Admin.html)
- Developed clinic page (ClinicProfile.html)
- Created available results page (available_results.html)
- Developed settings page (settings.html)
- Created support page (support.html)
- Added notifications page (notifications.html)

### Week 6 (21/8/2025)
**Status:** System improvement and fake data removal
**Work Completed:**
- Identified problem: pages displayed fake data (15,000+ users, 50K+ patients)
- Created new API endpoints for real data counting:
  - `/api/users/count` - user count
  - `/api/clinics/count` - clinic count
  - `/api/appointments/today/count` - today's appointments count
  - `/api/appointments/count` - total appointments count
- Updated all pages to display dynamic data instead of fake data
- Replaced all hardcoded data with real values or appropriate defaults

### Week 7 (28/8/2025 - End of September 2025)
**Status:** Project completion and GitHub upload
**Work Completed:**
- Comprehensive scan of all files to identify additional fake data
- Final update of all pages:
  - Admin.html - dynamic statistics
  - ClinicProfile.html - generic clinic information
  - profile.html - empty user profile
  - available_results.html - generic search results
  - index.html - dynamic statistics on homepage
  - support.html - generic support details
  - settings.html - updated settings
- Created database initialization script (init-db.js)
- System validation testing
- Final upload of all changes to GitHub

### Week 8 (December 2024 - January 2025) - Major UI/UX Improvements
**Status:** Enhanced user experience and professional design
**Work Completed:**
- **Homepage Redesign:**
  - Replaced "Find Clinics" card with "My Appointments" card
  - Implemented real-time appointment display from database
  - Enhanced card design with gradients and professional styling
  - Fixed card sizing to ensure uniform height (450px)
  - Added smooth hover animations and visual effects
  - Improved typography and spacing

- **ClinicProfile.html Enhancement:**
  - Redesigned as clinic search and browsing page
  - Enhanced service option cards with improved icons and styling
  - Added professional hover effects and animations
  - Improved visual hierarchy and user experience
  - Fixed icon display issues for all 4 service types

- **Phone Service Integration:**
  - Implemented professional modal system for phone service unavailable
  - Replaced all phone numbers with "Contact Support" messaging
  - Added alternative contact options (online booking, live chat, email)
  - Consistent user experience across all pages

- **Technical Improvements:**
  - Enhanced CSS with modern design patterns
  - Improved responsive design
  - Added cache-busting mechanisms
  - Fixed JavaScript errors and improved performance
  - Professional gradient effects and animations

### Week 9 (January 2025) - Advanced Booking System & UI Polish
**Status:** Complete booking system overhaul and final UI improvements
**Work Completed:**

- **Smart Appointment Booking Flow:**
  - Implemented pre-filled appointment forms from clinic selection
  - Clinic and service details automatically populated from previous page
  - Eliminated redundant form fields for better user experience
  - Added visual indicators for pre-filled information
  - Streamlined booking process to 3 simple steps

- **Appointment Confirmation System:**
  - Redesigned confirmation page with professional success messaging
  - Added clear navigation to "My Appointments" and "Dashboard"
  - Implemented fallback system for appointment data display
  - Enhanced error handling and user feedback

- **Database Integration Fixes:**
  - Fixed service name mapping between frontend and database
  - Updated all service names to match database entries exactly
  - Resolved 400 Bad Request errors in appointment booking
  - Added comprehensive API endpoint for specific appointment retrieval

- **Homepage Card Improvements:**
  - Removed feature lists from main action cards
  - Enlarged buttons with custom btn-xl styling (60px height)
  - Improved card symmetry and space utilization
  - Enhanced mobile responsiveness with adjusted button sizes
  - Added professional hover effects and animations

- **Admin Panel Updates:**
  - Updated clinic count display to show accurate number (12)
  - Fixed dynamic statistics loading
  - Enhanced admin interface with real-time data

- **Content Security Policy (CSP) Fixes:**
  - Resolved all inline event handler violations
  - Converted onclick attributes to proper event listeners
  - Fixed CSP compliance across all pages
  - Enhanced security while maintaining functionality

- **Image Management:**
  - Implemented random distribution of 7 clinic images across 12 profiles
  - Each image appears twice for balanced visual variety
  - Updated all clinic profiles with proper image assignments
  - Enhanced visual consistency across the platform

- **Real-time Data Integration:**
  - Fixed appointment count display on homepage
  - Implemented accurate "Upcoming Appointments" and "Completed Visits" counting
  - Added dynamic "Health Score" calculation based on appointment completion
  - Enhanced dashboard statistics with real database data

- **Technical Optimizations:**
  - Improved error handling throughout the application
  - Enhanced API response handling and validation
  - Added comprehensive logging for debugging
  - Optimized database queries for better performance
  - Fixed all JavaScript console errors

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Bootstrap 5, Custom CSS
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt password hashing, helmet.js
- **Version Control:** Git, GitHub

## Security Features
🔐 **Authentication & Authorization:**
- JWT token-based authentication system
- Secure password hashing with bcrypt
- Session management and token validation
- Protected API endpoints with middleware
- User role-based access control

🛡️ **Data Protection:**
- SQL injection prevention
- XSS (Cross-Site Scripting) protection
- CSRF (Cross-Site Request Forgery) protection
- Content Security Policy (CSP) headers
- Secure HTTP headers with helmet.js

🔒 **Login & Registration Security:**
- Password strength validation
- Duplicate user prevention
- Secure token generation and storage
- Automatic session timeout

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

### 🎯 First Time Setup
1. Register a new account
2. Explore the clinic directory
3. Book your first appointment
4. Check the admin panel (if you have admin access)

### 📱 Mobile Access
The application is fully responsive and works seamlessly on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

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
│   ├── 🎨 images/                # Clinic images (7 professional photos)
│   └── 📱 ...                    # Additional pages
├── 📁 server/                    # Backend Application
│   ├── 🚀 app.js                 # Express server & API endpoints
│   ├── 🗄️ db.js                  # Database connection
│   └── 📊 medical_clinics.db     # SQLite database
├── 📄 schema.sql                 # Database schema
├── 🔧 init-db.js                 # Database initialization
├── 📦 package.json               # Dependencies & scripts
├── 📚 README.md                  # Project documentation
└── 📋 FINAL_SUMMARY.md           # Comprehensive project summary
```

### 🗂️ Key Files Explained
- **`server/app.js`** - Main server file with all API endpoints
- **`public/homepage.html`** - User dashboard with real-time data
- **`public/book-appointment.html`** - Smart booking system
- **`public/ClinicProfile.html`** - 12 clinic profiles with images
- **`quickmed.db`** - SQLite database with all data

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

### 🛠️ **Services**
- `GET /api/services` - Get all services
- `GET /api/available-slots` - Get available time slots

## 🎯 Demo & Screenshots

### 🏠 **Homepage Dashboard**
- Real-time appointment statistics
- Quick access to booking and management
- Professional card-based layout

### 🏥 **Clinic Search & Profiles**
- Browse 12 professional clinics
- Filter by service type
- Detailed clinic information with images

### 📅 **Smart Booking System**
- Pre-filled forms for seamless experience
- 3-step booking process
- Real-time availability checking

### 👤 **User Management**
- Secure registration and login
- Personal appointment dashboard
- Profile management

## Main Features Completed

### 🔐 **Authentication & Security**
✅ Secure user registration with validation  
✅ JWT token-based login system  
✅ Password encryption with bcrypt  
✅ Session management and token validation  
✅ Protected API endpoints  
✅ XSS and CSRF protection  
✅ Content Security Policy (CSP)  
✅ SQL injection prevention  

### 👤 **User Management**
✅ User profile management  
✅ Role-based access control  
✅ Secure data storage  
✅ Password strength validation  
✅ Email format validation  
✅ Duplicate user prevention  

### 🏥 **Medical System**
✅ Medical clinic management  
✅ Appointment booking system  
✅ Real-time appointment display  
✅ Clinic search and browsing  
✅ Admin interface for system management  

### 🎨 **User Experience**
✅ Modern and user-friendly design  
✅ Professional UI/UX with animations  
✅ Responsive mobile design  
✅ Phone service integration with modal system  
✅ Real-time data updates  

### 🛠 **Technical Features**
✅ SQLite database with complete tables  
✅ API endpoints for dynamic data  
✅ Removal of all fake data  
✅ Enhanced clinic browsing functionality  
✅ Advanced security features  

## Login & Registration Features

### 🔐 **Secure Registration Process**
- **Email Validation:** Real-time email format checking
- **Password Strength:** Minimum 8 characters with complexity requirements
- **Duplicate Prevention:** Automatic check for existing users
- **Data Validation:** Server-side and client-side validation
- **Success Feedback:** Clear confirmation messages

### 🔑 **Advanced Login System**
- **JWT Tokens:** Secure token-based authentication
- **Password Hashing:** bcrypt encryption for password storage
- **Session Management:** Automatic token validation and refresh
- **Error Handling:** User-friendly error messages
- **Remember Me:** Optional persistent login

### 🛡️ **Security Measures**
- **Token Expiration:** Automatic session timeout
- **Secure Headers:** Helmet.js for HTTP security
- **Input Sanitization:** Protection against malicious input
- **Rate Limiting:** Protection against brute force attacks
- **CORS Protection:** Cross-origin request security

## Future Development Ideas
🚀 **Video Call Integration:**
- Real-time video consultations with doctors
- Screen sharing for medical records
- Recording capabilities for follow-up
- Integration with existing appointment system

🏥 **Clinic Management Dashboard:**
- Advanced clinic approval system
- Real-time appointment management
- Patient communication tools
- Revenue tracking and analytics
- Staff scheduling and management




## Security Implementation Details

### 🔐 **Authentication Flow**
1. **User Registration:**
   - Email validation and uniqueness check
   - Password hashing with bcrypt (salt rounds: 10)
   - JWT token generation upon successful registration
   - Automatic login after registration

2. **User Login:**
   - Email/password validation
   - Password comparison with hashed stored password
   - JWT token generation with expiration (24 hours)
   - Token storage in localStorage for session persistence

3. **Protected Routes:**
   - Middleware authentication for all protected endpoints
   - Token validation on each request
   - Automatic redirect to login for expired/invalid tokens

### 🛡️ **Security Headers**
- **Helmet.js** implementation for security headers
- **Content Security Policy (CSP)** to prevent XSS attacks
- **X-Frame-Options** to prevent clickjacking
- **X-Content-Type-Options** to prevent MIME sniffing
- **Strict-Transport-Security** for HTTPS enforcement

### 🔒 **Data Protection**
- **SQL Injection Prevention:** Parameterized queries
- **XSS Protection:** Input sanitization and output encoding
- **CSRF Protection:** Token-based request validation
- **Password Security:** bcrypt hashing with salt
- **Session Security:** JWT tokens with expiration

## Important Notes
- All data displayed in the system comes from the real database
- No more fake or hardcoded data in the system
- The system displays 0 or "Contact clinic" when no data is available
- All statistics update in real-time
- All user data is encrypted and securely stored
- JWT tokens automatically expire for security

## 🏆 Project Achievements

### ✅ **100% Feature Complete**
- All planned features implemented and tested
- Production-ready codebase
- Comprehensive error handling
- Full security compliance

### 🎨 **Professional UI/UX**
- Modern, responsive design
- Smooth animations and transitions
- Intuitive user experience
- Mobile-first approach

### 🔒 **Enterprise-Grade Security**
- JWT authentication
- Password encryption
- SQL injection prevention
- XSS and CSRF protection

### 📊 **Real-time Data Integration**
- Dynamic statistics
- Live appointment updates
- Real-time clinic information
- Accurate health scoring

## 🔗 Links & Resources

- **🌐 GitHub Repository:** [https://github.com/AliHosam20/QuickMed](https://github.com/AliHosam20/QuickMed)
- **🚀 Live Demo:** [http://localhost:3000](http://localhost:3000) (after starting the server)
- **📋 Full Documentation:** See `FINAL_SUMMARY.md` for comprehensive details
- **🛠️ API Documentation:** All endpoints documented above

## 👥 Development Team

| Role | Name | Contribution |
|------|------|-------------|
| **Lead Developer** | Hosam Ali | Full-stack development, UI/UX design |
| **Co-developer** | Shada Habiballah | Backend development, database design |

## 📅 Project Timeline

- **📅 Start Date:** July 2025
- **📅 Completion Date:** January 2025
- **📅 Status:** ✅ **Production Ready**
- **🔄 Maintenance:** Ongoing enhancements and updates

---

<div align="center">
  <h3>🚀 Ready to revolutionize medical appointment booking!</h3>
  <p><strong>QuickMed</strong> - Where technology meets healthcare</p>
</div>

