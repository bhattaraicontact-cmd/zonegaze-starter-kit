# ZoneGaze Starter Kit

A local-first Dependency Starter Kit for ZoneGaze. It helps developers discover open-source packages tailored to their project needs while ensuring commercial license compliance.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm

### 1. Install Dependencies
Open two terminals to install backend and frontend packages.

# Terminal 1: Backend
cd backend
npm install

# Terminal 2: Frontend
cd frontend
npm install

### 2. Run the App
Start both servers.

# Terminal 1: Backend (Port 5001)
cd backend
node index.js

# Terminal 2: Frontend (Port 5173)
cd frontend
npm run dev

### 3. Usage
Open http://localhost:5173/ in your browser.

## Architecture Highlights
- Frontend: React + Vite, responsive for mobile screens (390px).
- Backend: Express.js, fetching sequentially from npm API to prevent rate limits.
- Caching: node-cache stores API responses for 1 hour.
- License Check: Custom validator blocks restrictive licenses (like GPL) for commercial projects.