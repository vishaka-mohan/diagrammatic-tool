const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());





// database connection
const dbURI = "mongodb+srv://vishaka:Vishaka@cluster0.u0mor.mongodb.net/diagram-tool?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
app.get('/adDashboard', requireAuth, (req, res) => res.render('adDashboard'));
app.use(authRoutes);