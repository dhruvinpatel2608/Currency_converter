// Get references to DOM elements
let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");
let converter = document.querySelector(".converter");
let amount = document.getElementById("amount");
let resultDiv = document.getElementById("result");

// Set default amount = 1
amount.value = 1;

// API endpoint for currency list
let URL = "https://api.frankfurter.app/currencies";

// Load available currencies into dropdowns
async function loadcurrency() {
    let res = await fetch(URL);
    if (res.status == 200) {
        let data = await res.json();
        let num = 0;
        // Loop through currency object
        for (let code in data) {
            let name = data[code];
            num++;
            // Add currency options to dropdowns
            fromCurrency.innerHTML += `<option value="${code}">${num} - ${name}</option>`;
            toCurrency.innerHTML += `<option value="${code}">${num} - ${name}</option>`;
        }
        // Set default selections
        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    }
}

// Convert currency when button is clicked
async function convetCurrency() {
    let amt = amount.value;
    let to = toCurrency.value;
    let from = fromCurrency.value;

    // Validate input amount
    if (amt == "" || isNaN(amt) || amt <= 0) {
        resultDiv.innerText = `⚠️ Please enter a valid positive number.`;
        return;
    }

    // Prevent same currency conversion
    if (from == to) {
        resultDiv.innerText = `"⚠️ Please choose different currencies."`;
        resultDiv.style.color = "red";
        return;
    }

    // Fetch conversion rate from API
    let res = await fetch(`https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`);
    if (res.status == 200) {
        let data = await res.json();
        let rate = data.rates[to];
        // Display conversion result
        resultDiv.innerText = `${amt} ${from} = ${rate} ${to}`;
    }
}

// Add event listener to button
let btn = document.getElementById("convertBtn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    convetCurrency();
});

// Load currencies on page load
loadcurrency();
