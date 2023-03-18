const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const port = process.env.PORT || 3030;

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(authMiddleware);
app.use('/subscription', subscriptionRoutes);


app.use((_req, res) => {
  res.status(404).json({ error: 'This service does not exist' });
});

app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
