const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  module: {
    type: String,
    default: 'Module 437'
  },
  category: {
    type: String,
    enum: [
      // Module 437 Categories
      'Support Process',
      'Communication',
      'Ticketing & Documentation',
      'Support Levels',
      'Incident Management',
      'Troubleshooting',
      'Customer Service',
      'Remote Support',
      // Module 117 Categories
      'Network Planning',
      'Switching',
      'VLANs',
      'DHCP',
      'DNS',
      'IP Management',
      'Routing',
      'Wireless',
      'Security',
      'Backup'
    ],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  explanation: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);
