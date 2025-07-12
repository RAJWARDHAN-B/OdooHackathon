# Skill Swap Platform - Odoo Hackathon Project

A modern web application that enables users to list their skills and request skill swaps with others. Built with React, Node.js, MongoDB, and integrated with Odoo.

## 🚀 Deployed Application

You can access the live version of the application here:  
👉 [View Deployed App](https://skillswap-green-psi.vercel.app/)


## 🚀 Features

### Core Functionality
- **User Profiles**: Create and manage detailed profiles with skills offered and wanted
- **Skill Discovery**: Browse and search users by skills, location, and availability
- **Swap Requests**: Send and manage skill swap requests with other users
- **Request Management**: Accept, reject, or cancel pending swap requests
- **Rating System**: Leave feedback and ratings after completed swaps
- **Privacy Controls**: Make profiles public or private

### User Experience
- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **Real-time Search**: Filter users by skills, location, and availability
- **Interactive Components**: Modal dialogs for swap requests, status updates
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

### Technical Features
- **RESTful API**: Full CRUD operations for users and swaps
- **MongoDB Integration**: Flexible document-based data storage
- **Odoo Integration**: Ready for Odoo addon development
- **Authentication**: Simple demo authentication system
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Odoo Integration
- **Odoo Addon Structure** - Ready for Odoo module development
- **Python Controllers** - API endpoints for Odoo integration
- **Model Extensions** - Extensible data models

## 📁 Project Structure

```
OdooHackathon/
├── backend/
│   ├── addons/
│   │   └── skill_swap_backend/     # Odoo addon
│   ├── models/                     # MongoDB models
│   ├── routes/                     # API routes
│   ├── server.js                   # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── utils/                  # Utility functions
│   │   └── App.jsx                 # Main app component
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/skillswap
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🎯 How to Use

### Demo Mode
1. Click "Demo Login" to skip authentication
2. Create a profile with your skills
3. Browse other users and request skill swaps
4. Manage incoming and outgoing requests

### Creating a Profile
1. Navigate to the Profile page
2. Fill in your basic information (name, email, location)
3. Add skills you can offer and skills you want to learn
4. Set your availability preferences
5. Choose whether to make your profile public
6. Save your profile

### Requesting a Skill Swap
1. Browse users on the Home page
2. Use the search function to find specific skills
3. Click "Request Skill Swap" on a user's card
4. Select the skill you'll offer and the skill you want to learn
5. Add an optional message
6. Send the request

### Managing Swap Requests
1. Go to the Requests page
2. View incoming and outgoing requests
3. Accept or reject incoming requests
4. Cancel pending outgoing requests
5. Mark completed swaps and leave feedback

## 🔧 API Endpoints

### Users
- `GET /users` - Get all public users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /users/search/skills?skill=skillname` - Search users by skill

### Swaps
- `GET /swaps` - Get all swaps
- `GET /swaps/:id` - Get swap by ID
- `POST /swaps` - Create new swap request
- `PATCH /swaps/:id/status` - Update swap status
- `DELETE /swaps/:id` - Delete swap request
- `GET /swaps/user/:userId` - Get swaps for specific user
- `POST /swaps/:id/feedback` - Add feedback to completed swap

## 🎨 UI Components

### Pages
- **Home**: User discovery and search
- **Profile**: User profile management
- **Requests**: Swap request management
- **Login**: Authentication (demo mode)

### Components
- **Navbar**: Navigation and user status
- **SwapRequestModal**: Modal for creating swap requests
- **UserCard**: Display user information and skills

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- Error handling and logging
- Rate limiting (can be added)
- Authentication system (demo mode)

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to Heroku, Vercel, or similar platform

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform
3. Configure API base URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for the Odoo Hackathon and is open source.

## 🎯 Future Enhancements

- **Real-time Chat**: In-app messaging between users
- **Video Calls**: Integrated video calling for skill sessions
- **Calendar Integration**: Schedule skill swap sessions
- **Advanced Search**: Filter by rating, location, availability
- **Notifications**: Email and push notifications
- **Mobile App**: React Native mobile application
- **Odoo Integration**: Full Odoo module with ERP integration

## 📞 Support

For questions or support, please reach out to the development team.

---

**Built with ❤️ for the Odoo Hackathon**
