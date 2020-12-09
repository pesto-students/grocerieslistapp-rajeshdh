var currentUser;
function login(){

    let user = document.getElementById('username').value;
    let userData = localStorage.getItem(user);
    let successMessage = document.querySelectorAll('.successMessage');
    successMessage[0].classList.toggle('hidden');
    successMessage[0].innerText = `Welcome ${user}`

    if(userData){
        //fetch or create a new list
        document.getElementById('fetchList').classList.toggle('hidden');
        document.getElementById('createList').classList.toggle('hidden');
        document.getElementById('loginForm').classList.toggle('hidden');
       

    } else {
        //create a new list
        let errorMessage = document.querySelectorAll('.errorMessage');
       errorMessage[0].classList.toggle('hidden');
       errorMessage[0].innerText = "You don't have any lists. Please click on Create List to create a new list."
       document.getElementById('createList').classList.toggle('hidden');
       document.getElementById('loginForm').classList.toggle('hidden');
    }
    return false;
}

function fetchList(){
    let errorMessage = document.querySelectorAll('.errorMessage');
    errorMessage[0].classList.toggle('hidden');

    document.getElementById('login').classList.toggle('hidden');
    document.getElementById('groceries-list').classList.toggle('hidden');
    let username = document.getElementById('username').value;
    let userData = localStorage.getItem(username);
    let groceriesList = JSON.parse(userData);
    currentUser = new User(username, groceriesList);
    currentUser.listContainer = generateList('groceryContainer');
    currentUser.completedItemContainer = generateList('completedItemsContainer');

    currentUser.groceriesList.forEach(item => {
        let li = createListItem(item.id, item.name, item.completed)
        if (item.completed) {
            currentUser.completedItemContainer.appendChild(li);
    
        } else {
            currentUser.listContainer.appendChild(li);
        }
    }) 
}

function createNewList(){
    let errorMessage = document.querySelectorAll('.errorMessage');
    errorMessage[0].classList.toggle('hidden');
    document.getElementById('groceries-list').classList.toggle('hidden');
    document.getElementById('login').classList.toggle('hidden');

    let username = document.getElementById('username').value;
    currentUser = new User(username);
    currentUser.listContainer = generateList('groceryContainer');
    currentUser.completedItemContainer = generateList('completedItemsContainer');
}




var addGroceryItem = function () {
    let name = document.getElementById('itemName').value;
    let id = Date.now()
    currentUser.addItem(id, name);
    let li = createListItem(id, name);
    currentUser.listContainer.appendChild(li);
}

var createListItem = function (id, name, isChecked = false) {
    let item = createLi('grocery-item')
    item.id = id;

    let checkbox = createInput('checkbox', id, 'check-complete');
    checkbox.onchange = markItemComplete;
    checkbox.checked = !!isChecked;

    let label = createLabel(name, id);

    let editInput = createInput('text', id, 'input-edit');
    editInput.value = name;

    let editButton = createButton('Edit', 'btn-edit', editItem, id);
    let deleteButton = createButton('Delete', 'btn-delete', deleteItem, id);

    [checkbox, label, editInput, editButton, deleteButton].forEach(el => item.appendChild(el));

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

}

var markItemComplete = function (e) {

    let checkBox = e.target;
    let id = checkBox.getAttribute('data-id');
    currentUser.takeOut(id);

    let itemIndex = currentUser.groceriesList.findIndex((item) => item.id == id);
    let name = currentUser.groceriesList[itemIndex].name;

    // we get the updated state, so have to keep it as it is.
    let li = createListItem(id, name, checkBox.checked);

    if (checkBox.checked) {
        currentUser.completedItemContainer.appendChild(li);

    } else {
        let li = createListItem(id, name, false);
        currentUser.listContainer.appendChild(li);
    }

    let listItem = checkBox.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);

}