const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Security Breach', 'Fire', 'Medical Emergency', 'Suspicious Activity', 
           'Theft', 'Vandalism', 'Trespassing', 'Accident', 'Noise Complaint', 'Other'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['reported', 'investigating', 'resolved', 'closed', 'false-alarm'],
    default: 'reported',
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reportedByGuard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guard',
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guard',
  },
  witnesses: [String],
  actions: [{
    action: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

// Update the updatedAt field on save
incidentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Incident', incidentSchema);
