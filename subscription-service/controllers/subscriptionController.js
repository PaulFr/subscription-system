const {
  createSubscription,
  cancelSubscription,
  getSubscription,
  getAllSubscriptions,
} = require('../services/subscriptionService');

async function createSubscriptionController(req, res, channel) {
  try {
    const subscriptionId = await createSubscription(req.body, channel);
    res.status(201).json({ subscriptionId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

async function cancelSubscriptionController(req, res) {
  try {
    await cancelSubscription(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getSubscriptionController(req, res) {
  try {
    const subscription = await getSubscription(req.params.id);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getAllSubscriptionsController(req, res) {
  try {
    const subscriptions = await getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve subscriptions.' });
  }
}

module.exports = {
  createSubscriptionController,
  cancelSubscriptionController,
  getSubscriptionController,
  getAllSubscriptionsController,
};
