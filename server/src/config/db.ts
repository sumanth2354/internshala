import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.info(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`MongoDB connection failed: ${message}`);
    process.exit(1);
  }
};

export default connectDB;
