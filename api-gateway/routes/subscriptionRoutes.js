const express = require('express');
const axios = require('axios');
const router = express.Router();
const {
  validateSubscriptionCreation,
  validateSubscriptionCancellation,
  validateSubscriptionRetrieval,
  handleValidationErrors,
} = require('../validators/subscriptionValidator');

const SUBSCRIPTION_SERVICE_URL = process.env.SUBSCRIPTION_SERVICE_URL || 'http://localhost:3002';

router.post(
  '/',
  validateSubscriptionCreation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const response = await axios.post(`${SUBSCRIPTION_SERVICE_URL}/`, req.body);
      res.status(201).json(response.data);
    } catch (error) {
      next({ status: error.response.status, errors: error.response.data });
    }
});

router.delete(
  '/:id',
  validateSubscriptionCancellation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await axios.delete(`${SUBSCRIPTION_SERVICE_URL}/${id}`);
      res.status(204).end();
    } catch (error) {
      next({ status: error.response.status, errors: error.response.data });
    }
});

router.get(
  '/:id',
  validateSubscriptionRetrieval,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await axios.get(`${SUBSCRIPTION_SERVICE_URL}/${id}`);
      res.status(200).json(response.data);
    } catch (error) {
      next({ status: error.response.status, errors: error.response.data });
    }
});

router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(`${SUBSCRIPTION_SERVICE_URL}/`);
    res.status(200).json(response.data);
  } catch (error) {
    next({ status: error.response.status, errors: error.response.data });
  }
});

router.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json(err.errors || { error: 'An error occurred.' });
});

module.exports = router;
