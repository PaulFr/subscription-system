const axios = require('axios');

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3030';
const TIMEOUT = parseInt(process.env.API_GATEWAY_TIMEOUT) || 5000; // 5 seconds by default

function handleError(error) {
  if (error.response) {
    return { status: error.response.status, data: error.response.data };
  } 
  
  if (error.code === "ECONNABORTED") {
    return { status: 504, data: { message: "API Gateway request timed out" } };
  }

  return { status: 503, data: { message: "API Gateway is not available" } };
}

async function apiGatewayRequest(method, path, data, params, axiosInstance = axios) {
  try {
    const response = await axiosInstance({
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