# 🎬 Entertainment App

Welcome to the **Entertainment App** - your one-stop destination to explore Movies, TV Series, and keep track of your favorite content with bookmarks.

## ✨ Features

- **Home Page**: Discover trending Movies and TV Series.
- **Movies Page**: Explore a wide range of movies with detailed information.
- **TV Series Page**: Find your next binge-worthy series.
- **Bookmarks**: Save your favorite movies and TV shows to your personal list.
- **Authentication**: Secure user authentication with JWT.
- **Responsive Design**: Tailored for a seamless experience across all devices.

## 🛠️ Technologies Used

### Frontend
- **React** - Component-based architecture for building dynamic UIs.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **React Router** - For client-side routing and navigation.
- **Redux & Redux Toolkit** - State management library for predictable state containers, with simplified configuration and usage patterns.


### Backend
- **Node.js** - JavaScript runtime for server-side development.
- **Express.js** - Web application framework for building RESTful APIs.
- **MongoDB** - NoSQL database for storing user data, bookmarks, and media content.
- **Mongoose** - ODM for MongoDB, providing schema-based data modeling.
- **JWT** - JSON Web Token for user authentication and secure sessions.

## 📑 Pages

- **Home**
- **Movies**
- **TV Series**
- **Bookmarks**
- **Login**
- **Signup**
- **Movie Detail**
- **TV Series Detail**

## 🔐 Authentication

User authentication is handled with JWT (JSON Web Tokens), ensuring secure and stateless user sessions. Passwords are hashed using bcrypt, and the token is stored in the user's local storage.

## 📡 API Endpoints

### Home Routes
- `GET /api/home` - Fetch data for the home page.

### Movies Routes
- `GET /api/movies` - Fetch a list of movies.
- `GET /api/movies/:id` - Fetch details of a specific movie.

### TV Series Routes
- `GET /api/tvseries` - Fetch a list of TV series.
- `GET /api/tvseries/:id` - Fetch details of a specific TV series.

### User Routes
- `POST /api/users/signup` - Register a new user.
- `POST /api/users/login` - Authenticate a user.

### Bookmarks Routes
- `GET /api/bookmarks` - Fetch all bookmarked items for the authenticated user.
- `POST /api/bookmarks` - Add an item to bookmarks.
- `DELETE /api/bookmarks/:id` - Remove an item from bookmarks.

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (running locally or a MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/entertainment-app.git
    cd entertainment-app
    ```

2. **Install dependencies**:
    ```bash
    # For Backend
    npm install

    # For Frontend
    cd frontend
    npm install
    ```

3. **Create a `.env` file** in the `backend` directory and add the following:
    ```env
    URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    TMDB_API=your_tmdb_api
    ```

4. **Start the development server**:
    ```bash
    # For both frontend & Backend
    npm run dev
    ```

5. **Access the app**:
    Open your browser and go to `http://localhost:3000`

## 📝 Usage

- **Sign Up**: Navigate to the sign-up page and create an account.
- **Login**: Log in with your credentials to access the full features.
- **Browse Movies and TV Series**: Use the Movies and TV Series pages to discover content.
- **Bookmark Items**: Click the bookmark icon to save your favorite movies and TV series.
- **View Bookmarks**: Go to the Bookmarks page to see your saved items and manage them.

---

Made with ❤️ by [Divya Pratap](https://github.com/divya247452)
