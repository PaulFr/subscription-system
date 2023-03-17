const express = require('express');
const { 
  createSubscriptionController,
  cancelSubscriptionController,
  getSubscriptionController,
  getAllSubscriptionsController,
} = require('./controllers/subscriptionController');

function createSubscriptionRoutes(channel) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    await createSubscriptionController(req, res, channel);
  });

  router.delete('/:id', async (req, res) => {
    await cancelSubscriptionController(req, res);
  });

  router.get('/:id', async (req, res) => {
    await getSubscriptionController(req, res);
  });

  router.get('/', async (req, res) => {
    await getAllSubscriptionsController(req, res);
  });

  return router;
}

module.exports = { createSubscriptionRoutes };
