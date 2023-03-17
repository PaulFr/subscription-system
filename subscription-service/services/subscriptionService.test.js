const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const {
  createSubscription,
  cancelSubscription,
  getSubscription,
  getAllSubscriptions,
} = require('./subscriptionService');
const Subscription = require('../models/subscriptionModel');
const { sendEmail } = require('../utils/rabbitmq');

jest.mock('../utils/rabbitmq', () => ({
  sendEmail: jest.fn(),
}));

let mongoServer;
let channel = {};

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('subscriptionService', () => {
  beforeEach(async () => {
    await Subscription.deleteMany({});
  });

  it('should create a subscription', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      firstName: 'John',
      gender: 'male',
      dateOfBirth: new Date('1995-01-01'),
      consent: true,
      newsletterId: '123'
    };

    const subscriptionId = await createSubscription(
      subscriptionData,
      channel
    );
    expect(subscriptionId).toBeDefined();

    const createdSubscription = await Subscription.findOne({
      _id: subscriptionId,
    });
    expect(createdSubscription).toMatchObject(subscriptionData);

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should fail to create a subscription with a duplicate email', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      firstName: 'John',
      gender: 'male',
      dateOfBirth: new Date('1995-01-01'),
      consent: true,
      newsletterId: '123'
    };
    await new Subscription(subscriptionData).save();

    await expect(
      createSubscription(subscriptionData, channel)
    ).rejects.toThrow('Email address already in use.');
  });

  it('should cancel a subscription', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      firstName: 'John',
      gender: 'male',
      dateOfBirth: new Date('1995-01-01'),
      consent: true,
      newsletterId: '123'
    };
    const insertedSubscription = await new Subscription(subscriptionData).save();

    await cancelSubscription(insertedSubscription._id);

    const deletedSubscription = await Subscription.findOne({
      _id: insertedSubscription._id,
    });
    expect(deletedSubscription).toBeNull();
  });

  it('should fail to cancel a non-existent subscription', async () => {
    const nonExistentId = '6091ca9838dc5f5a5c5e5e5d';

    await expect(
      cancelSubscription(nonExistentId)
    ).rejects.toThrow('Subscription not found.');
  });

  it('should get a subscription', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      firstName: 'John',
      gender: 'male',
      dateOfBirth: new Date('1995-01-01'),
      consent: true,
      newsletterId: '123'
    };
    const insertedSubscription = await new Subscription(subscriptionData).save();

    const foundSubscription = await getSubscription(
      insertedSubscription._id,
    );

    expect(foundSubscription).toMatchObject(subscriptionData);
  });


  it('should fail to get a non-existent subscription', async () => {
    const nonExistentId = '6091ca9838dc5f5a5c5e5e5d';

    await expect(
      getSubscription(nonExistentId)
    ).rejects.toThrow('Subscription not found.');
  });

  it('should get all subscriptions', async () => {
    const subscriptionData1 = {
      email: 'testsd1@example.com',
      firstName: 'John',
      gender: 'male',
      dateOfBirth: new Date('1995-01-01'),
      consent: true,
      newsletterId: '123'
    };
    const subscriptionData2 = {
      email: 'testsd2@example.com',
      firstName: 'John',
      gender: 'male',
      dateOfBirth: new Date('1995-01-01'),
      consent: true,
      newsletterId: '123'
    };

    await Subscription.insertMany([
      subscriptionData1,
      subscriptionData2,
    ]);

    const allSubscriptions = await getAllSubscriptions();

    expect(allSubscriptions.length).toBe(2);
    expect(allSubscriptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining(subscriptionData1),
        expect.objectContaining(subscriptionData2),
      ])
    );
  });
});
