const createInput = function (type, id, className) {
    let input = document.createElement('input');
    input.setAttribute('data-id', id);
    input.type = type;
    input.className = className;
    return input;
}

const createLabel = function (text, id) {
    let label = document.createElement('label');
    label.innerText = text;
    label.setAttribute('data-id', id);
    return label;
}
const createButton = function (title, className, event, id) {
    let button = document.createElement('button');
    button.innerText = title;
    button.className = className;
    button.onclick = event;
    button.setAttribute('data-id', id);
    return button;
}

const createUl = function (className) {
    let listEl = document.createElement('ul');
    listEl.className = className;
    return listEl;
}
const createLi = function (className) {
    let item = document.createElement('li');
    item.className = className;
    return item;
}

var generateList = function (container) {
    let ul = createUl('list-container');
    document.getElementById(container).appendChild(ul);
    return ul;
}
