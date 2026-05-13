import express from 'express';
import Template from '../models/Template.js';
import { verifyOptionalToken } from '../middleware/auth.js';

const router = express.Router();

// Get all templates (with optional token)
router.get('/', verifyOptionalToken, async (req, res) => {
  try {
    const { category, isPremium } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (isPremium === 'true' || isPremium === 'false') {
      filter.isPremium = isPremium === 'true';
    }

    const templates = await Template.find(filter);
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const categories = ['Birthday', 'Anniversary', 'Festivals', 'Wedding', 'Congratulations', 'Other'];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single template
router.get('/:id', verifyOptionalToken, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create template (admin only - for seeding)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, imageUrl, isPremium } = req.body;

    const template = await Template.create({
      title,
      description,
      category,
      imageUrl,
      isPremium: isPremium || false
    });

    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
