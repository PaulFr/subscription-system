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

async function consumeEmailQueue(channel, callback) {
  try {
    channel.consume(
      'email',
      (message) => {
        if (message) {
          const messageContent = message.content.toString();
          callback(messageContent);
          channel.ack(message);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error('Error consuming email notification queue:', error.message);
  }
}

module.exports = {
  initRabbitMQ,
  rabbitmqEmitter,
  consumeEmailQueue,
};
