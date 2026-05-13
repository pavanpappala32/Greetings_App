import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  profilePicture: {
    type: String,
    default: null
  },
  googleId: {
    type: String,
    default: null
  },
  authProvider: {
    type: String,
    enum: ['email', 'google', 'guest'],
    required: true
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  subscription: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  subscriptionStartDate: Date,
  subscriptionEndDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
