const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const subscriptionRoutes = require('./routes/subscription');
const swaggerDefinition = require('./swagger/swaggerDefinition');

dotenv.config();

const app = express();
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json());
app.use('/subscription', subscriptionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Public Service is running on port ${port}`);
});