function User(name, groceriesList) {
    this.name = name;
    this.groceriesList = groceriesList || [];
    this.updateStorage = function (){

        localStorage.setItem(this.name, JSON.stringify(this.groceriesList));
    }
    this.updateStorage();
}
User.prototype.addItem = function (id, name) {
    this.groceriesList.push({
        name,
        id
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
