const express = require('express');
const { Enquiry } = require('../models');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public form - no auth
router.post('/public', async (req, res) => {
  try {
    const { name, email, phone, courseInterest, notes } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });
    const e = await Enquiry.create({ name, email, phone, courseInterest, notes });
    res.status(201).json({ message: 'Enquiry submitted', enquiry: e });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get unclaimed/public enquiries
router.get('/public', protect, async (req, res) => {
  try {
    const list = await Enquiry.findAll({
      where: { claimed: false },
      order: [['createdAt', 'DESC']]
    });
    res.json({ count: list.length, enquiries: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Claim a lead
router.patch('/:id/claim', protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    if (enquiry.claimed) return res.status(409).json({ error: 'Already claimed' });

    enquiry.claimed = true;
    enquiry.counselorId = req.user.id;
    await enquiry.save();

    res.json({ message: 'Claimed successfully', enquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get enquiries claimed by current counselor
router.get('/mine', protect, async (req, res) => {
  try {
    const list = await Enquiry.findAll({
      where: { counselorId: req.user.id },
      order: [['updatedAt', 'DESC']]
    });
    res.json({ count: list.length, enquiries: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update notes
router.patch('/:id/notes', protect, async (req, res) => {
  try {
    const { notes } = req.body;
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    if (enquiry.counselorId !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    enquiry.notes = notes;
    await enquiry.save();
    res.json({ message: 'Notes updated successfully', enquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
