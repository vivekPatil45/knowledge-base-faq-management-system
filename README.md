# 📚 Knowledge Base (Admin Dashboard & Articles Platform)

A **full-featured Knowledge Base** platform with **user authentication, admin dashboard, articles management, feedback system**, and beautiful **dark/light themed UI** with animations. Built using **React, TailwindCSS, shadcn/ui, and Lucide icons** for frontend, with **Node.js/Express or your backend APIs** for handling articles, users, and feedback.

---

## 📝 Project Overview

This project allows users to:

* **Login/Register** using email and password.
* View a **dashboard** with different views: overview, articles, analytics, announcements.
* **Admin users** can manage articles (create, update, delete), view analytics, and monitor feedback.
* Users can provide **feedback** on articles (helpful/not helpful).
* Full **dark/light theme support** with smooth transitions.
* Responsive design for **mobile and desktop** with a sidebar menu.
* Animated background gradients for a modern look.

---

## 🏗 Tech Stack

**Frontend:**

* React / Next.js
* TailwindCSS + Shadcn/ui for components
* Lucide-react for icons
* React Hot Toast for notifications
* Context API for global auth state
* LocalStorage for dark/light mode persistence

**Backend (API):**

* Node.js + Express (or your API server)
* MongoDB (or database of choice)
* API Endpoints:

  * `/api/articles` → CRUD operations for articles
  * `/api/auth` → User authentication (login, register, logout)
  * `/api/feedback` → Submit helpful/not helpful feedback

---

## 📂 Project Structure (Frontend)

```
src/
│
├─ components/
│   ├─ auth/           # Login & registration forms
│   ├─ admin/          # Dashboard, Sidebar, DashboardContent
│   ├─ articles/       # ArticleForm, ArticleModal, ArticleCard
│   └─ shared/         # Navbar, LoadingSpinner, ThemeToggle
│
├─ context/            # AuthContext for user state
├─ api/                # API service calls (articles, feedback)
├─ types/              # TypeScript types for Article, User, etc.
├─ pages/              # Main routes (Dashboard, LoginRegister, AdminDashboard)
└─ App.tsx             # App entry point
```

---

## 🚀 Features

### 1. **Authentication**

* User login/register with context-based state management.
* Maintains login session on page refresh.
* Full-page **loading spinner** when checking auth state.

### 2. **Admin Dashboard**

* **Sidebar navigation** for different sections (overview, articles, analytics, announcements)
* **Responsive design**: collapsible mobile sidebar
* **Dynamic background animations** for modern UI
* **DashboardContent** renders components based on the selected view
* Articles view includes CRUD operations and modal previews.

### 3. **Articles Management**

* Admin can create, edit, delete articles.
* **ArticleForm**: title, category, content (markdown supported), tags
* **ArticleModal**: preview article content, leave feedback
* Tags can be added dynamically with `Enter` or `,`
* Input validation with inline error messages.

### 4. **Feedback System**

* Users can mark articles as **helpful/not helpful**
* Feedback count updates in real-time
* API calls are made to `/api/feedback`

### 5. **Dark/Light Theme**

* Toggle button in Navbar
* Dark/light preference persisted in **localStorage**
* Animations and gradient backgrounds adapt to theme

### 6. **Responsive Design**

* Works on **desktop and mobile**
* Mobile sidebar with toggle button
* Smooth transitions and hover effects

### 7. **Loading Effects**

* Full-page spinner on auth check
* Shimmer placeholders for articles (optional)

---

## 🔄 Project Flow

1. **App Initialization**

   * `App.tsx` wraps `AppContent` with `AuthProvider`.
   * On refresh, `AuthContext` checks `localStorage` or backend for logged-in user.
   * While fetching, **loading spinner** is displayed.

2. **Authentication**

   * If no user → `LoginRegister` page.
   * If logged in → `Dashboard` or `AdminDashboard`.

3. **Admin Dashboard**

   * Loads `Sidebar` for navigation.
   * `DashboardContent` renders based on current view (`overview`, `articles`, `analytics`).
   * Fetches **articles** from API on mount.
   * Users/admin can interact with articles: **view, create, edit, delete, provide feedback**.

4. **Articles Modal**

   * Clicking an article opens `ArticleModal`.
   * Shows full article content and allows feedback submission.
   * Feedback updates are reflected instantly on the dashboard.

5. **Dark/Light Mode**

   * Toggle stored in `localStorage` to persist user preference.
   * Updates class on `<html>` element for theme switching.

6. **Mobile Responsiveness**

   * Mobile sidebar toggle via hamburger menu.
   * Full accessibility on small screens.

---

## 📦 API Endpoints (Simplified)

| Endpoint             | Method | Description                |
| -------------------- | ------ | -------------------------- |
| `/api/auth/login`    | POST   | Login user                 |
| `/api/auth/register` | POST   | Register user              |
| `/api/auth/logout`   | POST   | Logout user                |
| `/api/articles`      | GET    | Fetch all articles         |
| `/api/articles`      | POST   | Create new article         |
| `/api/articles/:id`  | PUT    | Update article             |
| `/api/articles/:id`  | DELETE | Delete article             |
| `/api/feedback`      | POST   | Submit helpful/not helpful |
---

## ⚡ How to Run

```bash
# Install dependencies
npm install

# Run frontend
npm start

# Ensure backend API is running at /api
```

* Ensure `.env` contains API URLs and keys if required.
* The `AuthContext` will manage the user session and loading state.
* Articles and feedback functionality depend on backend endpoints.

---
