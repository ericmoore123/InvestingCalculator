let recurringInvestment = document.querySelector("#rec-inv-amt");
let interestRate = document.querySelector("#rate");
let years = document.querySelector("#years");
const form = document.querySelector('.form');
const tbody = document.querySelector(".tbody");
const thead = document.querySelector(".thead");
const monthlyAmt = document.querySelector('.mth-cont');
let finalAmt = 0;
let storage = [];

// CAD formatter for table dollar values
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
});

const calculator = (rate, inv) => {
    for(let i = 1; i <= parseInt(years.value); i++){ // Calculate investment returns using user inputs
        for(let j = 0; j < 12; j++){
            finalAmt += inv;
        };
        finalAmt += finalAmt * rate;
        storage.push({"year": i, "amount": formatter.format(finalAmt)}); // Populate storage array with investment amount objects per year
    };
};

const deleteNodes = () => {
    // Remove table body data from DOM
    let nodes = document.querySelector("tbody");
    var child = nodes.lastElementChild; 
    while (child) {
        nodes.removeChild(child);
        child = nodes.lastElementChild;
    }
};

const handleSubmit = (e) => {
    e.preventDefault(); 
    // Remove previous table data
    deleteNodes();
    // Clear previous data
    storage = [];
    finalAmt = 0;

    // Calculate and store data to be shown in table
    calculator(parseInt(interestRate.value)/100, parseInt(recurringInvestment.value));
    // Create table rows with calculated investment data
    console.log(storage)
    storage.map(item => {
        monthlyAmt.innerHTML = `<strong>(${recurringInvestment.value} Monthly)</strong>`;
        thead.classList.remove('hidden')
        let row = document.createElement('tr');
        row.classList.add('tbody-row');
        let year = document.createElement('td');
        let amount = document.createElement('td');
        
        year.innerHTML = `<strong>${item.year}</strong>`;
        amount.innerHTML = `<strong>${item.amount}</strong>`;

        row.appendChild(year);
        row.appendChild(amount);
        tbody.appendChild(row);
    });
};

form.addEventListener("submit", handleSubmit);

