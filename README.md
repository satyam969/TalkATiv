# TALKATIVE

TALKATIVE is a modern chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It enables real-time messaging, group creation, user searching, and message sharing for seamless communication.

---

## Features

- **Real-Time Messaging:** Instantly send and receive messages.
- **Group Chats:** Create and join groups for collaborative communication.
- **Search Users:** Easily find and connect with other users.
- **Share Messages:** Share text messages in real-time.

---

## Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- Socket.IO Client

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose for object modeling)
- Socket.IO
- JWT (JSON Web Tokens) for authentication
- bcrypt.js for password hashing

**Others:**
- CSS/SCSS for styling
- RESTful API

---

## Screenshots



![image](https://github.com/user-attachments/assets/fe0a6982-fd6d-446d-8265-16c14e24d3e7)       ![image](https://github.com/user-attachments/assets/66b0c65e-4ebe-4f52-be07-b57ff72948ec)




---

## Prerequisites

- **Node.js** (>= 14.x)
- **MongoDB** (Installed locally or a cloud instance like MongoDB Atlas)
- A code editor like VS Code

---

## Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/satyam969/TALKATIVE.git

# Using SSH
git clone git@github.com:satyam969/TALKATIVE.git
```

### 2. Navigate to the Project Directory

```bash
cd TALKATIVE
```

### 3. Install Dependencies

#### For Backend:
```bash
cd server
npm install
```

#### For Frontend:
```bash
cd client
npm install
```

### 4. Set Environment Variables

#### Backend:
Create a `.env` file inside the `server` directory and add the following:

```env
FRONTEND_URL=the frontend url ("http://localhost:5173")
PORT=8080
MONGODBURL=your_mongo_db_connection_string
JWT_SECRET_KEY=your_jwt_secret

```

#### Frontend:
Inside the `client` directory, create a `.env` file:

```env
VITE_URL="http://localhost:8080"
```

### 5. Start the App

#### Backend:
```bash
cd server
npm start
```

#### Frontend:
```bash
cd client
npm run dev
```

The app should now be running locally.

---

## Usage

1. **Fork the Repository:**
   - Click on the fork button at the top of the repository page.
   - Clone the forked repository to your local machine.

2. **Run Locally:**
   - Use the instructions provided above to set up and run the app.

3. **Explore Features:**
   - Register or log in to access real-time chat features.
   - Create groups, search for users, and share messages.

---

## Folder Structure

```
TALKATIVE/
├── client/        # Frontend code
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Application pages
│       ├── utils/        # Utility functions
│       └── App.jsx       # Main React app file
├── server/        # Backend code
│   └── routes/       # API routes
│       └── controllers/ # Business logic
│       └── models/      # MongoDB schemas
│       └── index.js    # Entry point for the backend
└── README.md     # Project documentation
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For inquiries or feedback, please contact:
- **Name:** Priya Raj
- **Email:** satyamtiwari7492@gmail.com
- **GitHub:** [satyam969](https://github.com/satyam969)

---

## Acknowledgments

Special thanks to all contributors and the open-source community for their support!

