# QuickMed - Medical Appointment Booking System

A modern web application for booking medical appointments with healthcare providers.

## Features

-  **Secure Authentication** - User registration and login system
-  **Appointment Booking** - Easy appointment scheduling with healthcare providers
-  **Clinic Management** - Browse and select from various medical clinics
-  **Service Categories** - Different medical services and treatments
-  **Responsive Design** - Works on desktop, tablet, and mobile devices
-  **Smart Notifications** - Appointment reminders and updates
-  **User Settings** - Customizable preferences and notifications

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Icons:** Bootstrap Icons

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/QuickMed.git
   cd QuickMed
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize the database:**
   ```bash
   node init-db.js
   ```

4. **Start the server:**
   ```bash
   node server/app.js
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
QuickMed/
├── public/                 # Frontend files
│   ├── index.html         # Homepage
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── homepage.html      # Dashboard
│   └── ...               # Other pages
├── server/                # Backend files
│   ├── app.js            # Main server file
│   └── db.js             # Database connection
├── schema.sql            # Database schema
├── init-db.js           # Database initialization
└── package.json         # Project dependencies
```

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `GET /api/clinics` - Get all clinics
- `GET /api/services` - Get all services
- `GET /api/available-slots` - Get available appointment slots
- `POST /api/appointments` - Book an appointment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

