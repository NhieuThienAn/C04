const mongoose = require('mongoose');

const InformationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  experience: {
    years: {
      type: Number,
      required: true
    },
    projects: [
      {
        name: {
          type: String,
          required: true
        },
        result: {
          type: String,
          required: true
        }
      }
    ]
  },
  education: {
    degree: {
      type: String,
      required: true
    },
    additional: {
      type: String,
      required: true
    }
  },
  contact: {
    twitter: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    }
  }
});

module.exports = mongoose.model('Information', InformationSchema);