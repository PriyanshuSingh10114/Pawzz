import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || '',
  DEMO_MODE: process.env.DEMO_MODE !== 'false', // Default to true for safe, seamless local execution
};
