# 📌 Pinned

**Pinned** is a full-stack productivity application for managing personal notes, reminders, and ideas — called **Pins**.  
It combines a clean, responsive React + TypeScript frontend with a secure Node.js + Express + PostgreSQL backend.  
Built as both a **portfolio project** and a **production tool** I use daily, Pinned demonstrates scalable architecture, custom React hooks, and reusable component design.

---

## 🧠 Key Features

- ✅ **Authentication & Authorization** — Secure login/register flow using JWTs (access + refresh tokens).
- 📌 **CRUD Operations for Pins** — Create, edit, and delete pins with live updates.
- 🧩 **Reusable Modal System** — Unified modal provider powering both confirmation and pin modals.
- 💬 **Custom Form Validation Hooks** — Email and password validation using `validator.js` with real-time feedback.
- 🔄 **Axios Interceptors** — Automatic token refresh and request retry handling.
- 🎨 **Responsive, Animated UI** — Styled with modern CSS and Framer Motion for smooth transitions.
- ⚙️ **Type-Safe & Maintainable** — Built entirely in TypeScript, with modular file structure and clean architecture.
- 🧱 **Deployed Infrastructure** —
  - **Frontend:** Vercel
  - **Backend & DB:** Render (Express + PostgreSQL)

---

## 🏗️ Tech Stack

| Layer           | Technology                                    |
| --------------- | --------------------------------------------- |
| **Frontend**    | React, TypeScript, Vite, Axios, Framer Motion |
| **Backend**     | Node.js, Express.js                           |
| **Database**    | PostgreSQL                                    |
| **Hosting**     | Vercel (frontend), Render (backend + DB)      |
| **Other Tools** | ESLint, Prettier, Validator.js                |

---

## 📁 Folder Structure

```
Pinned/
├── client/                     # React + TypeScript frontend
│   ├── src/
│   │   ├── api/                # Axios API calls and configuration
│   │   ├── assets/             # Images, icons, and static files
│   │   ├── components/         # UI components (modals, inputs, pin cards)
│   │   ├── context/            # Global state providers (Auth, Modal)
│   │   ├── hooks/              # Custom React hooks (validation, auth, axios)
│   │   ├── pages/              # Top-level page components (Login, Register, Dashboard)
│   │   ├── styles/             # Modular CSS files
│   │   ├── types/              # TypeScript type definitions and interfaces
│   │   ├── utils/              # Reusable validation + helper logic
│   │   ├── App.tsx             # Root application component
│   │   └── main.tsx            # Entry point for React app
│   └── vite.config.ts
│
├── server/                     # Express backend
│   ├── routes/                 # REST endpoints (auth, pins)
│   ├── controllers/            # Request handlers for each route
│   ├── middleware/             # Authentication and error handling
│   ├── utils/                  # Helper functions and reusable backend logic
│   ├── db/                     # Database connection + SQL queries
│   └── server.js               # Express server entry point
│
└── README.md

```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
PORT=
DATABASE_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

---

## 🚀 Getting Started

1️⃣ Clone the Repository
git clone https://github.com/BraydenJMassa/Pinned.git

cd Pinned

2️⃣ Install Dependencies
Client:
cd client
npm install

Server:
cd ../server
npm install

3️⃣ Set Up Environment Variables
Before running the backend, create a .env file inside the server directory.
Use the template below and fill in your own credentials and secrets:

server/.env
PORT=4000
DATABASE_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

Ensure these secrets are never committed to version control.

4️⃣ Run Locally
Start backend:
cd server
npm run devStart

Start frontend (in another terminal):
cd client
npm run dev

Frontend will be available at:
http://localhost:5173

Backend runs on:
http://localhost:4000

---

## 🧩 API Overview

| Method   | Endpoint                           | Description                                  |
| -------- | ---------------------------------- | -------------------------------------------- |
| `POST`   | `/api/auth/register`               | Register a new user                          |
| `POST`   | `/api/auth/login`                  | Log in a user                                |
| `POST`   | `/api/auth/refresh`                | Refresh access token                         |
| `POST`   | `/api/auth/logout`                 | Log out user                                 |
| `GET`    | `/api/user/pins/:userId`           | Get all pins for logged-in user              |
| `POST`   | `/api/pins`                        | Create a new pin                             |
| `PUT`    | `/api/pins/:pinId`                 | Edit an existing pin description             |
| `PATCH`  | `/api/pins/toggleCompleted/:pinId` | Toggle 'completed' field for a specified pin |
| `DELETE` | `/api/pins/:pinId`                 | Delete a pin                                 |

---

## 🧩 Reusable Architecture Highlights

- **🪟 Modal System:**  
  A universal modal component and context that powers both confirmation and input modals, improving code reuse and maintainability.

- **🧠 Validation Utils:**  
  Centralized validation logic extracted into `validationUtils.ts`, used by both login and register hooks for clean consistency.

- **🔁 Axios Interceptor Hook:**  
  Automatically refreshes tokens on 401 errors without disrupting user experience.

---

## 🧭 Future Enhancements

- [ ] Pin categories and filtering
- [ ] Calendar integration
- [ ] Dark mode toggle
- [ ] Alerts and reminders
- [ ] Email confirmation

---

## 📜 License

This project is a personal project with no Licenses

---

## 👤 Author

**Brayden Massa**  
📧 [braydenjmassa@gmail.com](mailto:braydenjmassa@gmail.com)  
🐙 [GitHub](https://github.com/BraydenJMassa)
