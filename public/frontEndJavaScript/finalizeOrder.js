const originalPrice = +document.getElementById('orderPriceTotal').value
    const costOfDelivery = 70

    function determineDeliveryOrTakeAway(chosenOption){
        console.log(chosenOption)
        
        if(chosenOption === 'delivery'){
            console.log('original price without delivery: ' + originalPrice)
            newPrice = originalPrice + costOfDelivery
            document.getElementById('orderPriceTotal').value = newPrice
            divToBeRevealed = document.getElementById('orderDeliveryInfo')
            divToBeRevealed.removeAttribute('hidden')

            

        }
        if(chosenOption === "takeAway"){
            console.log('originalPrice: ' + originalPrice)
            document.getElementById('orderPriceTotal').value = originalPrice
            divToBeHidden = document.getElementById('orderDeliveryInfo')
            divToBeHidden.setAttribute('hidden', 'hidden')
           
        }
    }; 