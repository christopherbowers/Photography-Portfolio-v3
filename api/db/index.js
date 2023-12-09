import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolioDatabase')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

export default db;
