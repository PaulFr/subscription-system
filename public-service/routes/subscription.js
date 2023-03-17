const express = require('express');
const router = express.Router();
const apiGatewayRequest = require('../utils/apiGatewayRequest');

router.post('/', async (req, res) => {
  const response = await apiGatewayRequest('POST', '/subscription', req.body);
  res.status(response.status).json(response.data);
});

router.delete('/:id', async (req, res) => {
  const response = await apiGatewayRequest('DELETE', `/subscription/${req.params.id}`);
  res.status(response.status).json(response.data);
});

router.get('/:id', async (req, res) => {
  const response = await apiGatewayRequest('GET', `/subscription/${req.params.id}`);
  res.status(response.status).json(response.data);
});

router.get('/', async (req, res) => {
  const response = await apiGatewayRequest('GET', '/subscription');
  res.status(response.status).json(response.data);
});

module.exports = router;