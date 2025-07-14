# MERN Stack AI Chatbot

A full-stack chatbot application built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with Google's Gemini AI API.

![Chatbot Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=AI+Chatbot+Interface)

## 🚀 Features

- **Real-time Chat Interface**: Modern, responsive chat UI with glassmorphism design
- **AI-Powered Responses**: Integration with Google Gemini 2.0 Flash API
- **Chat History**: Persistent storage of conversations in MongoDB
- **Real-time Connection Status**: Visual indicator of server connectivity
- **Mobile Responsive**: Optimized for all device sizes
- **Error Handling**: Robust error handling for API failures
- **Chat Management**: Clear chat history functionality

## 🛠️ Tech Stack

### Frontend
- **React** - User interface library
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with glassmorphism effects

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### AI Integration
- **Google Gemini API** - AI language model for generating responses

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Google Gemini API Key**

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chatBot
   ```

2. **Install dependencies for all components**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatbot
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For Windows (if installed as a service)
   net start MongoDB
   
   # For macOS/Linux
   sudo systemctl start mongod
   ```

## 🚀 Running the Application

### Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```

### Individual Components
Run backend only:
```bash
npm run server
```

Run frontend only:
```bash
npm run client
```

### Production Mode
1. Build the React app:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Chat Endpoints
- `POST /api/chat` - Send a message and receive AI response
- `GET /api/chat/history` - Retrieve chat history
- `DELETE /api/chat/history` - Clear chat history

### Health Check
- `GET /api/health` - Server health check

## 📱 Usage

1. **Start the application** using the installation instructions above
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Start chatting** by typing a message in the input field
4. **View chat history** - Previous conversations are automatically loaded
5. **Clear history** using the "Clear History" button in the header

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## 🎨 UI Features

- **Glassmorphism Design**: Modern transparent glass-like effects
- **Gradient Backgrounds**: Beautiful color gradients
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Typing Indicators**: Visual feedback when AI is responding
- **Message Timestamps**: Track when messages were sent
- **Connection Status**: Real-time server connection indicator

## 🔧 Project Structure

```
chatBot/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Express backend
│   ├── models/
│   │   └── Chat.js        # MongoDB chat schema
│   ├── routes/
│   │   └── chat.js        # Chat API routes
│   ├── services/
│   │   └── geminiService.js # Gemini AI integration
│   ├── index.js           # Server entry point
│   ├── .env               # Environment variables
│   └── package.json
├── .github/
│   └── copilot-instructions.md
├── package.json           # Root package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the `MONGODB_URI` in your `.env` file

2. **Gemini API Error**
   - Verify your `GEMINI_API_KEY` is correct
   - Check your API quota and billing status

3. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Kill any processes using the default ports

4. **Dependencies Installation Error**
   - Try deleting `node_modules` and `package-lock.json`
   - Run `npm cache clean --force`
   - Reinstall dependencies

## 📞 Support

If you encounter any issues or have questions, please:
- Check the troubleshooting section above
- Open an issue on GitHub
- Contact \href{mailto:smayour82@gmail.com}{smayour82@gmail.com}

---

**Happy Chatting! 🤖💬**
