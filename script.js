let button = document.getElementById("enter");
let input = document.getElementById("userinput");
let ul = document.querySelector("ul");
let item = document.querySelectorAll("li");
let deleteButton = document.getElementsByClassName("delete")

let items = []

// Read existing data from localStorage
const loadItems = () => {
    const itemsJSON = localStorage.getItem('items')

    try {
        return itemsJSON ? JSON.parse(itemsJSON) : []
    } catch (e) {
        return []
    }
}

items = loadItems();

items.forEach((item) => {
	let li = document.createElement("li");
	let delButton = document.createElement("button");
	delButton.textContent = "x";
	delButton.setAttribute("class", "delete");
	
	li.appendChild(document.createTextNode(item));
	li.appendChild(delButton);
	ul.appendChild(li);

	li.addEventListener("click", function() {
		if (li.classList) {
			li.classList.toggle("done");
		}
	});
})

// Save recipes to localStorage
const saveItems = () => {
    localStorage.setItem('items', JSON.stringify(items))
}

// Expose recipes from module
const getItems = () => items

function inputLength() {
	return input.value.length;
}

function createListElement() {
	let li = document.createElement("li");
	let delButton = document.createElement("button");
	delButton.textContent = "x";
	delButton.setAttribute("class", "delete");
	
	li.appendChild(document.createTextNode(input.value));
	items.push(input.value);
	saveItems();
	li.appendChild(delButton);
	ul.appendChild(li);
	input.value = "";

	li.addEventListener("click", function() {
		if (li.classList) {
			li.classList.toggle("done");
		}
	});

	delButton.addEventListener("click", function() {
		const index = items.findIndex(item => item ===(this.parentNode.textContent).slice(0,-1))
		items.splice(index,1);
		saveItems();
		li.parentNode.removeChild(li);
	});
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

for (let i=0; i<item.length;i++) {
	item[i].addEventListener("click", toggleListItem);
}

function toggleListItem() {
	this.classList.toggle("done");
}

for (let i=0; i<deleteButton.length;i++) {
	deleteButton[i].addEventListener("click", deleteItem);
}

function deleteItem() {
	const index = items.findIndex(item => item ===(this.parentNode.textContent).slice(0,-1))
	items.splice(index,1);
	saveItems();
	this.parentNode.parentNode.removeChild(this.parentNode);
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
