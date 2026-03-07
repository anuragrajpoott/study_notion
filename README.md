# 📚 StudyNotion - EdTech Platform

![Main Page](images/mainpage.png)

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

StudyNotion is a **full-stack EdTech platform** built with the **MERN stack** that allows users to create, consume, and review educational content.  
The platform provides a seamless learning experience for students and enables instructors to create and manage courses efficiently.

---

# 🚀 Live Demo

🔗 Live Website:  
```
https://your-live-link.com
```

---

# ✨ Features

## 👨‍🎓 Student Features

- Browse all available courses
- Add courses to wishlist
- Purchase courses with Razorpay
- Watch course videos
- View enrolled courses
- Rate and review courses
- Update profile information

---

## 👨‍🏫 Instructor Features

- Create and manage courses
- Upload videos and course materials
- Track course performance
- View analytics and insights
- Edit instructor profile

---

## 🔐 Authentication Features

- Secure signup and login
- JWT authentication
- OTP email verification
- Forgot password functionality

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Redux
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt

## Database

- MongoDB
- Mongoose

## Other Tools

- Cloudinary (Media storage)
- Razorpay (Payment integration)
- Markdown (Content formatting)

---

# 🏗️ System Architecture

StudyNotion follows a **client-server architecture**.

- **Frontend** → React.js
- **Backend** → Node.js + Express.js
- **Database** → MongoDB
- **Media Storage** → Cloudinary
- **Payments** → Razorpay

### Architecture Diagram

![Architecture](images/architecture.png)

---

# 🗂️ Project Structure

```
StudyNotion
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── services
│   │   └── App.js
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
├── images
├── README.md
└── package.json
```

---

# 📸 Screenshots

### Homepage

![Main Page](images/mainpage.png)

### Course Page

![Course Page](images/coursepage.png)

### Dashboard

![Dashboard](images/dashboard.png)

---

# 🔌 API Design

The backend APIs follow the **REST architecture style**.

| Method | Description |
|------|-------------|
| GET | Fetch data |
| POST | Create data |
| PUT | Update data |
| DELETE | Remove data |

Example API endpoints:

```
POST /api/auth/signup
POST /api/auth/login
GET /api/courses
POST /api/course/create
```

---

# ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/studynotion.git
```

### 2️⃣ Navigate to the Project Folder

```bash
cd studynotion
```

### 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔧 Configuration

Create a `.env` file in the root directory.

```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY=your_razorpay_key
```

---

# ▶️ Run the Project

### Start Backend

```bash
npm start
```

### Start Frontend

```bash
cd client
npm start
```

Open in browser:

```
http://localhost:3000
```

---

# 📈 Future Improvements

- Course certificates
- Live classes
- AI course recommendations
- Instructor revenue analytics
- Mobile app support

---

# 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repository and submit a pull request.

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Your Name**

GitHub:  
https://github.com/yourusername

LinkedIn:  
https://linkedin.com/in/yourprofile

---