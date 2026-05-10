let people = [];
let expenses = [];

let addPersonBtn = document.getElementById("addPersonBtn");
let personInput = document.getElementById("personInput");

let peopleList = document.getElementById("peopleList");

let addExpenseBtn = document.getElementById("addExpenseBtn");

let expenseTitle = document.getElementById("expenseTitle");
let expenseAmount = document.getElementById("expenseAmount");

let transactionList = document.getElementById("transactionList");

addPersonBtn.onclick = function () {

    let personName = personInput.value.trim();

    if (personName === "") {
        alert("Please enter a name");
        return;
    }

    people.push(personName);

    renderPeople();

    personInput.value = "";
};

function renderPeople() {

    peopleList.innerHTML = "";

    if (people.length === 0) {

        peopleList.innerHTML =
            `<p class="empty-text">
                No people added yet.
            </p>`;

        return;
    }

    for (let i = 0; i < people.length; i++) {

        let personBox = document.createElement("div");

        personBox.className = "person-item";

        personBox.innerText = people[i];

        peopleList.appendChild(personBox);
    }
}

addExpenseBtn.onclick = function () {

    let titleValue = expenseTitle.value.trim();

    let amountValue = expenseAmount.value;

    if (titleValue === "" || amountValue === "") {
        alert("Fill all expense details");
        return;
    }

    let expenseData = {
        title: titleValue,
        amount: amountValue
    };

    expenses.push(expenseData);

    renderExpenses();

    expenseTitle.value = "";
    expenseAmount.value = "";
};

function renderExpenses() {

    transactionList.innerHTML = "";

    if (expenses.length === 0) {

        transactionList.innerHTML =
            `<p class="empty-text">
                No expenses added yet.
            </p>`;

        return;
    }

    for (let i = 0; i < expenses.length; i++) {

        let expenseBox = document.createElement("div");

        expenseBox.className = "transaction-item";

        expenseBox.innerHTML = `
            <div class="transaction-top">
                <span class="transaction-title">
                    ${expenses[i].title}
                </span>

                <span class="transaction-amount">
                    ₹${expenses[i].amount}
                </span>
            </div>

            <div class="transaction-info">
                Added expense to the group
            </div>
        `;

        transactionList.appendChild(expenseBox);
    }
}