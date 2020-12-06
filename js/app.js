const person = new User();
person.listContainer = generateList('groceryContainer');
person.completedItemContainer = generateList('completedItemsContainer');

var addGroceryItem = function () {
    let name = document.getElementById('itemName').value;
    let id = Date.now()
    person.addItem(id, name);
    let li = createListItem(id, name);
    person.listContainer.appendChild(li);
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
        editInput.classList.add('input-edit-visible');
        editInput.classList.remove('input-edit');
        editInput.value = itemLabel.innerText;
    } else {
        editInput.classList.remove('input-edit-visible');
        editInput.classList.add('input-edit');
        itemLabel.innerText = editInput.value;
        person.editItem(id, editInput.value);
    }
}

var deleteItem = function (e) {
    let deleteButton = e.target;
    let id = deleteButton.getAttribute('data-id');

    person.deleteItem(id);

    let listItem = deleteButton.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);

}

var markItemComplete = function (e) {
    console.log(e.target.checked)
    let checkBox = e.target;
    let id = checkBox.getAttribute('data-id');
    person.takeOut(id);

    let itemIndex = person.groceriesList.findIndex((item) => item.id == id);
    let name = person.groceriesList[itemIndex].name;

    // we get the updated state, so have to keep it as it is.
    let li = createListItem(id, name, checkBox.checked);

    if (checkBox.checked) {
        person.completedItemContainer.appendChild(li);

    } else {
        let li = createListItem(id, name, false);
        person.listContainer.appendChild(li);
    }

    let listItem = checkBox.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);

}