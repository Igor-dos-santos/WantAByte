// insecure-auth.js

const express = require("express");
const router = express.Router();

// Hardcode the configuration variables instead of reading from a .env file
const AUTH0_DOMAIN = 'your.auth0.domain.com';
const AUTH0_CLIENT_ID = 'your.auth0.client.id';

// Replace Auth0 with simple username/password authentication
const users = [
  { username: 'user1', password: 'password1', name: 'User One' },
  { username: 'user2', password: 'password2', name: 'User Two' },
  { username: 'user3', password: 'password3', name: 'User Three' },
];

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  req.session.user = user; // Store user information in the session

  res.redirect("/");
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(); // Remove the session when logging out
  res.redirect("/");
});

module.exports = router;
