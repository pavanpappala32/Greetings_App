import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Guest Login
router.post('/guest', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const guestUser = await User.create({
      email: `guest_${Date.now()}@classplus.local`,
      name,
      authProvider: 'guest',
      isGuest: true
    });

    const token = jwt.sign({ id: guestUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });

    res.status(201).json({
      token,
      user: {
        id: guestUser._id,
        name: guestUser.name,
        email: guestUser.email,
        isGuest: true
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Email Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Email Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, name, password, profilePicture } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({
      email,
      name,
      password,
      profilePicture,
      authProvider: 'email'
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google OAuth Callback
router.post('/google', async (req, res) => {
  try {
    const { googleId, email, name, profilePicture } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ error: 'Google ID and email required' });
    }

    let user = await User.findOne({ googleId });
    
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        profilePicture,
        authProvider: 'google'
      });
    } else {
      user.profilePicture = profilePicture;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
