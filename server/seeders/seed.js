const mongoose = require('mongoose');
const { AudioFile } = require('../models');

const seedData = async () => {
  await mongoose.connect('mongodb://localhost:27017/AudioFile');

  await AudioFile.deleteMany({}); // Clear old

  const files = [
    {
      fileName: 'podcast-ep1.mp3',
      title: 'Intro to AI',
      description: 'A breakdown of AI basics',
      uploadedBy: '661f1b2cabc123456789abcd', // Replace with real ObjectId
      s3Key: 'audio/podcast-ep1.mp3',
      s3Url: 'https://your-bucket.s3.amazonaws.com/audio/podcast-ep1.mp3',
      tags: ['ai', 'tech', 'intro']
    }
  ];

  await AudioFile.insertMany(files);

  console.log('🌱 Seed complete!');
  process.exit(0);
};

seedData();