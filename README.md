# React MeetApp — Fullstack (Frontend + Backend)

> Single-page React app (Vite) + Node/Express backend with MongoDB. Auth uses JWT stored in an **HTTP-only cookie** (so **no localStorage**). Image uploads use `multer` and are saved to `backend/uploads/` (switch to S3/Cloudinary for production).

---

## What you'll get in this document

- Full project structure
- Backend (Express + Mongoose) code: auth, user model, upload, connect endpoint
- Frontend (React + Vite) code: Login, Signup, Dashboard (upload pictures, view other users, connect)
- Instructions for arranging in VS Code and commands to install & run

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- VS Code (recommended) with extensions: ESLint, Prettier, EditorConfig

---

## Project structure

```
react-meetapp/
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── server.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   └── uploads/   # image files (gitignore this)
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api.js
        ├── pages/
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   └── Dashboard.jsx
        └── components/
            └── UserCard.jsx

```

---

## Backend — configuration & code

### backend/package.json

```json
{
  "name": "meetapp-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.0",
    "multer": "^1.4.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```


### backend/.env.example

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/meetapp
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
```


### backend/server.js

```js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS: allow credentials so frontend can send/receive cookies
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server listening on', PORT));
  })
  .catch(err => console.error(err));
```


### backend/models/User.js

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  images: [String], // filenames under /uploads
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
```


### backend/middleware/auth.js

```js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Authentication failed' });
  }
}
```


### backend/middleware/upload.js

```js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'), false);
  cb(null, true);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
```


### backend/routes/auth.js

```js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already used' });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ user: { id: user._id, name: user.name, email: user.email, images: user.images } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ user: { id: user._id, name: user.name, email: user.email, images: user.images } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// whoami
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ user: null });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    res.json({ user });
  } catch (err) {
    res.json({ user: null });
  }
});

module.exports = router;
```


### backend/routes/users.js

```js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const User = require('../models/User');

// Upload image (authenticated)
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    req.user.images.push('/uploads/' + req.file.filename);
    await req.user.save();
    res.json({ imageUrl: '/uploads/' + req.file.filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Get other users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('name images');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Failed' });
  }
});

// connect (send connection / like)
router.post('/:id/connect', auth, async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    // Prevent duplicates
    if (!req.user.connections.includes(target._id)) {
      req.user.connections.push(target._id);
      await req.user.save();
    }
    res.json({ message: 'Connected' });
  } catch (err) {
    res.status(500).json({ message: 'Failed' });
  }
});

module.exports = router;
```

---

## Frontend — configuration & code

### frontend/package.json

```json
{
  "name": "meetapp-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```


### frontend/vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
})
```


### frontend/src/api.js

```js
// small wrapper for API calls. We use credentials: 'include' so cookies are sent.
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function post(path, body) {
  const res = await fetch(BASE + path, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function get(path) {
  const res = await fetch(BASE + path, { credentials: 'include' });
  return res.json();
}

export async function uploadImage(formData) {
  const res = await fetch(BASE + '/api/users/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
  return res.json();
}
```


### frontend/src/main.jsx

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route path='login' element={<Login/>} />
          <Route path='signup' element={<Signup/>} />
          <Route path='dashboard' element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
```


### frontend/src/App.jsx

```jsx
import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App(){
  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial', padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>MeetApp</h1>
        <nav>
          <Link to='/login'>Login</Link> | <Link to='/signup'>Sign up</Link> | <Link to='/dashboard'>Dashboard</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```


### frontend/src/pages/Login.jsx

```jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    const res = await post('/api/auth/login', { email, password })
    if (res.user) return nav('/dashboard')
    setErr(res.message || 'Login failed')
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}
```


### frontend/src/pages/Signup.jsx

```jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../api'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    const res = await post('/api/auth/signup', { name, email, password })
    if (res.user) return nav('/dashboard')
    setErr(res.message || 'Signup failed')
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 500 }}>
      <h2>Sign up</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <div>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type='submit'>Create account</button>
    </form>
  )
}
```


### frontend/src/components/UserCard.jsx

```jsx
import React from 'react'

export default function UserCard({ user, onConnect }){
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6, width: 220 }}>
      <h4>{user.name}</h4>
      {user.images && user.images[0] ? (
        <img src={import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + user.images[0] : 'http://localhost:4000' + user.images[0]} alt='' style={{ width: '100%', height: 150, objectFit: 'cover' }} />
      ) : (
        <div style={{ width: '100%', height: 150, background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No image</div>
      )}
      <button onClick={() => onConnect(user._id)} style={{ marginTop: 8 }}>Connect</button>
    </div>
  )
}
```


### frontend/src/pages/Dashboard.jsx

```jsx
import React, { useEffect, useState } from 'react'
import { get, uploadImage } from '../api'
import UserCard from '../components/UserCard'

export default function Dashboard(){
  const [me, setMe] = useState(null)
  const [others, setOthers] = useState([])
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => { fetchMe() }, [])

  async function fetchMe(){
    const res = await get('/api/auth/me')
    setMe(res.user)
    if (res.user) loadOthers()
  }

  async function loadOthers(){
    const res = await get('/api/users')
    setOthers(res.users || [])
  }

  async function onUpload(e){
    e.preventDefault()
    if (!file) return setMsg('Choose a file')
    const fd = new FormData()
    fd.append('image', file)
    const res = await uploadImage(fd)
    if (res.imageUrl) {
      setMsg('Uploaded')
      fetchMe()
    } else setMsg(res.message || 'Upload failed')
  }

  async function onConnect(id){
    await fetch((import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api/users/' + id + '/connect', {
      method: 'POST', credentials: 'include'
    })
    alert('Connection requested')
  }

  if (!me) return <div>Please login to continue</div>

  return (
    <div>
      <h2>Welcome, {me.name}</h2>
      <section style={{ marginBottom: 20 }}>
        <h3>Upload a picture</h3>
        <form onSubmit={onUpload}>
          <input type='file' accept='image/*' onChange={e => setFile(e.target.files[0])} />
          <button type='submit'>Upload</button>
        </form>
        {msg && <div>{msg}</div>}
      </section>

      <section>
        <h3>People you can meet</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {others.map(u => <UserCard key={u._id} user={u} onConnect={onConnect} />)}
        </div>
      </section>
    </div>
  )
}
```

---

## VS Code arrangement and instructions

1. In VS Code, open the root folder `react-meetapp`.
2. Create two folders: `backend` and `frontend` and paste the files above into their respective folders (each code block labelled with filename).
3. Open two terminal panes in VS Code (Terminal → New Terminal twice). In one run backend, in the other run frontend.

### Install & run backend

```bash
cd backend
cp .env.example .env   # fill values (MONGO_URI, JWT_SECRET, FRONTEND_URL)
npm install
npm run dev   # requires nodemon OR npm start
```

### Install & run frontend

```bash
cd frontend
npm install
# set VITE_API_URL if backend isn't on default
# e.g. export VITE_API_URL=http://localhost:4000
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Production notes & improvements

- **File storage:** for production, replace `multer` disk storage with S3/Cloudinary. Keep only URLs in the DB.
- **HTTPS & secure cookies:** set secure cookie flags and serve over HTTPS.
- **Rate limiting & validation:** add express-rate-limit and stronger validation (Joi/zod).
- **Real-time chat:** integrate Socket.IO for live messaging.
- **Pagination:** limit user list queries.
- **Emails / verification:** integrate an email provider for verification and password reset.

---

## Final—what I included

- Complete backend with auth, cookie-based JWT, upload, connect endpoints
- React frontend with signup/login/dashboard/upload/user list
- No `localStorage` used — auth relies on HTTP-only cookies

---

If you want, I can:
- Convert uploads to S3/Cloudinary and provide config code
- Add real-time messaging (Socket.IO)
- Add styles with Tailwind or Material UI

Tell me which of those you'd like next and I will update the project.
