# SecureTrack

A role-based cybersecurity platform for managing vulnerabilities, security incidents, and AI-powered security analysis.

## Live Demo

**Frontend:** https://secure-track-beige.vercel.app

**Backend API:** https://securetrack-ieji.onrender.com

> **Note:** The frontend is deployed on Vercel, while the backend is deployed on Render using Docker.

---

# Features

* **Role-Based Authentication**

  * Secure login and registration with JWT authentication.
  * Separate dashboards for Admin, Developer, and User roles.

* **Vulnerability Management**

  * Report, view, update, and manage security vulnerabilities.
  * Upload supporting evidence files for vulnerability reports.
  * Track vulnerability status and severity.

* **Incident Management**

  * Report and manage cybersecurity incidents.
  * Monitor incident lifecycle from reporting to resolution.

* **AI Security Assistant**

  * Chat with an AI assistant for cybersecurity guidance.
  * Receive recommendations and explanations for reported vulnerabilities.

* **Interactive Dashboard**

  * Public dashboard displaying platform statistics.
  * Admin dashboard with vulnerability and incident analytics.

* **Secure API**

  * Django REST Framework APIs protected with JWT authentication.
  * Role-based authorization for sensitive operations.

---

# User Roles

### Admin

* Manage all users.
* Manage vulnerabilities and incidents.
* View administrative dashboard.
* Monitor overall platform security.

### Developer

* Report vulnerabilities.
* View assigned vulnerabilities.
* Use AI Security Assistant.
* Track vulnerability status.

### User

* Report security incidents.
* View submitted incidents.
* Access public dashboard.

---

# Getting Started

## Prerequisites

Before running the project, make sure you have:

* Python 3.13+
* PostgreSQL
* Node.js 18+
* Git
* Docker (optional)

---

## Clone the Repository

```bash
git clone https://github.com/anuskabhandari/SecureTrack.git

cd SecureTrack
```

---

# Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a **.env** file.

Example:

```env
SECRET_KEY=your_secret_key

DEBUG=True

DB_NAME=your_database

DB_USER=your_username

DB_PASSWORD=your_password

DB_HOST=localhost

DB_PORT=5432

GROQ_API_KEY=your_groq_api_key
```

Run migrations.

```bash
python manage.py makemigrations

python manage.py migrate
```

Create a superuser.

```bash
python manage.py createsuperuser
```

Run the backend.

```bash
python manage.py runserver
```

Backend API:

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Navigate to frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a **.env** file.

```env
VITE_API_URL=http://127.0.0.1:8000
```

Run the frontend.

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# Docker Setup

Build and start the application.

```bash
docker compose up --build
```

---

# Tech Stack

### Frontend

* React
* Vite
* Bootstrap
* Axios
* React Router
* React Toastify

### Backend

* Python
* Django
* Django REST Framework
* JWT Authentication
* Gunicorn

### Database

* PostgreSQL

### AI

* Groq API

### Deployment

* Docker
* Render
* Vercel

---

# Project Structure

```
SecureTrack/

├── backend/
│   ├── accounts/
│   ├── vulnerabilities/
│   ├── incidents/
│   ├── dashboard/
│   ├── ai/
│   ├── profiles/
│   └── securetrack/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

# API Highlights

* Authentication APIs
* User Management
* Vulnerability Management
* Incident Management
* Dashboard Statistics
* AI Chat Assistant

---

# Future Enhancements

* Email Notifications
* CVE Database Integration
* Risk Score Prediction
* Real-Time Alerts
* Audit Logs
* Multi-Factor Authentication
* Security Reports Export (PDF/Excel)

---

# Screenshots

## Admin Dashboard

<img width="1880" height="867" alt="Screenshot 2026-07-17 194556" src="https://github.com/user-attachments/assets/e1474137-b230-4d0e-a0fd-6ebf614a42ca" />



---

## Developer Dashboard

<img width="1910" height="858" alt="Screenshot 2026-07-17 194807" src="https://github.com/user-attachments/assets/8b325e21-7d8d-4dbb-a94b-01de3db3464a" />


---

## User Dashboard

<img width="1917" height="867" alt="Screenshot 2026-07-17 195655" src="https://github.com/user-attachments/assets/348be0c4-f398-4dae-9fbf-312b598496f9" />




---

# License

This project is licensed under the **MIT License**.

---

# Author

**Anuska Bhandari**


