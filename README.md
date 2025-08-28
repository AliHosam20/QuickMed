# QuickMed - Medical Appointment Management System

## Project Description
QuickMed is an advanced medical appointment management system that allows patients to book appointments at medical clinics quickly and conveniently.

## Main Features
- 📅 Medical appointment booking
- 🏥 Medical clinic management
- 👥 User and patient management
- 📱 Modern and user-friendly interface
- 🗄️ SQLite database
- 🌐 Node.js server with Express

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

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Bootstrap 5, Custom CSS
- **Version Control:** Git, GitHub

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
✅ User registration and login system  
✅ User profile management  
✅ Medical clinic management  
✅ Appointment booking system  
✅ Admin interface for system management  
✅ SQLite database with complete tables  
✅ API endpoints for dynamic data  
✅ Modern and user-friendly design  
✅ Hebrew language support  
✅ Removal of all fake data and replacement with real values  

## Important Notes
- All data displayed in the system comes from the real database
- No more fake or hardcoded data in the system
- The system displays 0 or "Contact clinic" when no data is available
- All statistics update in real-time

## Links
- **GitHub Repository:** https://github.com/AliHosam20/QuickMed
- **Demo:** http://localhost:3000 (after starting the server)

---
**Developed by:** Hosam Ali + Shada Habiballah  
**Creation Date:** July-August 2025
**Current Status:** In development until end of September 2025

