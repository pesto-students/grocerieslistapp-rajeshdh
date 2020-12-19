function User(name, groceriesList) {
    this.name = name;
    this.groceriesList = groceriesList || [];
    this.updateStorage = function (){

        let appData = localStorage.getItem(APP_NAME);
        appData = appData ? JSON.parse(appData) : {};
        appData[this.name] = this.groceriesList;
        console.log((APP_NAME, JSON.stringify(appData)))
        localStorage.setItem(APP_NAME, JSON.stringify(appData));
    }
    
   this.setUser = function(){
        let users = localStorage.getItem(`${APP_NAME}users`);
        users = JSON.parse(users) || [];
        console.log(users);
        if(users.indexOf(this.name) > -1){
            // user already exists do nothing

        } else if(users.length >= 3 ){
            let userToRemove = users.shift();
            let appData = localStorage.getItem(APP_NAME);
            appData = appData ? JSON.parse(appData) : {};
            delete appData[userToRemove] 
            console.log((APP_NAME, JSON.stringify(appData)))
            localStorage.setItem(APP_NAME, JSON.stringify(appData));
            users.push(this.name);
        }
        else {
            users.push(this.name);
        }
        
        console.log(users);
        localStorage.setItem(`${APP_NAME}users`, JSON.stringify(users))
   };
  this.setUser();
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

function removeLastUser(){
    let appData = localStorage.getItem(APP_NAME);
    appData = appData ? JSON.parse(appData) : {};
    if (Object.keys(appData).length >=3){
        
    }
}