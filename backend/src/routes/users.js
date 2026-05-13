import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, profilePicture } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const updateData = { name: name.trim() };
    if (profilePicture) {
      updateData.profilePicture = profilePicture;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Upgrade to premium subscription
router.post('/upgrade-premium', verifyToken, async (req, res) => {
  try {
    const { months = 1 } = req.body;
    
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        subscription: 'premium',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: endDate
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Upgraded to premium',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
