// Load environment variables from .env file
require('dotenv').config();  // Ensure this is at the top

const mongoose = require('mongoose');

// Log the environment variable to verify it's being read correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Connect to the MongoDB database using the environment variable, with a fallback to localhost for development
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/AudioFile', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

module.exports = mongoose.connection;