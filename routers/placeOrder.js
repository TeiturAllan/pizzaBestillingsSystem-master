const exp = require('constants');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
var session = require('express-session');
const fs = require('fs');
const { type } = require('os');

//importation of menu items

const menuPizzaUnparsed = fs.readFileSync('./resources/filesJSON/menuPizza.JSON')
const menuPizza = JSON.parse(menuPizzaUnparsed)

const menuBurgerUnparsed = fs.readFileSync('./resources/filesJSON/menuBurger.JSON')
const menuBurger = JSON.parse(menuBurgerUnparsed)

const menuKidsUnparsed = fs.readFileSync('./resources/filesJSON/menuKids.JSON')
const menuKids = JSON.parse(menuKidsUnparsed)

//start of importation of classes
const Pizza = require('../resources/classes/pizzaClass')
const Burger = require('../resources/classes/burgerClass')

router.post('/', express.urlencoded({ extended: false }), (req, res) => {
    orderItems = req.session.orderCart
    orderType = req.body.deliveryOrTakeAway
    orderPriceTotal = req.body.orderPriceTotal

    res.render('./finalizeOrderPage/finalizeOrderPage.ejs', {user: req.session, originalPriceTotal: orderPriceTotal, orderCart: req.session.orderCart })
})

router.post('/finalizeOrder', express.urlencoded({ extended: false }), (req, res) => {
    let orderCart = req.session.orderCart
    //console.log(req.body)
    orderCartLength = req.session.orderCart.length
    req.session.orderCart.splice(0, orderCartLength)//empties the orderCart that is stored in the cookies
    res.redirect('/menu')
})
module.exports = router