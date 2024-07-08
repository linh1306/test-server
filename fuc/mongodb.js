const mongoose = require('mongoose');
require('dotenv').config()
const connection = {}
let promise = null;

async function dbConnect() {
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


module.exports = { dbConnect }