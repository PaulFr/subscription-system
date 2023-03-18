const dotenv = require('dotenv');
const rabbitmq = require('./utils/rabbitmq');

dotenv.config();

rabbitmq.rabbitmqEmitter.on('ready', (channel) => {
  console.log('RabbitMQ is ready.');

  rabbitmq.consumeEmailQueue(channel, (message) => {
    console.log(`Received email notification message: ${message}`);
  });
});

rabbitmq.initRabbitMQ(process.env.RABBITMQ_URL);
