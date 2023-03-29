const currencies = {
    USD: '$',                                                                        //currency object
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'AU$',
    CAD: 'CAD$',
    CNH: 'CN¥',
    NZD: 'NZ$',
    SEK: 'SEK',
    KRW: '₩',
    INR: '₹',
    MXN: 'MEX$',
    ZAR: 'ZAR',
    BRL: 'R$',
    PLN: 'zł',
    ILS: '₪'
  };

const form = document.querySelector('form');                                          //initial const and let declarations
const calculateBtn = document.getElementById('calculate');
const totalContainer = document.getElementById('total');
const clearBtn = document.getElementById('clear')
let roundUpCheckbox = document.getElementById('roundUp');
let roundUpChecked = roundUpCheckbox.checked;

roundUpCheckbox.addEventListener('change', function() {                               
    roundUpChecked = roundUpCheckbox.checked;
  });

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const currencySymbol = currencies[document.getElementById('currency').value];      //get the correct currency from the object
    let billAmount = parseFloat(document.getElementById('bill').value);                //get the bill amount 
    let tipPercentage = parseFloat(document.getElementById('tip').value)/100;          // get the tip percentage
    let numPeople = parseInt(document.getElementById('people').value);                 // get number of people

    const tip10Button = document.getElementById('tip-10');                             // tip buttons
    const tip15Button = document.getElementById('tip-15');
    const tip20Button = document.getElementById('tip-20');

    if (isNaN(billAmount) || isNaN(tipPercentage)) {                                   // check if bill amount and tip percentage inputs are valid
        totalContainer.innerHTML = "Please enter a valid number";
        return;
    }

    let tipAmount = billAmount * tipPercentage;                                        //  calculate tip
    let total = billAmount + tipAmount;                                                // calculate total bill
    let totalPerPerson = total / numPeople;                                            // calculate total per person
    let tipPerPerson = tipAmount / numPeople;                                          // calculate tip per person

    if (roundUpChecked) {                                                              // check if roundUP button is checked, round up if true
        tipAmount = Math.ceil(tipAmount);
        total = Math.ceil(total);
    }

    tip10Button.addEventListener('click', function() {                                 // update tip value to match the tip button
        document.getElementById('tip').value = 10;
      });
      
      tip15Button.addEventListener('click', function() {
        document.getElementById('tip').value = 15;
      });
      
      tip20Button.addEventListener('click', function() {
        document.getElementById('tip').value = 20;
      });

    if (total <= 0 || tipAmount <= 0) {                                                // check if total and tip amounts are positive numbers
        totalContainer.innerHTML = "Please enter valid values";
        return;
      }

    if (numPeople > 1) {                                                               // calculate total per person and tip per person if numPeople bigger than 1
        let totalPerPerson = total / numPeople;
        let tipPerPerson = tipAmount / numPeople;
        
        totalContainer.innerHTML =  `Your tip amount is ${currencySymbol}${tipAmount.toFixed(2)} and the total amount is ${currencySymbol}${total.toFixed(2)} 
        (${currencySymbol}${totalPerPerson.toFixed(2)} per person, including ${currencySymbol}${tipPerPerson.toFixed(2)} tip per person).`;
    } else  {
        totalContainer.innerHTML = `Your tip amount is ${currencySymbol}${tipAmount.toFixed(2)} and the total amount is ${currencySymbol}${total.toFixed(2)}`;
    }

})                                                                                     // if numPeople = 1 omit the "per person" part of string literal

clearBtn.addEventListener('click', function(event) {                                   // reset values on clear button
    event.preventDefault();

    document.getElementById('bill').value = '';
    document.getElementById('tip').value = '';
    document.getElementById('people').value = '';
    totalContainer.innerHTML = '';

    roundUpCheckbox.checked = false;
  });

  