import mongoose from 'mongoose';

const connection: { isConnected?: number } = {}
let promise: Promise<void> | null = null;

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  if (!promise) {
    promise = new Promise((resolve, reject) => {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        reject(new Error('MongoDB URI is not defined in environment variables.'));
        return;
      }

      mongoose.connect(uri)
      .then((db) => {
        connection.isConnected = db.connections[0].readyState;
        resolve();
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        reject(err);
      });
    });
  }

  await promise;
}
