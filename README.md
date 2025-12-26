# QuickChat Website 💬

QuickChat is a full‑stack real‑time chat application built with **React + Vite** on the frontend and a **Node.js/Express/MongoDB** backend. It supports user authentication, profile management, and live messaging with a clean UI.

---

## 🚀 Features
- 🔐 **Authentication** – Sign up, login, and secure sessions
- 👤 **Profile Management** – Update name, bio, and profile picture
- 💬 **Real‑time Chat** – Send and receive messages instantly
- 🎨 **Responsive UI** – Tailwind CSS for modern design
- 🌐 **Deployment Ready** – Frontend on Vercel, backend on Render

---

## 🛠️ Tech Stack
**Frontend**
- React 18
- Vite
- Tailwind CSS
- React Router

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io (for real‑time messaging)

**Deployment**
- Vercel (Frontend)
- Render (Backend)

## 📂 Project Structure
QuickChat-Website/ ├── public/              # Static assets (profileIcon, logos, etc.) ├── src/ │   ├── assets/          # UI images/icons │   ├── components/      # Reusable React components │   ├── pages/           # Page-level components (Profile, Chat, etc.) │   ├── context/         # AuthContext for global state │   ├── App.jsx          # Root component │   └── main.jsx         # Entry point ├── vercel.json          # Vercel rewrites config └── package.json


## ⚙️ Setup & Installation

Clone the repo:
```bash
git clone https://github.com/hashir-stack/QuickChat-Website.git
cd QuickChat-Website

Install dependencies:npm install
Run locally:npm run dev
Build for production:npm run build

🧑‍💻 Author
Mohd. Hashir
Persistent full‑stack developer passionate about building scalable, user‑friendly apps.

📜 License
This project is licensed under the MIT License.
