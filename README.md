# 🏙️ UrbanCove – Property Booking Web Application

 Welcome to the source code of UrbanCove, a full-stack property booking web application that allows users to explore, list, and manage rental properties with secure authentication and image uploads. The project is built using Node.js, Express, MongoDB, and EJS, following the MVC architecture for scalability and maintainability.

# 🌐 Live Demo
    
    ( https://urbancove-project.onrender.com )


# 📦 Project Structure
    UrbanCove/
    ├── controllers/          # Application logic
    ├── models/               # MongoDB schemas (Mongoose)
    ├── routes/               # Express route handlers
    ├── views/                # EJS templates
    │   ├── layouts/
    │   ├── listings/
    │   ├── users/
    │   └── includes/
    ├── public/               # Static assets (CSS, JS, images)
    ├── utils/                # Helper utilities & custom errors
    ├── uploads/              # Uploaded images (local dev)
    ├── .env                  # Environment variables (ignored)
    ├── app.js                # Main server file
    ├── package.json
    └── README.md

# 🚀 Features

# 🏠 Property Listings – Create, read, update, and delete property listings

# 🔐 Authentication & Authorization – Secure login/signup using Passport.js

# 🖼️ Image Uploads – Upload and manage property images using Cloudinary & Multer

# 📍 Map Integration – Location display using Mapbox

# 📅 Booking Management – Date-based booking with conflict prevention

# 💬 Flash Messages – Success and error feedback for better UX

# 🧱 MVC Architecture – Clean separation of concerns

# 📱 Responsive UI – Styled with Bootstrap

# 🔒 Environment Security – Sensitive data protected via .env

# 🛠️ Tech Stack

# Backend

    . Node.js
    . Express.js

# Frontend

    . EJS (Embedded JavaScript Templates)
    . HTML5, CSS3, JavaScript
    . Bootstrap

# Database
    
    . MongoDB
    . Mongoose

# Authentication & Storage

    . Passport.js
    . Cloudinary
    . Multer

# Other Tools

    . Mapbox
    . Express Session
    . Connect-Mongo

# 🧩 Getting Started (Local Development)

    Prerequisites
    . Node.js (v16+ recommended)
    . npm
    . MongoDB (local or Atlas)

# Setup
    . Install dependencies 
    . Create a .env file and add required environment variables. 
    . Start the server

# 📚 Key Files & Folders

    . controllers/ – Business logic for listings, users, and reviews
    . models/ – MongoDB schemas
    . routes/ – Express routing
    . views/ – EJS templates and layouts
    . public/ – Static assets (CSS, JS)
    . utils/ – Custom error handling and helper
    . app.js – Application entry point

# 📝 Best Practices Followed

    . MVC design pattern
    . Secure password handling
    . Environment variables for sensitive data
    . Clean and modular routing
    . Cloud-based image storage
    . Error handling with custom middleware

# 🙋 FAQ

    Q: Why is .env missing from GitHub?
    A: For security reasons, environment variables are not committed.
    
    Q: Can I deploy this project?
    A: Yes! It can be deployed on platforms like Render, Railway, or Heroku.
    
    Q: Does this support image uploads?
    A: Yes, using Cloudinary and Multer.

# 👨‍💻 Author

    Amarjeet
    Full-Stack Developer
    GitHub: (https://github.com/Amarjeet778/UrbanCove-project)

