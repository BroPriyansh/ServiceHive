# ServiceHive

A full-stack web application for managing leads and services with authentication and real-time data management.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Contributing](#contributing)

## 🎯 Project Overview

ServiceHive is a comprehensive lead management system with a modern React frontend and Express.js backend. It provides user authentication, lead management capabilities, and real-time data synchronization.

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js 5.x
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: express-validator
- **Development**: ts-node-dev

### Frontend
- **Framework**: React 19.x
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **UI Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
ServiceHive/
├── Backend/
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   │   ├── auth.controller.ts
│   │   │   └── lead.controller.ts
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   ├── models/              # MongoDB schemas
│   │   │   ├── User.model.ts
│   │   │   └── Lead.model.ts
│   │   ├── routes/              # API routes
│   │   │   ├── auth.routes.ts
│   │   │   └── lead.routes.ts
│   │   ├── utils/               # Utility functions
│   │   │   └── generateToken.ts
│   │   ├── validators/          # Input validation schemas
│   │   │   ├── auth.validator.ts
│   │   │   └── lead.validator.ts
│   │   ├── app.ts               # Express app configuration
│   │   └── server.ts            # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example             # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── layout/
│   │   │   │   └── Layout.tsx
│   │   │   ├── leads/           # Lead-specific components
│   │   │   └── ui/              # UI components
│   │   ├── pages/               # Page components
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardPage.tsx
│   │   │   ├── leads/
│   │   │   │   └── LeadsPage.tsx
│   │   │   └── settings/
│   │   │       └── SettingsPage.tsx
│   │   ├── context/             # React Context for state management
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useDebounce.ts
│   │   ├── routes/              # Route components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── types/               # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── utils/               # Utility functions
│   │   ├── api/                 # API integration
│   │   │   └── axios.ts
│   │   ├── App.tsx              # Main App component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .env.example             # Environment variables template
│
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ServiceHive
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## 🔧 Environment Setup

### Backend Configuration

1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```

2. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/servicehive
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/servicehive?retryWrites=true&w=majority

   # JWT Configuration
   JWT_SECRET=your_secure_random_string_here

   # CORS Configuration
   # You can allow multiple origins by separating them with commas.
   # Example for local development plus deployed frontend:
   # CLIENT_URL=http://localhost:5173,https://service-hive-nu.vercel.app
   CLIENT_URL=http://localhost:5173
   ```

### Frontend Configuration

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Create a `.env.local` file from the template:
   ```bash
   cp .env.example .env.local
   ```

3. Update the `.env.local` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## ▶️ Running the Application

### Development Mode

#### Terminal 1 - Start MongoDB (if using local instance)

```bash
mongod
```

#### Terminal 2 - Start Backend Server

```bash
cd Backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Terminal 3 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Build

#### Backend

```bash
cd Backend
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Lead Endpoints

#### Get All Leads
```http
GET /api/leads
Authorization: Bearer <token>
```

#### Create Lead
```http
POST /api/leads
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Lead Name",
  "email": "lead@example.com",
  "phone": "+1234567890",
  "status": "new"
}
```

#### Update Lead
```http
PUT /api/leads/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "contacted"
}
```

#### Delete Lead
```http
DELETE /api/leads/:id
Authorization: Bearer <token>
```

## ✨ Features

- **User Authentication**: Secure registration and login with JWT
- **Lead Management**: Create, read, update, and delete leads
- **User Dashboard**: View statistics and recent activities
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Validation**: Input validation on both client and server
- **Protected Routes**: Role-based access control
- **Error Handling**: Comprehensive error messages and logging
- **Security**: CORS, Helmet, password hashing with bcryptjs

## 🧪 Testing

### Backend Tests

```bash
cd Backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📝 Code Style

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (optional) for code formatting

Run linting:

```bash
# Backend
cd Backend
npm run lint

# Frontend
cd frontend
npm run lint
```

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or you have a valid MongoDB Atlas connection string
- Check if `MONGO_URI` in `.env` is correct

### CORS Errors
- Verify that `CLIENT_URL` in Backend `.env` matches your frontend URL exactly
- Use the deployed frontend origin without a trailing slash (for example `https://service-hive-nu.vercel.app`)
- If using Render or another host, redeploy/restart after updating `CLIENT_URL`
- Check that `VITE_API_URL` in frontend `.env.local` matches your backend URL

### Port Already in Use
- Backend: Change `PORT` in `.env` (default: 5000)
- Frontend: The dev server will use the next available port if 5173 is in use

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📧 Support

For support, email support@servicehive.com or open an issue in the repository.

---

**Last Updated**: May 2026
