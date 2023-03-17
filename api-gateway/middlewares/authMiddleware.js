const apiKeyValidation = (req, res, next) => {
  const apiKey = req.header('X-API-KEY');
  const validApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

module.exports = apiKeyValidation;
