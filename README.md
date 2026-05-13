# ClassPlus - Greeting Card Application Setup

Complete setup instructions for the full-stack greeting card application.

## Project Structure

```
ClassPlus/
├── backend/           # Express.js + MongoDB API
├── frontend/          # React SPA
├── .vscode/          # VS Code configuration
└── README.md         # Project documentation
```

## Quick Start

### 1. Install Backend Dependencies
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on http://localhost:5000

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:3000

### 3. Configure Environment

**Backend (.env)**:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/classplus
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env)**:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB
mongod

# Create database and collections
mongo classplus
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Update MONGODB_URI in .env

## Features Implemented

- ✅ User authentication (Email, Google, Guest)
- ✅ Template browsing with categories
- ✅ Profile picture and name overlay
- ✅ Image download functionality
- ✅ Share link generation
- ✅ Premium subscription system
- ✅ Responsive design

## Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (configure Jest first)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## VS Code Tasks

Press Ctrl+Shift+B to open task palette:
- **Backend: Install Dependencies** - npm install for backend
- **Backend: Start Dev Server** - npm run dev for backend
- **Frontend: Install Dependencies** - npm install for frontend
- **Frontend: Start Dev Server** - npm run dev for frontend
- **All: Start Full Stack** - Run both backend and frontend

## Debugging

### Backend Debugging
1. Set breakpoints in backend code
2. Select "Backend" in VS Code debug dropdown
3. Press F5 to start debugging
4. Use debug console to inspect variables

### Frontend Debugging
1. Select "Frontend" in VS Code debug dropdown
2. Press F5 to start Chrome debugger
3. Use Chrome DevTools for inspection

## API Documentation

### Auth Endpoints
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/guest` - Guest login

### Template Endpoints
- `GET /api/templates` - List templates
- `GET /api/templates?category=Birthday` - Filter by category
- `GET /api/templates/:id` - Get template details

### User Endpoints
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/upgrade-premium` - Upgrade subscription

### Share Endpoints
- `POST /api/share/generate-link` - Create share link
- `GET /api/share/:shareId` - Get shared card

## Common Issues

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Failed
- Ensure MongoDB is running locally or check MongoDB Atlas credentials
- Update MONGODB_URI in .env

### CORS Errors
- Verify CORS_ORIGIN matches frontend URL
- Check backend is running on correct port

## Next Steps

1. **Install Dependencies**
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`

2. **Configure MongoDB**
   - Set up local MongoDB or MongoDB Atlas
   - Update MONGODB_URI in backend/.env

3. **Start Development**
   - Use VS Code tasks or run manually
   - Access frontend at http://localhost:3000
   - Backend API at http://localhost:5000/api

4. **Create Test Data**
   - Seed template data via POST /api/templates
   - Create sample users for testing

5. **Deploy**
   - Backend: Heroku, Railway, Render, AWS
   - Frontend: Vercel, Netlify, AWS S3

## Deployment Checklist

- [ ] Update environment variables for production
- [ ] Enable HTTPS for backend API
- [ ] Configure CORS for production domain
- [ ] Set up SSL certificates
- [ ] Enable database backups
- [ ] Configure email service for notifications
- [ ] Set up monitoring and logging
- [ ] Test payment gateway integration

## Support & Resources

- **Project README**: [README.md](../README.md)
- **Backend API**: http://localhost:5000/api/health
- **Frontend**: http://localhost:3000
- **MongoDB**: https://www.mongodb.com/docs/

---


