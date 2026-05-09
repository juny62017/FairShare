let people = [];

let addPersonBtn = document.getElementById("addPersonBtn");
let personInput = document.getElementById("personInput");
let peopleList = document.getElementById("peopleList");
let emptyPeople = document.getElementById("emptyPeople");

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
            `<p class="empty-text" id="emptyPeople">
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