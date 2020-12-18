var currentUser;

function login() {

    let user = document.getElementById('username').value;
    if (!user) {
        showNotification('error', 'Please enter a valid username.')
        return false;
    }
    // show a message here
    let userData = localStorage.getItem(user);
    showNotification('success', `Welcome ${user}`)

    if (userData) {
        //fetch or create a new list
        document.getElementById('fetchList').classList.toggle('hidden');
        document.getElementById('createList').classList.toggle('hidden');
        document.getElementById('loginForm').classList.toggle('hidden');


    } else {
        //create a new list
        showNotification('error', "You don't have any lists. Please click on Create List to create a new list.")
        document.getElementById('createList').classList.toggle('hidden');
        document.getElementById('loginForm').classList.toggle('hidden');
    }
    return false;
}

function showNotification(type, text) {
    if (type == 'success') {
        let successMessage = document.querySelectorAll('.successMessage');
        successMessage[0].classList.toggle('hidden');
        successMessage[0].innerText = text;

    } else {
        let errorMessage = document.querySelectorAll('.errorMessage');
        errorMessage[0].classList.toggle('hidden');
        errorMessage[0].innerText = text;
    }
}

function fetchList() {
    let errorMessage = document.querySelectorAll('.errorMessage');
    errorMessage[0].classList.toggle('hidden');

    document.getElementById('login').classList.toggle('hidden');
    document.getElementById('groceries-list').classList.toggle('hidden');
    let username = document.getElementById('username').value;
    let userData = localStorage.getItem(username);
    let groceriesList = JSON.parse(userData);
    currentUser = new User(username, groceriesList);
    currentUser.listContainer = generateList('groceryContainer');

    currentUser.groceriesList.forEach(item => {
        let li = createListItem(item.id, item.name)

        currentUser.listContainer.appendChild(li);

    })
    setRemainingItems();
}

function createNewList() {
    let errorMessage = document.querySelectorAll('.errorMessage');
    errorMessage[0].classList.toggle('hidden');
    document.getElementById('groceries-list').classList.toggle('hidden');
    document.getElementById('login').classList.toggle('hidden');

    let username = document.getElementById('username').value;
    currentUser = new User(username);
    currentUser.listContainer = generateList('groceryContainer');
    setRemainingItems();
}




var addGroceryItem = function () {
    let name = document.getElementById('itemName').value;
    if (!name || currentUser.groceriesList.length >= 5) return;
    let id = Date.now()
    currentUser.addItem(id, name);
    let li = createListItem(id, name);
    currentUser.listContainer.appendChild(li);
    document.getElementById('itemName').value = '';
    setRemainingItems();
}

var createListItem = function (id, name, isChecked = false) {
    let item = createLi('grocery-item')
    item.id = id;

    let label = createLabel(name, id);

    let editInput = createInput('text', id, 'input-edit');
    editInput.value = name;

    let editButton = createButton('Edit', 'btn-edit', editItem, id);
    let deleteButton = createButton('Delete', 'btn-delete', deleteItem, id);

    [label, editInput, editButton, deleteButton].forEach(el => item.appendChild(el));

    return item;
}

var editItem = function (e) {
    let editButton = e.target;
    let id = editButton.getAttribute('data-id');
    let buttonText = editButton.innerText;
    editButton.innerText = buttonText === 'Edit' ? 'Save' : 'Edit';

    let editInput = document.querySelector(`input[type="text"][data-id="${id}"]`);
    let itemLabel = document.querySelector(`label[data-id="${id}"]`);

    if (buttonText === 'Edit') {
        editInput.parentNode.classList.toggle('editMode');
        editInput.value = itemLabel.innerText;
    } else {
        editInput.parentNode.classList.toggle('editMode');
        itemLabel.innerText = editInput.value;
        currentUser.editItem(id, editInput.value);
    }
}

var deleteItem = function (e) {
    let deleteButton = e.target;
    let id = deleteButton.getAttribute('data-id');

    currentUser.deleteItem(id);

    let listItem = deleteButton.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);
    setRemainingItems();
}

var setRemainingItems = function (){
    document.getElementById('remaningItems').innerHTML = `You can add ${5 - currentUser.groceriesList.length} items`
}