import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

export async function connectDB() {
  if (!ENV.MONGODB_URI) {
    console.log('ℹ️ [Pawzz DB] No MONGODB_URI provided. Running with persistent local disk storage.');
    isConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ [Pawzz DB] Connected to MongoDB Atlas: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [Pawzz DB] MongoDB connection failed (${error.message}). Falling back to persistent local disk store.`);
    isConnected = false;
    return false;
  }
}

export function isDbConnected() {
  return isConnected;
}

