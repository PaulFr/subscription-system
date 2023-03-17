const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { initRabbitMQ, rabbitmqEmitter } = require('./utils/rabbitmq');
const { createSubscriptionRoutes } = require('./routes');

dotenv.config();

(async () => {
  const app = express();

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  rabbitmqEmitter.on('ready', (channel) => {
    console.log('RabbitMQ is ready.');

    app.use(bodyParser.json());
    app.use(createSubscriptionRoutes(channel));

    const port = process.env.PORT || 3002;

    app.listen(port, () => {
      console.log(`Subscription service running on port ${port}`);
    });
  });

  initRabbitMQ(process.env.RABBITMQ_URL);
})();
