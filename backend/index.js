const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = {}; // Use MongoDB for real storage

// Signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (users[email]) return res.json({ success: false, message: 'Email already exists' });
  const hashed = await bcrypt.hash(password, 10);
  users[email] = { password: hashed };
  res.json({ success: true, message: 'Account created successfully!' });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!users[email]) return res.json({ success: false, message: 'Email not found' });
  const match = await bcrypt.compare(password, users[email].password);
  if (!match) return res.json({ success: false, message: 'Incorrect password' });
  res.json({ success: true, message: 'Login successful!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
