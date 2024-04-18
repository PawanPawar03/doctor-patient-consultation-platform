// middlewares.js

const { body, validationResult } = require('express-validator');

const validate_patientRegistrationData = [
  body('name').trim().notEmpty().withMessage('Username is required'),
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('mobno').trim().notEmpty().withMessage('Mobile No is required'),
  body('age').trim().notEmpty().withMessage('Age is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('patientRegistration', {
        message: null,
        errors: errors.array(),
      });
    }
    next();
  },
];


module.exports = {
  validate_patientRegistrationData
};
