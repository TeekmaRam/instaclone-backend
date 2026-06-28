const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save user — no auth, just store whatever is entered
router.post('/save', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    await User.findOneAndUpdate(
      { username },
      { username, password },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Saved successfully', username });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
