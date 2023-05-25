const pricePrIngredientIncrease = 10
const originalPrice = +document.getElementById('orderPriceTotal').value
const costOfDelivery = 70


function revealOrHideFormDiv(menuItemID){
    let divToBeHiddenOrRevealed = `addMenuItemToCartWrapper${menuItemID}`
    let element = document.getElementById(divToBeHiddenOrRevealed)
    let hidden = element.getAttribute('hidden')
    if(hidden){
        element.removeAttribute('hidden')
    } else {
        element.setAttribute("hidden", "hidden")
    }
};

function decidePriceBySize(inputID){
    let menuItemName = inputID.replace(/^([^.]+)/, "")
    timesChangedID = `changeCounter${menuItemName}`
    
    let timesChanged = +document.getElementById(timesChangedID).value
    const standardPrice = +document.getElementById(inputID).value
    
    const newPrice = standardPrice + (timesChanged*pricePrIngredientIncrease)
    document.getElementById(`price${menuItemName}`).value = newPrice  
};

function removeIngredient(counterID){
    const value = +document.getElementById(counterID).value; //fetches the current value/amount of the ingredient counter
    let menuItemName = counterID.replace(/^([^.]+)/, "") //removes everything before the period (.) so that i can use the name of the menuItem as variable.
    timesChangedID = `changeCounter${menuItemName}`
    
    let timesChanged = +document.getElementById(timesChangedID).value
    let currentPrice = +document.getElementById(`price${menuItemName}`).value
    let standarPrice = currentPrice - (timesChanged *pricePrIngredientIncrease)
    if(value >= 1){ //if the ingredient value/amount is higher or equal to 1
        const newValue = value -1 //lowers the ingredient value/amount by 1
        document.getElementById(counterID).value = newValue //changes the value of the ingredient amount to newValue
        
        if(timesChanged !== 0){ //if the ingredients of the pizza/burger has been changed at least once, then this if statement happens, if not then nothing happens  
            timesChanged -= 1
            document.getElementById(timesChangedID).value = timesChanged
            const newPrice = standarPrice + (timesChanged*pricePrIngredientIncrease)
            document.getElementById(`price${menuItemName}`).value = newPrice
        }
        
    } else { // if the ingredient value/amount is 0
        document.getElementById(counterID).value = 0
    }
    
};

function addIngredient(counterID){
    const value = +document.getElementById(counterID).value; //fetches the current value/amount of the ingredient counter
    let menuItemName = counterID.replace(/^([^.]+)/, "") //removes everything before the period (.) so that i can use the name of the menuItem as variable.
    timesChangedID = `changeCounter${menuItemName}`
    
    
    let timesChanged = +document.getElementById(timesChangedID).value
    let currentPrice = +document.getElementById(`price${menuItemName}`).value
    
    let standarPrice = currentPrice - (timesChanged *pricePrIngredientIncrease)
    if(value <= 2){
        const newValue = value +1
        document.getElementById(counterID).value = newValue
        timesChanged += 1
        document.getElementById(timesChangedID).value = timesChanged
        const newPrice = standarPrice + (timesChanged*pricePrIngredientIncrease)
        document.getElementById(`price${menuItemName}`).value = newPrice
        
    } else {
        document.getElementById(counterID).value = 3
    }
    
};

function removeIngredientKidsMenu(counterID){
    const value = +document.getElementById(counterID).value
    if(value == 1){
        document.getElementById(counterID).value = 0
    } if(value == 0){
        document.getElementById(counterID).value = 0
    }
};

function addIngredientKidsMenu(counterID){
    const value = +document.getElementById(counterID).value
    if(value == 1){
        document.getElementById(counterID).value = 1
    } if(value == 0){
        document.getElementById(counterID).value = 1
    }
};

function decreaseQuantity(counterID){
    const value = +document.getElementById(counterID).value;
    if(value >= 1){
        const newValue = value -1
        document.getElementById(counterID).value = newValue
    } else {
        document.getElementById(counterID).value = 0
    }   
};

function increaseQuantity(counterID){
    const value = +document.getElementById(counterID).value;
    const newValue = value +1
    document.getElementById(counterID).value = newValue
};

function determineDeliveryOrTakeAway(optionID){
    chosenOption = document.getElementById(optionID).value
    console.log(chosenOption)
    
    if(chosenOption === "delivery"){
        console.log('original price without delivery: ' + originalPrice)
        newPrice = originalPrice + costOfDelivery
        document.getElementById('orderPriceTotal').value = newPrice
    }
    if(chosenOption === "takeAway"){
        console.log('originalPrice: ' + originalPrice)
        document.getElementById('orderPriceTotal').value = originalPrice
    }
};
