const fs = require('fs');
const https = require('https');
const http = require('http')

const options = {
  key: fs.readFileSync('./resources/pem files/key.pem'),
  cert: fs.readFileSync('./resources/pem files/cert.pem')
}

//module dependancies 
const express = require('express');
const app = express();
const session = require('express-session');
const nodemailer = require('nodemailer')
const httpApp = express()
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


//config
app.use(express.static('public'));
app.set('views', './public/views');
app.set('view engine', 'EJS');


httpApp.get('*', (req, res, next) => {
  if(!req.secure){
    res.redirect('https://' + req.hostname + req.path)
  }
  next()
});

http.createServer(httpApp).listen(80, () => {
  console.log('express HTTP server listening on port 80')
})

https.createServer(options, app).listen(443, () =>{
  console.log('express HTTP(S) server is listening on port 443')
})

app.get('/', (req, res) => {
  if(req.session.orderCart === undefined){
    req.session.regenerate(function (err) {
        if (err) next(err)
    
        // store user information in session
        req.session.orderCart = []

        // save the session before redirection to ensure page, load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/menu')
        })
    })
  } else { //if req.session.orderCart !== undefined
    res.redirect('/menu')
  }

})

//importation an use of routers
const menuRouter = require('./routers/menuRouter')
app.use('/menu', menuRouter)

const loginRouter = require('./routers/loginRouter')
app.use('/login', loginRouter)

const placeOrderRouter = require('./routers/placeOrder')
app.use('/placeOrder', placeOrderRouter)

const employeePages = require('./routers/employeeRouter')
app.use('/employeePages', employeePages)