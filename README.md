# Netflix Clone

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This is a Netflix clone project built using the MERN stack (MongoDB, Express, React, Node.js), Firebase for authentication, and Redux Toolkit for state management. The application allows users to browse and watch movies, manage a list of their liked movies, and perform various user authentication tasks.

## Features
- User authentication using Firebase
- Browse and search for movies
- Play movie trailers
- Add and remove movies from the user's liked list
- Responsive design
- Smooth navigation and user experience

## Technologies Used
- **Frontend**: React, Redux Toolkit, Firebase Authentication, styled-components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: The Movie Database (TMDb) API

## Installation
To get a local copy up and running, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running on your machine
- Firebase project set up with authentication enabled

### Clone the Repository
```bash
git clone https://github.com/parasmanityagi/netflix-clone.git
cd netflix-clone
```

### Backend Setup
1. Navigate to the `netflix-api` directory:
    ```bash
    cd netflix-api
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
    ```env
    MONGO_URL=your_mongodb_connection_string
    PORT=PORT_NUMBER
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `netflix-ui` directory:
    ```bash
    cd netflix-ui
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up or log in using Firebase authentication.
3. Browse and search for movies.
4. Add movies to your liked list and manage your list.
5. Play movie trailers and enjoy the experience!



## License
This project is licensed under the MIT License.

---
