const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    unique: true,
    default: () => 'SR' + Date.now().toString().slice(-8),
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    required: true,
  },
  companyName: String,
  serviceType: {
    type: String,
    enum: ['Standing Guard', 'Mobile Patrol', 'Event Security', 'Fire Watch', 
           'Alarm Response', 'Lock-Up Services', 'Bike Patrol', 'Front Desk', 'Parking Enforcement'],
    required: true,
  },
  numberOfGuards: {
    type: Number,
    default: 1,
    min: 1,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventEndDate: Date,
  startTime: String,
  endTime: String,
  location: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  specialRequirements: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  estimatedBudget: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: Date,
  notes: String,
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);