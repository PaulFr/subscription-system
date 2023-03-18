const express = require('express');
const router = express.Router();
const apiGatewayRequest = require('../utils/apiGatewayRequest');

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Bad request (invalid input data)
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  const response = await apiGatewayRequest('POST', '/subscription', req.body);
  res.status(response.status).json(response.data);
});

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the subscription
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
  const response = await apiGatewayRequest('DELETE', `/subscription/${req.params.id}`);
  res.status(response.status).json(response.data);
});

/**
 * @swagger
 * /subscriptions/{id}:
 *   get:
 *     summary: Retrieve a subscription by ID
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the subscription
 *     responses:
 *       200:
 *         description: Subscription object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
  const response = await apiGatewayRequest('GET', `/subscription/${req.params.id}`);
  res.status(response.status).json(response.data);
});

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Retrieve a list of all subscriptions
 *     tags:
 *       - Subscriptions
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  const response = await apiGatewayRequest('GET', '/subscription');
  res.status(response.status).json(response.data);
});

module.exports = router;