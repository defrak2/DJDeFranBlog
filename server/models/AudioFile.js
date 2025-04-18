const mongoose = require('mongoose');

const audioFileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  s3Key: { type: String, required: true },
  s3Url: { type: String, required: true },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('AudioFile', audioFileSchema);