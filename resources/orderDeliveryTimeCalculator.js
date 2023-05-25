const exp = require('constants');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
var session = require('express-session');
const fs = require('fs');
const { type } = require('os');

//this file is to be used for determining the estimated finish/delivery time for each order.
//at the start the value will be a simple variable that is set to 20 minutes as standard but may be changed by an authorized user (staff user, most likely a shift manager).
//the standard delivery times are 20 minutes for take away order and 1 hour for deliveries.

let estimatedFinishTakeAway = 20 //minutes
let estimatedDeliveryTime = 60 //minutes

module.exports = {estimatedDeliveryTime, estimatedFinishTakeAway}