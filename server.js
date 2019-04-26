///Dependencies

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session');
const app = express()
const db = mongoose.connection




/////Routers

const brewController = require('./controllers/brew')
const userController = require('./controllers/user')
const sessionsController = require('./controllers/sessions')

//Port

const PORT = process.env.PORT || 3000

////need to figure out how to get this in ENV

//database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BrewView'

//need to figure out how to put stuff in env

mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MIDDLEWARE///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//use public folder for static assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());// I know we don't need this for now, but adding it in for good practice

//use method override
app.use(methodOverride('_method'));

// add session data
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
///NOt sure yet about session stuff.  I THINK naming needs to match what heroku wants

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Routes///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

////////////Brew Routes//////////////////////

app.use('/brew', brewController)


/////landing page
app.get('/' , (req, res) => {
    res.redirect('/brew/featured')
    // res.send('Hello World!');
  });



////////////User Routes//////////////////////

app.use('/users', userController)

////////////Session Route
app.use('/sessions', sessionsController)
  
  //___________________
  //Listener
  //___________________
  app.listen(PORT, () => console.log( 'Listening on port:', PORT));