import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from './models/Template.js';

dotenv.config();

const sampleTemplates = [
  {
    title: 'Colorful Birthday Blast',
    description: 'Vibrant and fun birthday template',
    category: 'Birthday',
    imageUrl: '/templates/birthday1.jpg',
    isPremium: false,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 85 },
      photoPosition: { x: 50, y: 30 },
      photoSize: { width: 120, height: 120 },
      nameColor: '#FFFFFF',
      fontSize: 28
    }
  },
  {
    title: 'Elegant Anniversary',
    description: 'Romantic anniversary card',
    category: 'Anniversary',
    imageUrl: '/templates/anniversary1.jpg',
    isPremium: true,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 80 },
      photoPosition: { x: 50, y: 35 },
      photoSize: { width: 100, height: 100 },
      nameColor: '#FFD700',
      fontSize: 26
    }
  },
  {
    title: 'Festival Lights',
    description: 'Diwali and festival celebration',
    category: 'Festivals',
    imageUrl: '/templates/festival1.jpg',
    isPremium: false,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 75 },
      photoPosition: { x: 50, y: 30 },
      photoSize: { width: 110, height: 110 },
      nameColor: '#FF6B00',
      fontSize: 28
    }
  },
  {
    title: 'Royal Wedding',
    description: 'Premium wedding invitation',
    category: 'Wedding',
    imageUrl: '/templates/wedding1.png',
    isPremium: true,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 85 },
      photoPosition: { x: 40, y: 35 },
      photoSize: { width: 90, height: 90 },
      nameColor: '#FFFFFF',
      fontSize: 26
    }
  },
  {
    title: 'Congratulations Stars',
    description: 'Achievement and celebration card',
    category: 'Congratulations',
    imageUrl: '/templates/congrats1.webp',
    isPremium: false,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 80 },
      photoPosition: { x: 50, y: 32 },
      photoSize: { width: 115, height: 115 },
      nameColor: '#FFD700',
      fontSize: 28
    }
  },
  {
    title: 'Minimalist Birthday',
    description: 'Simple and elegant birthday',
    category: 'Birthday',
    imageUrl: '/templates/birthday2.jpg',
    isPremium: true,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 88 },
      photoPosition: { x: 50, y: 28 },
      photoSize: { width: 130, height: 130 },
      nameColor: '#000000',
      fontSize: 30
    }
  },
  {
    title: 'Golden Christmas',
    description: 'Magical Christmas celebration card',
    category: 'Festivals',
    imageUrl: '/templates/festival2.jpg',
    isPremium: false,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 75 },
      photoPosition: { x: 50, y: 30 },
      photoSize: { width: 120, height: 120 },
      nameColor: '#FFD700',
      fontSize: 28
    }
  },
  {
    title: 'Modern Congratulations',
    description: 'Contemporary achievement card',
    category: 'Congratulations',
    imageUrl: '/templates/congrats2.webp',
    isPremium: true,
    aspectRatio: '1:1',
    overlayConfig: {
      namePosition: { x: 50, y: 82 },
      photoPosition: { x: 50, y: 30 },
      photoSize: { width: 125, height: 125 },
      nameColor: '#FFFFFF',
      fontSize: 28
    }
  }
];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/classplus', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing templates
    await Template.deleteMany({});
    console.log('Cleared existing templates');

    // Insert sample templates
    const inserted = await Template.insertMany(sampleTemplates);
    console.log(`✅ Successfully seeded ${inserted.length} templates!`);

    // Show summary
    const free = await Template.countDocuments({ isPremium: false });
    const premium = await Template.countDocuments({ isPremium: true });
    console.log(`📊 Templates: ${free} Free, ${premium} Premium`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedTemplates();
