const express = require('express');
const router = express.Router();
const patientRegistration = require('../models/patientUser');
const { body, validationResult } = require('express-validator');

// Handle patient registration form submission
router.post('/patientRegistration', async (req, res, next) =>  {
  const { name, email, address, mobno, age, password, cpassword} = req.body;

  try{
    // Check if the user already exists
    const existingUser = await patientRegistration.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      // return res.status(409).json({ message: 'Username or email already exists' });

      const errors = validationResult(req);
      if (errors.isEmpty()) {
      return res.render('patientRegistration', {
        message: 'Username or email already exists',
        errors: errors.array(),
      });
    }
    next();
    }
    //check password
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password === cpassword) {
    const formData = req.body;

    const form1Data = new patientRegistration(formData);
    console.log(formData)

    await form1Data.save().then(() => {
      // res.status(200).send('Patient Registration successfully !');
      const errors = validationResult(req);
      if (errors.isEmpty()) {
      return res.render('patientRegistration', {
        message: 'Patient Registration successfully !',
        errors: errors.array(),
      });
    }
    next();

    }).catch((err) => {
      res.status(400).send('Error saving Patient data');
    });
  } 
  else{
      // res.send("Password Not matching")  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return res.render('patientRegistration', {
          message: 'Password Not matching',
          errors: errors.array(),
      });
      }
      next();
  }
}
catch(err) {
  res.status(400).send(err);
  };
  
});
module.exports = router;