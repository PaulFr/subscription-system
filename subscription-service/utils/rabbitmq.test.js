const amqplib = require('amqplib');
const { rabbitmqEmitter, initRabbitMQ, sendEmail } = require('./rabbitmq');

jest.mock('amqplib');
jest.mock('./rabbitmq', () => ({
  ...jest.requireActual('./rabbitmq'),
  connectWithRetry: jest.fn(),
}));

describe('rabbitmq', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initRabbitMQ', () => {
    it('should initialize the connection and channel', async () => {
      const mockConnection = {
        createChannel: jest.fn().mockResolvedValue({
          assertQueue: jest.fn(),
        }),
      };
      amqplib.connect.mockResolvedValue(mockConnection);
      const mockUrl = 'amqp://test:5672';

      await initRabbitMQ(mockUrl);

      expect(amqplib.connect).toHaveBeenCalledWith(mockUrl);
      expect(mockConnection.createChannel).toHaveBeenCalled();
    });

    it('should emit "ready" event when connection and channel are ready', async () => {
      const mockChannel = {
        assertQueue: jest.fn(),
      };
      const mockConnection = {
        createChannel: jest.fn().mockResolvedValue(mockChannel),
      };
      amqplib.connect.mockResolvedValue(mockConnection);

      initRabbitMQ('amqp://test:5672');

      await new Promise((resolve) => {
        rabbitmqEmitter.once('ready', (channel) => {
          expect(channel).toBe(mockChannel);
          resolve();
        });
      });
    });
  });

  describe('sendEmail', () => {
    it('should send an email message to the queue', async () => {
      const mockChannel = {
        sendToQueue: jest.fn(),
      };
      const data = {
        to: 'test@example.com',
        subject: 'Test email',
        text: 'This is a test email',
      };

      await sendEmail(mockChannel, data);

      expect(mockChannel.sendToQueue).toHaveBeenCalledWith('email', Buffer.from(JSON.stringify(data)));
    });
  });
});
