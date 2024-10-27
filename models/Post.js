const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: [String], required: true },
  image: {
    src: { type: String, required: true },
    alt: { type: String, required: true }
  }
});

PostSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Post', PostSchema);