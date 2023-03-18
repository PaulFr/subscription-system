/**
 * Middleware function to validate the API_KEY in the incoming request headers.
 * This function checks if the 'x-api-key' header is present and matches the expected API_KEY value.
 * If the validation is successful, the request is allowed to proceed further, otherwise, it returns a 401 Unauthorized error.
 * This function is intended to be used as an express middleware.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the request processing pipeline.
 */
const apiKeyValidation = (req, res, next) => {
  const apiKey = req.header('X-API-KEY');
  const validApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

module.exports = apiKeyValidation;
