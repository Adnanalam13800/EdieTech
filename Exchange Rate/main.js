const currencyEl_one = document.getElementById("currency-one");
const amountEL_one = document.getElementById("amount-one");

const currencyEL_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEL = document.getElementById("rate");
const swap = document.getElementById("swap");

///calculate 

function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEL_two.value;

    fetch("https://open.exchangerate-api.com/v6/latest")
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const rate = data.rates[currency_two]/ data.rates[currency_one];

            rateEL.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (amountEL_one.value * (rate)).toFixed(2);
        });
}

//event Listeners

currencyEl_one.addEventListener('change', calculate);
amountEL_one.addEventListener('input', calculate);
currencyEL_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEL_two.value;
    currencyEL_two.value = temp;
    calculate();
});

calculate();