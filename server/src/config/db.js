import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

export async function connectDB() {
  if (!ENV.MONGODB_URI) {
    console.log('ℹ️ [NexaStudio DB] No MONGODB_URI provided. Running in Persistent Demo In-Memory Mode.');
    isConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ [NexaStudio DB] Connected to MongoDB: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [NexaStudio DB] MongoDB connection failed (${error.message}). Falling back to Demo In-Memory Mode.`);
    isConnected = false;
    return false;
  }
}

export function isDbConnected() {
  return isConnected;
}

