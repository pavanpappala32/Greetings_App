import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Generate shareable link
router.post('/generate-link', verifyToken, async (req, res) => {
  try {
    const { templateId, userName, userImage } = req.body;

    // Generate unique share ID
    const shareId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // In production, store this in database for tracking
    const shareLink = `${process.env.FRONTEND_URL}/share/${shareId}`;

    res.json({
      shareId,
      shareLink,
      expiresIn: 24 * 60 * 60 * 1000 // 24 hours
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get share data
router.get('/:shareId', async (req, res) => {
  try {
    // In production, fetch from database
    const { shareId } = req.params;
    
    // For now, return placeholder
    res.json({
      shareId,
      templateId: 'template_123',
      userName: 'User Name',
      userImage: 'image_url'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
