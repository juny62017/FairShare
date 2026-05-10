let savedPeople = localStorage.getItem("peopleData");
let savedExpenses = localStorage.getItem("expenseData");

let people = savedPeople ? JSON.parse(savedPeople) : [];
let expenses = savedExpenses ? JSON.parse(savedExpenses) : [];

let addPersonBtn = document.getElementById("addPersonBtn");
let personInput = document.getElementById("personInput");
let peopleList = document.getElementById("peopleList");

let addExpenseBtn = document.getElementById("addExpenseBtn");
let expenseTitle = document.getElementById("expenseTitle");
let expenseAmount = document.getElementById("expenseAmount");

let transactionList = document.getElementById("transactionList");
let summaryList = document.getElementById("summaryList");

renderPeople();
renderExpenses();
updateSummary();

addPersonBtn.onclick = function () {
    let personName = personInput.value.trim();

    if (personName === "") {
        alert("Please enter a name");
        return;
    }

    people.push(personName);

    saveData();
    renderPeople();
    updateSummary();

    personInput.value = "";
};

addExpenseBtn.onclick = function () {
    let titleValue = expenseTitle.value.trim();
    let amountValue = expenseAmount.value;

    if (titleValue === "" || amountValue === "") {
        alert("Fill all expense details");
        return;
    }

    if (people.length === 0) {
        alert("Add people first");
        return;
    }

    let expenseData = {
        title: titleValue,
        amount: Number(amountValue)
    };

    expenses.push(expenseData);

    saveData();
    renderExpenses();
    updateSummary();

    expenseTitle.value = "";
    expenseAmount.value = "";
};

function renderPeople() {
    peopleList.innerHTML = "";

    if (people.length === 0) {
        peopleList.innerHTML =
            `<p class="empty-text">No people added yet.</p>`;

        return;
    }

    for (let i = 0; i < people.length; i++) {
        let personBox = document.createElement("div");

        personBox.className = "person-item";

        personBox.innerHTML = `
            <span>${people[i]}</span>

            <button class="remove-person-btn" onclick="removePerson(${i})">
                ×
            </button>
        `;

        peopleList.appendChild(personBox);
    }
}

function renderExpenses() {
    transactionList.innerHTML = "";

    if (expenses.length === 0) {
        transactionList.innerHTML =
            `<p class="empty-text">No expenses added yet.</p>`;

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
                Split equally between all members
            </div>

            <button class="delete-btn" onclick="deleteExpense(${i})">
                Delete
            </button>
        `;

        transactionList.appendChild(expenseBox);
    }
}

function removePerson(index) {
    people.splice(index, 1);

    saveData();
    renderPeople();
    updateSummary();
}

function deleteExpense(index) {
    expenses.splice(index, 1);

    saveData();
    renderExpenses();
    updateSummary();
}

function updateSummary() {
    summaryList.innerHTML = "";

    if (people.length === 0 || expenses.length === 0) {
        summaryList.innerHTML =
            `<p class="empty-text">Expense summary will appear here.</p>`;

        return;
    }

    let totalExpense = 0;

    for (let i = 0; i < expenses.length; i++) {
        totalExpense += expenses[i].amount;
    }

    let splitAmount = totalExpense / people.length;

    for (let i = 0; i < people.length; i++) {
        let summaryBox = document.createElement("div");

        summaryBox.className = "summary-item";

        summaryBox.innerHTML = `
            <div class="summary-name">
                ${people[i]}
            </div>

            <div class="summary-price">
                Needs to pay ₹${splitAmount.toFixed(2)}
            </div>
        `;

        summaryList.appendChild(summaryBox);
    }
}

function saveData() {
    localStorage.setItem("peopleData", JSON.stringify(people));
    localStorage.setItem("expenseData", JSON.stringify(expenses));
}