const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const userRouter = require("./routes/api/users");

const app = express();

// BodyParser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

// MongoDB config
const db = require('./config/key').mongoURI;

// MongoDB Connect
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB is connected...'))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// User router
app.use('/api/users', userRouter);

// process.env.PORT is Heroku's port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));