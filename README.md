# Todo App — MERN + Tailwind CSS v4

A starter MERN todo dashboard with React (Vite), Tailwind CSS v4, Express, MongoDB/Mongoose, JWT authentication, and CRUD todo APIs.

## Requirements
- Node.js 20+ recommended
- MongoDB local or MongoDB Atlas connection string

## 1. Configure environment files

`backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

`frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## 2. Install dependencies

Open two terminals:

Terminal 1:
```bash
cd backend
npm install
npm run dev
```

Terminal 2:
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Features in this starter
- Register and login with hashed passwords + JWT
- Create, list, update, complete, and delete todos
- Dashboard summary and All / Pending / Completed filters
- Tailwind CSS v4 using `@tailwindcss/vite` and `@import "tailwindcss";`
- Responsive sidebar/dashboard layout

## Notes
- Never commit `.env` files or use the sample JWT secret in production.
- This is a starter project. Before production, add validation, rate limiting, refresh-token/session strategy, tests, and stronger security configuration.
