# Real-time Collaboration Tool

A web app for real-time document collaboration using WebSockets.

Features

Multi-user collaboration on documents

Real-time text updates

User presence indicators

Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express, WebSockets

Database: MongoDB

Setup

1. Clone the repository

git clone 
cd realtime-collaboration

2. Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. Create a .env file

Backend (/backend/.env)

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Frontend (/frontend/.env)

REACT_APP_API_URL=http://localhost:5000

4. Run the app
   # Start backend
cd backend
npm start

  # Start frontend
cd ../frontend
npm start
