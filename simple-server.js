const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./server/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production-12345';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Simple login route without validation
app.post("/api/login", (req, res) => {
  console.log('Login request received:', req.body);
  
  const { username, password } = req.body;
  const email = username;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  
  console.log('Looking for user:', email);
  
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      console.error("DB error during login:", err);
      return res.status(500).json({ message: "Database error" });
    }
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    console.log('User found, checking password...');
    
    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Password check error" });
      }
      
      if (!isMatch) {
        console.log('Password mismatch');
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      console.log('Login successful for:', email);
      
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({ 
        message: "Login successful", 
        user: { id: user.id, username: user.username, email: user.email },
        token: token
      });
    });
  });
});

// Simple register route
app.post("/api/register", (req, res) => {
  console.log('Register request received:', req.body);
  
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  
  // Check if user exists
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, existingUser) => {
    if (err) {
      console.error("DB error checking existing user:", err);
      return res.status(500).json({ message: "Database error" });
    }
    
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    
    // Hash password
    bcrypt.hash(password, 12, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Password hashing error" });
      }
      
      // Create user
      db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        function(err) {
          if (err) {
            console.error("DB error creating user:", err);
            return res.status(500).json({ message: "User creation error" });
          }
          
          console.log('User created successfully:', username);
          
          // Create JWT token
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

// Start server
app.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
  console.log('✅ Connected to SQLite database');
});
