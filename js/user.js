function User(name, groceriesList) {
    this.name = name;
    this.groceriesList = groceriesList || [];
    this.completedItems = () => this.groceriesList.filter(item => item.completed);
    this.updateStorage = function (){

        localStorage.setItem(this.name, JSON.stringify(this.groceriesList));
    }
    this.updateStorage();
}
User.prototype.addItem = function (id, name) {
    this.groceriesList.push({
        name,
        id,
        completed: false
    });
    this.updateStorage();
}

User.prototype.editItem = function (id, name) {
    let itemIndex = this.groceriesList.findIndex((item) => item.id == id);
    this.groceriesList[itemIndex].name = name;
    this.updateStorage();
}

User.prototype.deleteItem = function (id) {
    let itemIndex = this.groceriesList.findIndex((item) => item.id == id);
    this.groceriesList.splice(itemIndex, 1);
    this.updateStorage();
}

User.prototype.takeOut = function (id) {

    let itemIndex = this.groceriesList.findIndex((item) => item.id == id);
    this.groceriesList[itemIndex].completed = !this.groceriesList[itemIndex].completed;
    this.updateStorage();
}
