// backend/routes/employee.js
const express = require('express');
const { User } = require('../models');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ✅ Get the logged-in employee details
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // ✅ Important: CommonJS export







