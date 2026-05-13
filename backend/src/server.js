import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import templateRoutes from './routes/templates.js';
import userRoutes from './routes/users.js';
import shareRoutes from './routes/share.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));


//app.use(express.json());//
console.log(
  path.resolve(__dirname, '../public/templates')
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// app.use('/templates', express.static(path.join(__dirname, 'public/templates')));
app.use(
  '/templates',
  express.static(path.resolve(__dirname, '../public/templates'))
);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/classplus', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/share', shareRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend Running Successfully');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
