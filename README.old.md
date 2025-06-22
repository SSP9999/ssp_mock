# SSC CGL & Railway Mock Test Application

A full-stack web application for SSC CGL and Railway exam mock tests built with React.js (frontend) and Node.js with Express (backend).

## Features

### Frontend (React.js)
- User authentication (Login/Signup)
- Dashboard with available mock tests
- Mock test interface with MCQ questions
- Results page showing score and detailed answers
- Responsive design for mobile and desktop

### Backend (Node.js + Express)
- JWT-based authentication
- RESTful API endpoints
- In-memory database (arrays/JSON)
- CORS enabled for frontend communication

## Setup Instructions

### Prerequisites
- Node.js v16 or higher
- yarn package manager

### Backend Setup

1. Create a new directory for the backend:
```bash
mkdir mock-test-backend
cd mock-test-backend
```

2. Create the package.json file with the provided content

3. Install dependencies:
```bash
yarn install
```

4. Create server.js with the provided backend code

5. Start the backend server:
```bash
yarn start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Create a new React app:
```bash
npx create-react-app mock-test-frontend
cd mock-test-frontend
```

2. Replace the default files with the provided code:
   - Replace `src/App.js`
   - Replace `src/App.css`
   - Replace `src/index.js`
   - Replace `src/index.css`
   - Replace `public/index.html`
   - Update `package.json` with proxy configuration

3. Start the frontend development server:
```bash
yarn start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Tests
- `GET /api/tests` - Get available tests (requires authentication)
- `GET /api/tests/:id` - Get specific test questions (requires authentication)
- `POST /api/tests/:id/submit` - Submit test answers (requires authentication)

### Results
- `GET /api/results` - Get user's past results (requires authentication)

## Sample Data

The application comes with pre-loaded sample tests:

1. **SSC CGL General Knowledge** - 5 questions covering general knowledge topics
2. **Railway Group D Technical** - 5 questions covering railway technical topics

## File Structure

### Backend
```
mock-test-backend/
├── package.json
├── server.js
└── node_modules/
```

### Frontend
```
mock-test-frontend/
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── node_modules/
```

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Sign up for a new account or login
4. View available tests on the dashboard
5. Start a test by clicking "Start Test"
6. Answer all questions and submit
7. View results with detailed answer explanations
8. Check previous test results on the dashboard

## Technologies Used

### Frontend
- React.js (functional components with hooks)
- CSS3 with responsive design
- Local storage for JWT token persistence

### Backend
- Node.js v16
- Express.js
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Features Implemented

✅ User authentication (signup/login)  
✅ JWT-based session management  
✅ Dashboard with available tests  
✅ Mock test interface with radio button options  
✅ Test submission and evaluation  
✅ Results page with score and detailed answers  
✅ Past results tracking  
✅ Responsive design  
✅ In-memory database  
✅ RESTful API architecture  

## Future Enhancements

- Timer functionality for tests
- More test categories and questions
- User profile management
- Test analytics and performance tracking
- Database persistence (MongoDB/PostgreSQL)
- Email verification for signup
- Password reset functionality