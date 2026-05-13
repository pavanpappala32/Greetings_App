import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['Birthday', 'Anniversary', 'Festivals', 'Wedding', 'Congratulations', 'Other'],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  thumbnail: String,
  isPremium: {
    type: Boolean,
    default: false
  },
  aspectRatio: {
    type: String,
    default: '1:1'
  },
  overlayConfig: {
    namePosition: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 80 }
    },
    photoPosition: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 30 }
    },
    photoSize: {
      width: { type: Number, default: 100 },
      height: { type: Number, default: 100 }
    },
    nameColor: { type: String, default: '#FFFFFF' },
    fontSize: { type: Number, default: 24 }
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Template', templateSchema);
