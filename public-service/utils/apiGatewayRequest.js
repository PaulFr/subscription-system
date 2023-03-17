const axios = require('axios');

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3030';
const TIMEOUT = parseInt(process.env.API_GATEWAY_TIMEOUT) || 5000; // 5 seconds by default

function handleError(error) {
  if (error.response) {
    return { status: error.response.status, data: error.response.data };
  }
  
  if (error.request) {
    const isTimeout = error.code === 'ECONNABORTED';
    const message = isTimeout ? 'API Gateway request timed out' : 'API Gateway is not available';
    const status = isTimeout ? 504 : 503;
    return { status, data: { message } };
  }

  return { status: 500, data: { message: 'An unknown error occurred' } };
}

async function apiGatewayRequest(method, path, data, params) {
  try {
    const response = await axios({
      method: method,
      url: `${API_GATEWAY_URL}${path}`,
      data: data,
      params: params,
      timeout: TIMEOUT,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

module.exports = apiGatewayRequest;