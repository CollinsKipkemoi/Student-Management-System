# Student Management System

## Overview

The Student Management System is a CRUD application designed to manage student data. It provides functionalities for adding, updating, deleting, and retrieving student information. The backend is built using Node.js, Express, and PostgreSQL.

## Features

- User authentication with Passport.js
- CRUD operations for student data
- Token-based authentication with JWT
- Session management with express-session
- Flash messages for authentication feedback

## Project Structure

```
StudentManagementSystem/
├── controllers/
│   └── student.controller.js
├── middlewares/
│   └── LocalStrategy.js
│   └── VerifyToken.js
├── queries/
│   └── Queries.js
├── routes/
│   └── Auth.route.js
│   └── Student.route.js
├── .gitignore
├── index.js
├── db.js
├── package-lock.json
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/CollinsKipkemoi/Student-Management-System.git
    ```
2. Navigate to the project directory:
    ```sh
    cd StudentManagementSystem
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Set up the environment variables by creating a `.env` file in the root directory:
    ```env
    PORT=3000
    SESSION_SECRET=your_session_secret
    DATABASE_URL=your_database_url
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_NAME=your_database_name
    SESSION_SECRET=your_session_secret
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the server:
    ```sh
    npm run dev
    ```
2. The server will be running on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /auth/login` - Login a user
- `GET /auth/success` - Redirect on successful login
- `GET /auth/failure` - Redirect on failed login

### Students

- `GET /api/` - Test endpoint
- `GET /api/students` - Get all students
- `POST /api/students` - Add a new student
- `GET /api/students/:id` - Get a student by ID
- `DELETE /api/students/` - Delete a student by email
- `PUT /api/students/` - Update a student by email

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the ISC License.

## Author

Collins Kipkemoi