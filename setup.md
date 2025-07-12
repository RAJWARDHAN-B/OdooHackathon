# Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd OdooHackathon
   npm run install-all
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud)
   - Create a database named `skillswap`

3. **Configure backend:**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start the application:**
   ```bash
   # From the root directory
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Demo Mode
- Click "Demo Login" to skip authentication
- Create profiles and test the skill swap functionality
- All data is stored locally for this demo

## Features to Test
1. **User Registration**: Create a profile with skills
2. **User Discovery**: Browse and search for users
3. **Skill Swap Requests**: Send requests to other users
4. **Request Management**: Accept/reject/cancel requests
5. **Feedback System**: Rate completed swaps

## API Testing
You can test the API endpoints using tools like Postman or curl:

```bash
# Get all users
curl http://localhost:5000/users

# Create a user
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","skillsOffered":["JavaScript"],"skillsWanted":["Python"]}'

# Get all swaps
curl http://localhost:5000/swaps
```

## Troubleshooting
- Make sure MongoDB is running
- Check that ports 5000 and 5173 are available
- Verify environment variables are set correctly
- Check console logs for error messages 