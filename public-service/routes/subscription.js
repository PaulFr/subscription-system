const express = require('express');
const router = express.Router();
const apiGatewayRequest = require('../utils/apiGatewayRequest');

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3001';

router.post('/', async (req, res) => {
  const response = await apiGatewayRequest('POST', '/subscription', req.body);
  res.status(response.status).json(response.data);
});

router.put('/:id/cancel', async (req, res) => {
  const response = await apiGatewayRequest('PUT', `/subscription/${req.params.id}/cancel`);
  res.status(response.status).json(response.data);
});

router.get('/:id', async (req, res) => {
  const response = await apiGatewayRequest('GET', `/subscription/${req.params.id}`);
  res.status(response.status).json(response.data);
});

router.get('/', async (req, res) => {
  const response = await apiGatewayRequest('GET', '/subscriptions');
  res.status(response.status).json(response.data);
});

module.exports = router;