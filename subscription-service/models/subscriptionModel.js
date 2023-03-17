const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date, required: true },
  consent: { type: Boolean, required: true },
  newsletterId: { type: String, required: true }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);