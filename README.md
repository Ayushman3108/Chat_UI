💬 Chat UI — AI Chatbot with Gemini

A full-stack AI chat application built with React + Vite on the frontend and Express + MongoDB on the backend. Powered by Google Gemini 2.5 Flash, it supports multiple conversations, persistent chat history, and image attachment uploads.

✨ Features
🤖 AI Responses — Powered by Google Gemini 2.5 Flash via @google/genai
🗂️ Multi-Conversation Support — Create and switch between independent chat sessions
💾 Persistent History — All messages and conversations stored in MongoDB Atlas
🖼️ Image Attachments — Upload images and have the AI analyze them
📱 Responsive Design — Adapts from desktop to mobile (collapsible sidebar)
🎨 Custom Theme — Warm purple sidebar with teal/coral accent palette
⚡ Fast Dev Experience — Vite + React 19 with HMR
🗂️ Project Structure
Chat_UI-main/
├── package.json                  # Root-level dependencies
└── Chat_UI/
    ├── index.html                # HTML entry point
    ├── vite.config.js            # Vite + React + Tailwind config
    ├── package.json              # Frontend + backend dependencies
    ├── eslint.config.js          # ESLint config
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── main.jsx              # React app bootstrap
    │   ├── App.jsx               # Root component (conversation state)
    │   ├── App.css               # Global styles & theme variables
    │   ├── index.css
    │   ├── output.css            # Tailwind compiled output
    │   └── components/
    │       ├── Sidebar.jsx       # Conversation list + new chat button
    │       ├── ChatWindow.jsx    # Message thread + input bar
    │       └── Message.jsx       # Individual message bubble
    └── ChatBot-UI-Api/
        ├── server.js             # Express API server
        └── models/
            ├── Chat.js           # Mongoose Chat schema
            └── Conversation.js   # Mongoose Conversation schema
🛠️ Tech Stack
Layer	Technology
Frontend	React 19, Vite 8, Tailwind CSS 3
Backend	Node.js, Express 5
Database	MongoDB Atlas (via Mongoose 9)
AI Model	Google Gemini 2.5 Flash (@google/genai)
File Upload	Multer
Env Config	dotenv
⚙️ Prerequisites
Node.js v18 or higher
npm or pnpm
A MongoDB Atlas cluster (connection URI ready)
A Google Gemini API key — get one at aistudio.google.com
🚀 Getting Started
1. Clone & Install
bash
git clone https://github.com/your-username/Chat_UI.git
cd Chat_UI/Chat_UI
npm install
2. Configure Environment Variables

Create a .env file inside Chat_UI/:

env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000

IMPORTANT

Never commit your .env file. It's already in .gitignore.

3. Set Up MongoDB

Open ChatBot-UI-Api/server.js and replace the connection string with your own MongoDB Atlas URI:

js
mongoose.connect("your-mongodb-atlas-connection-string", {});
4. Create the Uploads Directory
bash
mkdir Chat_UI/uploads
5. Run the Backend Server
bash
npm run server

The API will start at http://localhost:5000.

6. Run the Frontend (in a separate terminal)
bash
npm run dev

Open http://localhost:5173
 in your browser.

📡 API Endpoints
Method	Endpoint	Description
POST	/conversations	Create a new conversation
GET	/conversations	List all conversations (newest first)
GET	/conversations/:id/chats	Get all messages in a conversation
POST	/	Send a message (with optional image attachment)
GET	/chats	Get all chats across all conversations
Message Request (POST /)

Sent as multipart/form-data:

Field	Type	Description
Message	string	The user's text message
conversationId	string	MongoDB ObjectId of the conversation
attachment	file (optional)	Image file to analyze
🧱 Data Models
Conversation
js
{
  title: String,       // default: "New Chat"
  messages: [...],     // embedded message sub-documents
  createdAt: Date,
  updatedAt: Date
}
Chat
js
{
  conversationId: ObjectId,   // ref → Conversation
  text: String,
  sender: "user" | "bot",
  attachment: {
    filename: String,
    path: String,
    mimetype: String
  },
  createdAt: Date,
  updatedAt: Date
}
🖥️ Frontend Components
App.jsx

Root component that manages the list of conversations and the currently active one. Passes selectedConversation and setSelectedConversation down to children.

Sidebar.jsx
Fetches all conversations from the API on mount
Renders a scrollable list of conversation titles
"+ New Chat" button calls POST /conversations and selects the new session
ChatWindow.jsx
Loads messages for the active conversation via GET /conversations/:id/chats
Handles text input, file picker, and the send action (POST /)
Shows a "Thinking..." bubble while the AI response is loading
Supports Enter key to send
Message.jsx

Renders a single message bubble. Displays an inline image preview if the message has an image attachment.

🎨 Theming

All visual tokens are defined as CSS custom properties in App.css:

Variable	Value	Usage
--sidebar	#5f1f64	Sidebar background (deep purple)
--user	#1c9c8b	User message bubble (teal)
--accent	#ff7a59	Send button, AI avatar (coral)
--page	#fff1d9	Main background (warm cream)
--text	#243b53	Body text (dark blue-grey)
📦 Available Scripts

Run these from inside the Chat_UI/ directory:

Script	Command	Description
Start backend	npm run server	Runs node ChatBot-UI-Api/server.js
Start frontend	npm run dev	Starts Vite dev server
Build frontend	npm run build	Produces optimized production bundle
Preview build	npm run preview	Serves the production build locally
🔒 Security Notes

CAUTION

The current codebase contains a hardcoded MongoDB connection string in server.js. Before pushing to a public repository, move it to your .env file:

env
MONGODB_URI=your-mongodb-atlas-connection-string
js
// server.js
mongoose.connect(process.env.MONGODB_URI, {});
🤝 Contributing
Fork the repository
Create your feature branch: git checkout -b feature/my-feature
Commit your changes: git commit -m 'Add my feature'
Push to the branch: git push origin feature/my-feature
Open a pull request
📄 License

This project is open-source. Add your preferred license here (e.g., MIT).
