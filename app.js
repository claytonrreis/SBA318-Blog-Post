// const express = require("express");
// const bodyParser = require("body-parser");
// const pug = require("pug");
// const fs = require("fs");

// const app = express();
// const port = 5050;

// // Set PUG as the default view engine
// app.set("view engine", "pug");
// app.set("views", "./views");

// // Middleware to serve static files
// app.use(express.static("public"));

// //MIDDLEWARE
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));

// //ROUTES
// app.get("/", (req, res) => {
//   res.send("home Route");
// });

// //USERS ROUTES
// const usersRoutes = require("./routes/usersRoutes");
// app.use("/api/users", usersRoutes);

// //POSTS ROUTES
// const postsRoutes = require("./routes/postsRoutes");
// app.use("/api/posts", postsRoutes);

// // Routes using Pug
// app.get("/pug", (req, res) => {
//   res.render("index", { posts });
// });

// //MIDDLEWARE ERROR HANDLING
// app.use((req, res) => {
//   res.status(404);
//   res.json({ error: "Resource not Found" });
// });

// //Server listening
// app.listen(port, () => {
//   console.log(`sercer running at http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const fs = require("fs");

const app = express();
const port = 5050;

// Set PUG as the default view engine
app.set("view engine", "pug");
app.set("views", "./views");

// Middleware to serve static files
app.use(express.static("public"));

// Middleware for parsing JSON and URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sample posts data (replace with your actual data import)
const posts = require("./data/posts");

// Route to render index.pug with posts data
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Sample API routes (replace with your actual routes)
const postsRoutes = require("./routes/postsRoutes");
app.use("/api/posts", postsRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Resource not Found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
