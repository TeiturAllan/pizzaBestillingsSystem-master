class Pizza{
    constructor(menuItemNumber, menuItemName, pizzaSize, ingredientsList, pricePrPizza, quantity, menuItemEdited){
        this.menuItemNumber = menuItemNumber,
        this.menuItemName = menuItemName
        this.pizzaSize = pizzaSize
        this.ingredientsList = ingredientsList
        this.pricePrPizza = pricePrPizza
        this.quantity = quantity
        this.menuItemEdited = menuItemEdited
    }
}
module.exports = Pizza
/*
attributes that work as intended:
-pizzaSize
-IngredientsList
-menuItemNumber
-menuItemName

attributes not implemented yet
-price
-menuItemEdited
*/

/*ideas for how to solve non implemented attributes

-price is fairly easy include in a each pizza, as is can be fetched from the front-end, however i must first create a price calculator on the menu.ejs file, that correctly calculates the price according to pizza size and if the pizze has been edited.
-the menuItemEdited attribute is supposed to give the cooks a quick overview to check if the pizza is standard or not, as the cooks tend to know the standard pizza by heart and therefor do not
want to look at the order screen if not necessary.
*/