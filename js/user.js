function User() {
    this.name = 'Rajesh'
    this.groceriesList = [];
    this.completedItems = () => this.groceriesList.filter(item => item.completed);
}
User.prototype.addItem = function (id, name) {
    this.groceriesList.push({
        name,
        id,
        completed: false
    });
}

User.prototype.editItem = function (id, name) {
    let itemIndex = this.groceriesList.findIndex((item) => item.id == id);
    this.groceriesList[itemIndex].name = name;
}

User.prototype.deleteItem = function (id) {
    let itemIndex = this.groceriesList.findIndex((item) => item.id == id);
    this.groceriesList.splice(itemIndex, 1);
}

User.prototype.takeOut = function (id) {

    let itemIndex = person.groceriesList.findIndex((item) => item.id == id);
    person.groceriesList[itemIndex].completed = !person.groceriesList[itemIndex].completed;
}