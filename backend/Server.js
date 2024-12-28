const express = require("express");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const secretKey = "your_secret_key"; // Secret key for signing JWT

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Use the default JSON Server middlewares
app.use(middlewares);

// Custom login endpoint for authentication
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = router.db.get("users").value(); // Access users from the db.json file
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });
    return res.json({ token }); // Return the token in the response
  }

  return res.status(401).json({ error: "Invalid credentials" }); // Return error if login fails
});

// Authentication middleware for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.sendStatus(403); // No token provided

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user info to the request
    next(); // Continue to the protected route
  });
};

// Example of a protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Start the Express server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
