const axios = require('axios');
const axiosMock = new (require('axios-mock-adapter'))(axios);
const apiGatewayRequest = require('./apiGatewayRequest');

const API_GATEWAY_URL = 'http://localhost:3030';

afterEach(() => {
  axiosMock.reset();
});

test('successful API Gateway request', async () => {
  axiosMock.onGet(`${API_GATEWAY_URL}/test`).reply(200, { success: true });

  const result = await apiGatewayRequest('GET', '/test', {}, {}, axios);
  expect(result).toEqual({ status: 200, data: { success: true } });
});

test('API Gateway request with error response', async () => {
  axiosMock.onGet(`${API_GATEWAY_URL}/test`).reply(400, { error: 'Bad Request' });

  const result = await apiGatewayRequest('GET', '/test', {}, {}, axios);
  expect(result).toEqual({ status: 400, data: { error: 'Bad Request' } });
});

test('API Gateway request with timeout', async () => {
  axiosMock.onGet(`${API_GATEWAY_URL}/test`).timeout();

  const result = await apiGatewayRequest('GET', '/test', {}, {}, axios);

  expect(result).toEqual({ status: 504, data: { message: 'API Gateway request timed out' } });
});

test('API Gateway is not available', async () => {
  axiosMock.onGet(`${API_GATEWAY_URL}/test`).networkError();

  const result = await apiGatewayRequest('GET', '/test', {}, {}, axios);
  expect(result).toEqual({ status: 503, data: { message: 'API Gateway is not available' } });
});
