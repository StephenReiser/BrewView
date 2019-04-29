///Dependencies

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session');
const app = express()
const db = mongoose.connection
const Brew = require('./models/brew')



/////Routers

const brewController = require('./controllers/brew')
const userController = require('./controllers/user')
const sessionsController = require('./controllers/sessions')
const reviewsController = require('./controllers/reviews')

//Port

const PORT = process.env.PORT || 3000

////need to figure out how to get this in ENV

//database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BrewView'

///API

const API = process.env.API
const googleURL = "https://maps.googleapis.com/maps/api/js?key=" +API+ "&callback=initMap"
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Routes///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

////////////Brew Routes//////////////////////

app.use('/brew', brewController)


/////landing page
app.get('/' , (req, res) => {
    res.redirect('/map')
    // res.send('Hello World!');
  });

  /////////////////////////Map Route//////////////

  app.get('/map', (request, response) =>{
    Brew.find({},(error, foundBrew) => {
      response.render('index.ejs', {
          brews: foundBrew,
          googleURL: googleURL,
          currentUser: request.session.currentUser
          
          
          
      })
      
      
  })
  })


////////////User Routes//////////////////////

app.use('/users', userController)

////////////Session Route
app.use('/sessions', sessionsController)

///////////Review Route///////////////
  
app.use('/reviews', reviewsController)

app.get('/search', (request, response) => {
  Brew.findOne({
    name: request.query.search
  }, (error, foundBrew)=> {
    if (error) {
      // console.log(error)
      redirect('/brew')
    } else if (foundBrew === null) {
      
      response.redirect('/brew')
    } else {
      // console.log('brew/' + foundBrew._id)
      response.redirect('/brew/'+foundBrew._id)
      //     brew: foundBrew

      // })
    }

  })
  // response.send(request.query.search)
  // response.redirect('/search')
})


  //___________________
  //Listener
  //___________________
  app.listen(PORT, () => console.log( 'Listening on port:', PORT));