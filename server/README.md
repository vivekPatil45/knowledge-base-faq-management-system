# Knowledge Base Project

## 📖 Project Overview

This Knowledge Base (KB) project is a web-based platform for employees and admins to manage articles, announcements, and analytics. The project consists of a **frontend** (React) and **backend** (Node.js, Express, MongoDB) with user authentication, role-based access, article management, feedback, analytics, and email verification via OTP.

The platform supports a modern UI with dark/light mode, smooth animations, and responsive design for desktop and mobile.

---



## Folder Structure

```
server/
├── .env.example          # Sample environment variables
├── .gitignore            # Files/folders to ignore in Git
├── package.json           # Node.js project dependencies and scripts
├── package-lock.json      # Exact versions of installed packages
├── src/
│   ├── config/
│   │   └── db.js          # MongoDB connection setup
│   ├── controllers/       # Handles request logic for each resource
│   │   ├── analyticsController.js
│   │   ├── announcementController.js
│   │   ├── articleController.js
│   │   ├── authController.js
│   │   ├── feedbackController.js
│   │   └── otpController.js
│   ├── middleware/        # Request middlewares like auth & admin checks
│   │   └── auth.js
│   ├── models/            # Mongoose schemas for MongoDB collections
│   │   ├── Announcement.js
│   │   ├── Article.js
│   │   ├── Feedback.js
│   │   ├── OTP.js
│   │   ├── SearchLog.js
│   │   └── User.js
│   ├── routes/            # API routes connecting controllers
│   │   ├── analytics.js
│   │   ├── announcements.js
│   │   ├── articles.js
│   │   ├── auth.js
│   │   ├── feedback.js
│   │   └── otp.js
│   ├── utils/             # Utility functions
│   │   ├── emailTemplates.js
│   │   └── sendEmail.js
│   └── server.js          # Entry point of the server, sets up Express app
```

**Summary:**

* `config/` → Database setup
* `controllers/` → Handles business logic per resource
* `middleware/` → Auth and admin checks
* `models/` → MongoDB schemas
* `routes/` → API endpoints
* `utils/` → Helpers like email sending
* `server.js` → Initializes server and loads routes
---

## 🏗️ Backend Architecture

The backend is built with **Node.js** and **Express.js**, with **MongoDB** for data storage and **Mongoose** as the ODM.

### 1. Models

#### User Model (`User.js`)

* Fields: `name`, `email`, `password`, `role`, `createdAt`
* Passwords are hashed using **bcrypt**.
* Methods: `matchPassword` to compare hashed passwords.
* Roles: `admin` and `employee`.

#### Article Model (`Article.js`)

* Fields: `title`, `category`, `content`, `tags`, `createdBy`
* Supports timestamps for `createdAt` and `updatedAt`.

#### Announcement Model (`Announcement.js`)

* Fields: `title`, `content`, `priority` (`low`, `medium`, `high`), `date`, `createdBy`
* Timestamps enabled.

#### Feedback Model (`Feedback.js`)

* Fields: `articleId`, `userId`, `feedback` (`helpful` | `not helpful`), `createdAt`
* Tracks feedback per article.

#### OTP Model (`OTP.js`)

* Fields: `email`, `code`, `purpose` (`register` | `forgot`), `expiresAt`
* Used for email verification.

#### Search Log Model (`SearchLog.js`)

* Fields: `keyword`, `userId` (optional), `createdAt`
* Used for analytics and tracking most-searched keywords.

---

### 2. API Routes

#### Authentication Routes (`/api/auth`)

* `POST /register`: Register a new user.
* `POST /login`: Login and receive JWT.
* `GET /me`: Get authenticated user info.

#### Article Routes (`/api/articles`)

* `GET /`: Get all articles (protected).
* `GET /:id`: Get a single article by ID (protected).
* `POST /`: Create a new article (admin only).
* `PUT /:id`: Update article (admin only).
* `DELETE /:id`: Delete article (admin only).

#### Feedback Routes (`/api/feedback`)

* `POST /`: Add feedback for an article (protected).
* `GET /article/:id`: Get all feedback for a specific article (protected).

#### Announcement Routes (`/api/announcements`)

* `GET /`: Get all announcements (protected).
* `POST /`: Create an announcement (admin only).
* `DELETE /:id`: Delete an announcement (admin only).

#### OTP Routes (`/api/otp`)

* `POST /register/send-otp`: Send registration OTP.
* `POST /register/verify-otp`: Verify registration OTP.
* `POST /forgot/send-otp`: Send forgot-password OTP.
* `POST /forgot/verify-otp`: Verify forgot-password OTP.

#### Analytics Routes (`/api/analytics`)

* `GET /articles/most-helpful`: Top helpful articles (admin only).
* `GET /articles/least-helpful`: Least helpful articles (admin only).
* `GET /articles/most-searched`: Most searched keywords (admin only).
* `GET /`: General analytics (admin only).

---

### 3. Middleware

#### Authentication Middleware (`auth.js`)

* `protect`: Protects routes by validating JWT.
* `admin`: Restricts access to users with role `admin`.

---

### 4. Utility

#### Email Service (`sendEmail.js`)

* Uses **nodemailer** with SMTP.
* Handles sending OTP for registration and password recovery.

---

### 5. Server Setup (`server.js`)

* Connects to MongoDB using `connectDB()`.
* Applies `cors` and `express.json()` middleware.
* Registers all API routes.
* Starts the server on `process.env.PORT || 5000`.

---

## 🔄 Project Flow

1. **User Authentication**

   * User registers → receives OTP via email → verifies OTP → account created.
   * User logs in → receives JWT token → stored in frontend context.

2. **Dashboard Access**

   * Admin: Full access to create/edit/delete articles, announcements, and view analytics.
   * Employee: View articles, provide feedback, see announcements.

3. **Articles**

   * CRUD operations handled by `/api/articles`.
   * Feedback tracked via `/api/feedback`.

4. **Announcements**

   * Admin creates announcements via `/api/announcements`.
   * Employees can view announcements.

5. **Analytics**

   * Track article feedback and search logs.
   * Admin can view most helpful/least helpful articles and most searched keywords.

6. **Frontend Flow**

   * React Context (`AuthContext`) manages user state.
   * Dashboard layout includes `Sidebar` for navigation.
   * `AdminDashboard` manages articles, modals, and analytics.
   * Dark/light mode toggle persists in `localStorage`.
   * `ArticleModal` displays full article content and allows feedback.

---

## ⚡ Key Features

* Role-based access control.
* JWT-based authentication.
* OTP verification for secure registration.
* Article management with tags and categories.
* Feedback system for articles.
* Announcements with priority levels.
* Analytics for admins.
* Email notifications using Nodemailer
---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js, MongoDB, Mongoose, bcrypt, JWT, Nodemailer.
* **Other:** CORS, Morgan for logging, Dotenv for env variables.

---

## 🔧 How to Run

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/kb_demo
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<smtp_user>
SMTP_PASS=<smtp_pass>
```

4. Run the server:

```bash
npm run dev
```

--- 
## 🔄 User Flow

### 1. Registration Flow

1. User opens the registration page on the frontend.
2. User enters **name, email, password**, and clicks register.
3. Frontend sends **POST request** to `/api/otp/register/send-otp` with the email.
4. Backend generates a **6-digit OTP**, saves it in the `OTP` collection with expiry, and sends it via email using **Nodemailer**.
5. User enters OTP in the frontend → frontend sends **POST request** to `/api/otp/register/verify-otp`.
6. Backend validates OTP:

   * If valid → creates user in `User` collection (password hashed with bcrypt).
   * If invalid → returns error.
7. User receives confirmation → can now log in.

**Notes:**

* Users default to `employee` role unless manually set to `admin`.
* OTP ensures email verification.

---

### 2. Login Flow

1. User opens the login page.
2. User enters **email** and **password**.
3. Frontend sends **POST request** to `/api/auth/login`.
4. Backend:

   * Checks if user exists.
   * Compares password using `bcrypt`.
   * Returns **JWT token** if valid.
5. Frontend saves JWT in **React Context (`AuthContext`)**.
6. Authenticated user redirected to dashboard:

   * **Employee** → Articles, Announcements, Feedback.
   * **Admin** → Full access (Articles CRUD, Announcements CRUD, Analytics).

---

### 3. Employee Flow

1. **View Articles**: GET `/api/articles`, filter by category/tags.
2. **Provide Feedback**: POST `/api/feedback` (helpful/not helpful).
3. **View Announcements**: GET `/api/announcements`.
4. **Search Articles**: Keywords logged in `SearchLog`.

**Restrictions:** Cannot create/edit/delete articles or announcements; cannot access analytics.

---

### 4. Admin Flow

1. **Manage Articles**:

   * POST `/api/articles` → Create
   * PUT `/api/articles/:id` → Update
   * DELETE `/api/articles/:id` → Delete
2. **Manage Announcements**:

   * POST `/api/announcements` → Create
   * DELETE `/api/announcements/:id` → Delete
3. **View Analytics**:

   * GET `/api/analytics/articles/most-helpful`
   * GET `/api/analytics/articles/least-helpful`
   * GET `/api/analytics/articles/most-searched`
   * GET `/api/analytics`
4. **Access Dashboard**: Full overview with modals for article details.

**Restrictions:** Admin usually does not provide feedback.

---

### 5. OTP Flow for Password Recovery

1. User clicks **forgot password**.
2. Enter registered email → POST `/api/otp/forgot/send-otp`.
3. Backend sends OTP to email.
4. User enters OTP → POST `/api/otp/forgot/verify-otp`.
5. Backend validates → allows password reset.

---

### 6. Frontend Flow Integration

* **React Context (`AuthContext`)** stores user state and JWT.
* Conditional rendering based on role:

  * Admin → Admin dashboard.
  * Employee → Employee dashboard.
* **Dark/Light Mode** toggle persisted in `localStorage`.
* **Sidebar** shows navigation links by role.
* **Article Modal** displays content and feedback options.

---

### 7. Summary of Access

| Feature                     | Employee |   Admin  |
| --------------------------- | :------: | :------: |
| View Articles               |     ✅    |     ✅    |
| Create/Edit/Delete Article  |     ❌    |     ✅    |
| Provide Feedback            |     ✅    | Optional |
| View Announcements          |     ✅    |     ✅    |
| Create/Delete Announcements |     ❌    |     ✅    |
| View Analytics              |     ❌    |     ✅    |
| User Management             |     ❌    |   Optio  |




