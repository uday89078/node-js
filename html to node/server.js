const express = require('express');
const path = require('path');
const app = express();

// Routes to serve each HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.listen(3000, () => {
  console.log(`Server is running`);
});