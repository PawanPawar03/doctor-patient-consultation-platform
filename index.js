const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { validate_patientRegistrationData} = require('./middlewares'); // Import the middleware
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB setup
const mongoURI = 'mongodb://localhost:27017/registration_form_db';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes

const patientRouter = require('./routes/patientRegistration');


// app.use('/api', validateRegistrationData); // Apply the middleware to all routes starting with '/api'
app.use('/api', validate_patientRegistrationData); // Apply the middleware to all routes starting with '/api'
app.use('/api', patientRouter);


// Route to render the pages
app.get('/', (req, res) => {
  res.render('hero');
});

app.get('/patientRegistration', (req,res) => {
  res.render('patientRegistration', {  message: null, errors: [] })
})

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
