const { body, param, validationResult } = require('express-validator');

exports.validateSubscriptionCreation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is required and must be valid.'),
  body('firstName').optional().trim().escape(),
  body('gender').optional().trim().isIn(['male', 'female', 'other']).withMessage('Gender must be one of "male", "female", or "other".'),
  body('dateOfBirth').isDate().withMessage('Date of birth is required and must be a valid date.'),
  body('consent').isBoolean().withMessage('Consent is required and must be a boolean value.'),
  body('newsletterId').isString().withMessage('Newsletter Id is required and must be a string.'),
];

exports.validateSubscriptionCancellation = [
  param('id')
    .exists()
    .withMessage('Subscription ID is required.')
    .isMongoId()
    .withMessage('Subscription ID must be a valid MongoID.'),
];

exports.validateSubscriptionRetrieval = [
  param('id')
    .exists()
    .withMessage('Subscription ID is required.')
    .isMongoId()
    .withMessage('Subscription ID must be a valid MongoID.'),
];

exports.handleValidationErrors = (req, res, next) => {
  console.log('handle val error');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, errors: errors.array() });
  }
  next();
};
