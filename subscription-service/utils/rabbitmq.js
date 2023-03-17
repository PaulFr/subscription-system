const amqp = require('amqplib');
const { EventEmitter } = require('events');

const rabbitmqEmitter = new EventEmitter();

async function connectWithRetry(url, attempt = 0) {
  const waitTime = 1000 * Math.pow(2, attempt);

  try {
    return await amqp.connect(url);
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    console.log(`Retrying in ${waitTime}ms...`);

    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return connectWithRetry(url, attempt + 1);
  }
}

async function initRabbitMQ(url) {
  try {
    const connection = await connectWithRetry(url);
    const channel = await connection.createChannel();
    await channel.assertQueue('email');
    rabbitmqEmitter.emit('ready', channel);
  } catch (error) {
    console.error('Failed to initialize RabbitMQ:', error);
  }
}

async function sendEmail(channel, data) {
  const bufferData = Buffer.from(JSON.stringify(data));

  channel.sendToQueue('email', bufferData);
}

module.exports = {
  initRabbitMQ,
  rabbitmqEmitter,
  sendEmail,
};
