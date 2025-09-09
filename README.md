# QuickMed - Medical Appointment Management System

## Project Description
QuickMed is an advanced medical appointment management system that allows patients to book appointments at medical clinics quickly and conveniently.

## Main Features
-  Medical appointment booking
-  Medical clinic management
-  User and patient management
-  Modern and user-friendly interface
-  SQLite database
-  Node.js server with Express

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

## Installation and Setup

### Prerequisites
- Node.js (version 14 and above)
- npm

### Installation
```bash
# Clone the project
git clone https://github.com/AliHosam20/QuickMed.git
cd QuickMed

# Install dependencies
npm install

# Create database
node init-db.js

# Start server
npm start
```

### Access the System
The system will be available at: `http://localhost:3000`

## Project Structure
```
QuickMed/
├── public/                 # Frontend files
│   ├── index.html         # Homepage
│   ├── Admin.html         # Admin page
│   ├── ClinicProfile.html # Clinic profile
│   ├── profile.html       # User profile
│   ├── available_results.html # Search results
│   ├── settings.html      # Settings
│   ├── support.html       # Support
│   └── ...               # Additional pages
├── server/                # Backend files
│   ├── app.js            # Express server
│   └── database.js       # Database management
├── schema.sql            # Database schema
├── init-db.js            # Database initialization script
└── package.json          # Project configuration
```

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

## Links
- **GitHub Repository:** https://github.com/AliHosam20/QuickMed
- **Demo:** http://localhost:3000 (after starting the server)

---
**Developed by:** Hosam Ali + Shada Habiballah  
**Creation Date:** July-August 2025
**Current Status:** In development until end of January 2025

