const { Router } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var session = require('express-session');
const { get } = require('http');

//importation and setup of bcrypt module
const bcrypt = require('bcrypt');
const saltRounds = 10;

//SQLite importation and setup
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("resources/database/database.db");


//stores the signed in user
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

router.get('/', (req,res) => {
    res.render('login.ejs')
})

router.get('/register', (req,res) => {
    res.render('register.ejs')
})

router.post('/', express.urlencoded({ extended: false }), (req, res) =>{
    function fetchUserFromDB(userEmail){
        db.get(`SELECT * from users WHERE email = '${userEmail}'`, (err, row) => {
          if (err) {
            handleErrors()
            throw err;
          }
          console.log('user from database:') 
          console.log(row)
          checkUser(row, req.body.password)
        })
    }
    
    async function checkUser(user, plainTextPassword) {
        let orderCartPreLogin = req.session.orderCart
      if(user === undefined){ 
        return handleErrors('no user found with that email', '/login')
      }
      const match = await bcrypt.compare(plainTextPassword, user.password).catch();

      if(match) {
        console.log('password correct: ', match)
        req.session.regenerate(function (err) {
          if (err) next(err)
        
          // store user information in session
          req.session.userID = user.userID
          req.session.email = user.email
          req.session.telephoneNumber = user.telephoneNumber
          req.session.adminRank = user.adminRank
          req.session.orderCart = orderCartPreLogin
          //user information used when ordering
          req.session.customerName = user.name
          req.session.streetName = user.streetName
          req.session.houseNumber = user.houseNumber
          req.session.town = user.town
          
          // save the session before redirection to ensure page, load does not happen before session is saved
          req.session.save(function (err) {
            if (err) return next(err)
            res.redirect('/')
          })
        })
      } else { //from if(match) clause
        handleErrors('password incorrect', '/login')
      }
    }
    
    function handleErrors(comment, redirectPath){
      console.log(comment)
      res.redirect(redirectPath)
    }

    if(req.session.email !== undefined){
      console.log('you are already signed in')
      res.redirect('/')
    } else {
    fetchUserFromDB(req.body.email)
    }
})


router.post('/register', express.urlencoded({ extended: false }), (req, res) => {
    console.log(req.body)
    let userInfo = req.body
    let birthDate = `${userInfo.birthDateDay}/${userInfo.birthDateMonth}/${userInfo.birthDateYear}`
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        db.get(`SELECT * FROM users
        Where email = "${userInfo.email}";`, (err, row) => {
          if(err){
            throw err
          }
          if(row !== undefined){
            res.redirect('/login/createUser')
            console.log('user with this email is already registered')
          } else {
            let SQL = `INSERT INTO users(name, email, password, telephoneNumber, streetName, houseNumber, town, birthDate, gender)
            VALUES("${userInfo.name}", "${userInfo.email}", "${hash}", "${userInfo.telephoneNumber}", "${userInfo.streetName}", "${userInfo.houseNumber}", "${userInfo.town}", "${birthDate}", "${userInfo.gender}");`
            console.log(SQL)
            db.run(SQL)
            console.log('user created successfully')
            res.redirect('/login')
          }
        })
    })
})

module.exports = router