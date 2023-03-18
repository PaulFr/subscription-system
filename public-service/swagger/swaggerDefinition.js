const dotenv = require('dotenv');

dotenv.config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Public Service API',
    version: '1.0.0',
    description: 'API documentation for the Public Service.',
  },
  servers: [
    {
      url: process.env.SERVER_URL || 'http://localhost:3001',
      description: 'Public Service API Server',
    },
  ],
  components: {
    schemas: {
      Subscription: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            format: 'ObjectId',
            readOnly: true,
            example: '6091ca9838dc5f5a5c5e5e5d',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'test@example.com',
          },
          firstName: {
            type: 'string',
            example: 'John',
          },
          gender: {
            type: 'string',
            enum: ['male', 'female', 'other'],
            example: 'male',
          },
          dateOfBirth: {
            type: 'string',
            format: 'date',
            example: '1995-12-17',
          },
          consent: {
            type: 'boolean',
            example: true,
          },
          newsletterId: {
            type: 'string',
            example: '1',
          },
        },
        required: ['email', 'dateOfBirth', 'consent', 'newsletterId'],
      },
    },
  },
};

module.exports = swaggerDefinition;
