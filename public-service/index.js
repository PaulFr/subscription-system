const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const subscriptionRoutes = require('./routes/subscription');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/subscription', subscriptionRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Public Service is running on port ${port}`);
});