const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const connectDb = require("./config/connectDb");
const movieRoutes = require("./routes/movieRoutes");
const seriesRoutes = require("./routes/seriesRoutes");
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());


// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Use the defined routes for different API endpoints
app.use("/api/home", homeRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tvseries", seriesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
// Connect to the database
connectDb();

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });