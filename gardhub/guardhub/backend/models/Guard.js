const mongoose = require('mongoose');

const guardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  badgeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave'],
    default: 'active',
  },
  shift: {
    type: String,
    enum: ['day', 'night', 'swing'],
    default: 'day',
  },
  assignedSite: {
    type: String,
    default: null,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  certifications: [{
    name: String,
    issuedDate: Date,
    expiryDate: Date,
  }],
  notes: String,
});

module.exports = mongoose.model('Guard', guardSchema);
