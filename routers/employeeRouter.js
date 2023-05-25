const { Router } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var session = require('express-session');
const { get } = require('http');

router.get('/newOrders', (req, res)=> {
    res.render('./employeePages/newOrders.ejs')
})

router.get('/ordersInOven', (req, res)=> {
    res.render('./employeePages/ordersInOven.ejs')
})

router.get('/ordersReadyForDelivery', (req, res)=> {
    res.render('./employeePages/ordersReadyForDelivery.ejs')
})

router.get('/ordersReadyForPickUp', (req, res)=> {
    res.render('./employeePages/ordersReadyForPickUp.ejs')
})
module.exports = router