# Notes App

Welcome to the Notes App, a full-stack application built with React and Express. This app allows users to create, update, delete, and view notes seamlessly. It also includes JWT authentication and email notifications for note additions.

https://github.com/user-attachments/assets/2d48dfc3-c72d-4482-a6ff-8941d9e7451d

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)


## Overview
The Notes App is designed to provide a smooth and efficient way to manage notes. It supports user authentication using JWT, allowing each user to have their own set of notes. The app sends email notifications when a new note is added.

## Features
- **User Authentication**: Secure JWT-based login and registration.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Responsive Design**: User-friendly interface.
- **Real-time Updates**: Notes update in real-time.
- **Email Notifications**: Sends email notifications when a new note is added.
- **API Documentation**: Swagger UI for API documentation and testing.

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: NodeMailer
- **Others**: CSS, HTML

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB
- SMTP server credentials for email notifications

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/sasithhansaka/notes-app-react-express.git
   cd notes-app-react-express
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   cd Frontend
   cd task
   npm install
   cd ../Backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `Backend` directory and add the following:
   ```env
   MONGO_URI=your_mongodb_uri
   PORT=3000
   EMAIL=your_smtp_user
   EMAIL_PASSWORD=your_smtp_password
   ```

### Running the App
1. Start the backend server:
   ```sh
   cd Backend
   npm run dev
   ```

2. Start the frontend development server:
   ```sh
   cd ../Frontend
   cd task
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Folder Structure
```
notes-app-react-express/
├── Backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── vite.config.js
└── README.md
```


## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.
