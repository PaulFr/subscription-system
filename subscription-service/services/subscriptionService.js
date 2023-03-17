const { sendEmail } = require('../utils/rabbitmq');
const Subscription = require('../models/subscriptionModel');

async function createSubscription(subscriptionData, channel) {
  const existingSubscription = await Subscription.findOne({
    email: subscriptionData.email,
  });

  if (existingSubscription) {
    throw new Error('Email address already in use.');
  }

  const subscription = new Subscription(subscriptionData);
  await subscription.save();

  await sendEmail(channel, {
    to: subscriptionData.email,
    subject: 'Subscription Confirmation',
    text: `Thank you for subscribing! Your subscription ID is ${subscription._id}.`,
  });

  return subscription._id;
}

async function cancelSubscription(subscriptionId) {
  const subscription = await Subscription.findByIdAndDelete(subscriptionId);

  if (!subscription) {
    throw new Error('Subscription not found.');
  }
}

async function getSubscription(subscriptionId) {
  const subscription = await Subscription.findById(subscriptionId);

  if (!subscription) {
    throw new Error('Subscription not found.');
  }

  return subscription;
}

async function getAllSubscriptions() {
  return Subscription.find();
}

module.exports = { createSubscription, cancelSubscription, getSubscription, getAllSubscriptions };
