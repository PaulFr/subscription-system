const {
  createSubscriptionController,
  cancelSubscriptionController,
  getSubscriptionController,
  getAllSubscriptionsController,
} = require('./subscriptionController');
const {
  createSubscription,
  cancelSubscription,
  getSubscription,
  getAllSubscriptions,
} = require('../services/subscriptionService');

jest.mock('../services/subscriptionService', () => ({
  createSubscription: jest.fn(),
  cancelSubscription: jest.fn(),
  getSubscription: jest.fn(),
  getAllSubscriptions: jest.fn(),
}));

describe('Subscription Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a subscription', async () => {
    const req = { body: { email: 'test@example.com', name: 'John Doe' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const channel = {};

    await createSubscriptionController(req, res, channel);

    expect(createSubscription).toHaveBeenCalledWith(req.body, channel);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('should cancel a subscription', async () => {
    const req = { params: { id: 'some-id' } };
    const res = { status: jest.fn().mockReturnThis(), end: jest.fn() };

    await cancelSubscriptionController(req, res);

    expect(cancelSubscription).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  it('should get a subscription', async () => {
    const req = { params: { id: 'some-id' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getSubscriptionController(req, res);

    expect(getSubscription).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should get all subscriptions', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getAllSubscriptionsController(req, res);

    expect(getAllSubscriptions).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
