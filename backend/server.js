import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import reviewRoutes from './routes/reviews.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// health
app.get('/', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
