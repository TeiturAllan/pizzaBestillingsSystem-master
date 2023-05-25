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

//end of importation of classes
//importation of estimated delivery and takeaway times
const orderDeadlineCalc = require('../resources/orderDeliveryTimeCalculator.js')

router.get('/', (req, res) => {
  if(req.session.orderCart === undefined){
    req.session.regenerate(function (err) {
        if (err) next(err)
    
        // store user information in session
        req.session.orderCart = []

        // save the session before redirection to ensure page, load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/menu/Pizza')
        })
    })
  } else { //if req.session.orderCart !== undefined
    res.redirect('/menu/Pizza')
  }
    
});

router.get('/Pizza', (req, res) => {
  if(req.session.orderCart === undefined){
    req.session.regenerate(function (err) {
        if (err) next(err)
    
        // store user information in session
        req.session.orderCart = []

        // save the session before redirection to ensure page, load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/menu/Pizza')
        })
    })
  } else { //if req.session.orderCart !== undefined
    orderCart = req.session.orderCart
    orderPriceTotal = 0
    for(i = 0; i < orderCart.length; i++){
      if(orderCart[i].pizzaSize === undefined){
        middleCalcBurger = orderCart[i].pricePrBurger * orderCart[i].quantity
        orderPriceTotal += middleCalcBurger
      }
      if(orderCart[i].pizzaSize !== undefined){
        middleCalcPizza = orderCart[i].pricePrPizza * orderCart[i].quantity
        orderPriceTotal += middleCalcPizza
      }
    }
    res.render('./menuPages/menuPagePizza.ejs', {menu: menuPizza, orderCart : req.session.orderCart, orderPriceTotal: orderPriceTotal, user : req.session})
  }
}); 

router.get('/Burger', (req, res) => {
  if(req.session.orderCart === undefined){
    req.session.regenerate(function (err) {
        if (err) next(err)
    
        // store user information in session
        req.session.orderCart = []

        // save the session before redirection to ensure page, load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/menu/burger')
        })
    })
  } else { //if req.session.orderCart !== undefined
    orderCart = req.session.orderCart
    orderPriceTotal = 0
    for(i = 0; i < orderCart.length; i++){
      if(orderCart[i].pizzaSize === undefined){
        middleCalcBurger = orderCart[i].pricePrBurger * orderCart[i].quantity
        orderPriceTotal += middleCalcBurger
      }
      if(orderCart[i].pizzaSize !== undefined){
        middleCalcPizza = orderCart[i].pricePrPizza * orderCart[i].quantity
        orderPriceTotal += middleCalcPizza
      }
    
    }
    res.render('./menuPages/menuPageBurger.ejs', {menu: menuBurger, orderCart : req.session.orderCart, orderPriceTotal: orderPriceTotal, user : req.session})
  }
});

router.get('/Kids', (req, res) => {
  if(req.session.orderCart === undefined){
    req.session.regenerate(function (err) {
        if (err) next(err)
    
        // store user information in session
        req.session.orderCart = []

        // save the session before redirection to ensure page, load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/menu/kids')
        })
    })
  } else { //if req.session.orderCart !== undefined
    orderCart = req.session.orderCart
    orderPriceTotal = 0
    for(i = 0; i < orderCart.length; i++){
      if(orderCart[i].pizzaSize === undefined){
        middleCalcBurger = orderCart[i].pricePrBurger * orderCart[i].quantity
        orderPriceTotal += middleCalcBurger
      }
      if(orderCart[i].pizzaSize !== undefined){
        middleCalcPizza = orderCart[i].pricePrPizza * orderCart[i].quantity
        orderPriceTotal += middleCalcPizza
      }
    }
    res.render('./menuPages/menuPageKids.ejs', {menu: menuKids, orderCart : req.session.orderCart, orderPriceTotal: orderPriceTotal, user : req.session})
  }
});

router.post('/:menuItemCategory/addItemToCart', express.urlencoded({ extended: false }), (req, res) => {
  let menuItemRawData = req.body
  let menuItemTransformedNonIngredientData = []
  let menuItemIngredients = []
  let menuItemQuantity = 0
  let pricePrItem = 0
  let changeCounter = 0
  if(req.body.menuItemCategory === "pizza"){//the first of two if(req.body.menuItemCategory ===) loops 
    for (const property in menuItemRawData) {
      if(property === "quantity"){
        menuItemQuantity += Number(menuItemRawData[property])
      }
      if(property === "pricePrItem"){
        pricePrItem += Number(menuItemRawData[property])
      }
      if(property === "menuItemNumber"){
        let menuItemNumber = menuItemRawData[property]
        menuItemTransformedNonIngredientData.splice(0, 0, menuItemNumber)
      }
      if(property === "menuItemName"){
        let menuItemName = menuItemRawData[property]
        menuItemTransformedNonIngredientData.splice(1, 0, menuItemName)
      }
      if(property === "pizzaSize"){
        let pizzasize = menuItemRawData[property]
        menuItemTransformedNonIngredientData.splice(2, 0, pizzasize)
      } 
      if(menuItemRawData[property] === '0'){
      }
      if(property === "changeCounter"){
      changeCounter += Number(menuItemRawData[property])
      }
      if(property !== "menuItemCategory" && property !== "pizzaSize" && menuItemRawData[property] !== '0' && property !== "menuItemNumber"
       && property !== "menuItemName" && property !== "quantity" && property !== "pricePrItem" && property !== "changeCounter") {
        let ingredientAmountAsAnInteger = Number(menuItemRawData[property])
        propertyRegixifiedstep1 = property.replace(/Counter/g,"")
        const findCapitalizedLetter = propertyRegixifiedstep1.match(/[A-Z]/g)
        propertyRegixifiedstep2 = propertyRegixifiedstep1.replace(/[A-Z]/g, ` ${findCapitalizedLetter}`)
        const firstLetterOfIngredient = propertyRegixifiedstep2.match(/[a-z]/)
        const stringifyfirstletter = `${firstLetterOfIngredient}`
        ingredientNameRegexified = propertyRegixifiedstep2.replace(/[a-z]/, stringifyfirstletter.toUpperCase())

        let ingredient = {ingredient : ingredientNameRegexified, amount : ingredientAmountAsAnInteger}
        menuItemIngredients.push(ingredient)
        
      }//end of the if statement that pushes the active ingredients (ingredients whose value is higher than 0) to the array
    }//end for loop that loops through the ingredients of the menu Item
    let pizzaToBePlaceInCart = new Pizza(menuItemTransformedNonIngredientData[0], menuItemTransformedNonIngredientData[1], menuItemTransformedNonIngredientData[2], menuItemIngredients, pricePrItem, menuItemQuantity, changeCounter )
    req.session.orderCart.push(pizzaToBePlaceInCart)
  }//end of if(req.body.menuItemCategory === "pizza") function.



  if(req.body.menuItemCategory === "burger"){
    for (const property in menuItemRawData) {
      if(property === "quantity"){
        menuItemQuantity += Number(menuItemRawData[property])
      }
      if(property === "pricePrItem"){
        pricePrItem += Number(menuItemRawData[property])
      }
      if(property === "menuItemNumber"){
        let menuItemNumber = menuItemRawData[property]
        menuItemTransformedNonIngredientData.splice(0, 0, menuItemNumber)
      }
      if(property === "menuItemName"){
        let menuItemName = menuItemRawData[property]
        menuItemTransformedNonIngredientData.splice(1, 0, menuItemName)
      }
      if(property === "changeCounter"){
        changeCounter += Number(menuItemRawData[property])
      }
      if(menuItemRawData[property] === '0'){
      }
      if(property === 'dressing'){
        propertyRegixifiedstep1 = property.replace(/CounterforBurger/g,"")
        const findCapitalizedLetter = propertyRegixifiedstep1.match(/[A-Z]/g)
        propertyRegixifiedstep2 = propertyRegixifiedstep1.replace(/[A-Z]/g, ` ${findCapitalizedLetter}`)
        const firstLetterOfIngredient = propertyRegixifiedstep2.match(/[a-z]/)
        const stringifyfirstletter = `${firstLetterOfIngredient}`
        ingredientNameRegexified = propertyRegixifiedstep2.replace(/[a-z]/, stringifyfirstletter.toUpperCase())
        let ingredient = {ingredient : ingredientNameRegexified, amount : menuItemRawData[property]}
        menuItemIngredients.push(ingredient)

      }
      if(property !== "menuItemCategory" && menuItemRawData[property] !== '0' && property !== "menuItemNumber" && property !== "menuItemName" && property !== "quantity" 
      && property !== "dressing" && property !== "pricePrItem" && property !== "changeCounter") {
        let ingredientAmountAsAnInteger = Number(menuItemRawData[property])
        propertyRegixifiedstep1 = property.replace(/CounterforBurger/g,"")
        const findCapitalizedLetter = propertyRegixifiedstep1.match(/[A-Z]/g)
        propertyRegixifiedstep2 = propertyRegixifiedstep1.replace(/[A-Z]/g, ` ${findCapitalizedLetter}`)
        const firstLetterOfIngredient = propertyRegixifiedstep2.match(/[a-z]/)
        const stringifyfirstletter = `${firstLetterOfIngredient}`
        ingredientNameRegexified = propertyRegixifiedstep2.replace(/[a-z]/, stringifyfirstletter.toUpperCase())

        let ingredient = {ingredient : ingredientNameRegexified, amount : ingredientAmountAsAnInteger}
        menuItemIngredients.push(ingredient)
      }//end of the if statement that pushes the active ingredients (ingredients whose value is higher than 0) to the array
    }//end for loop that loops through the ingredients of the menu Item
    let burgerToBePlaceInCart = new Burger(menuItemTransformedNonIngredientData[0], menuItemTransformedNonIngredientData[1], menuItemIngredients, pricePrItem, menuItemQuantity, changeCounter )
    req.session.orderCart.push(burgerToBePlaceInCart)
  }//end of if(req.body.menuItemCategory === "burger") function.
  res.redirect(`/menu/${req.params.menuItemCategory}`)
})

router.post('/removeFromCart/:index', (req, res) => {
  req.session.orderCart.splice(req.params.index, 1)
  
  res.redirect('/menu')
})


router.get('/checkCart', (req, res) => {
  console.log(req.session)
  req.session.orderCart.forEach(element => {
  console.log(element)
  });
  res.redirect('/menu') 
})


module.exports = router
