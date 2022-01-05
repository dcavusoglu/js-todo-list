//1 - selectors
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

//14- new list item to show the filtered lists
const filteredList = document.querySelector(".filter-items");

//2- event listeners
//23- add an eventListener to the document so that all function can execute
document.addEventListener("DOMContentLoaded", addItems);
addBtn.addEventListener("click", addNewItem);
todoList.addEventListener("click", deleteItem);
//16- to filter the items you need to use change not click, it is not a mouse event
filteredList.addEventListener("change", filterItems);

//3- functions
function addNewItem(event) {
  // 4- clear all the data in the browser
  event.preventDefault();

  // 5- create a new div for li, doneBtn and deleteBtn

  const newItemDiv = document.createElement('div');
  newItemDiv.classList.add("new-item-div");

  // 6- create the li item in the ul and append it into the new item div
  const newToDo = document.createElement('li');
  newToDo.innerHTML = todoInput.value;
  newToDo.classList.add("new-to-do");
  newItemDiv.appendChild(newToDo);

  //18- save local storage function
  saveLocal(todoInput.value);

  //7- create the doneBtn
  const doneBtn = document.createElement('button');
  doneBtn.innerHTML = `<i class="fas fa-check"></i>`
  doneBtn.classList.add("done-btn");
  newItemDiv.appendChild(doneBtn);

    //8- create the deleteBtn
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`
  deleteBtn.classList.add("delete-btn");
  newItemDiv.appendChild(deleteBtn);

  // 9- append new item div to ul
  todoList.appendChild(newItemDiv);
  // 10- to clear the input place after every submit
  todoInput.value = " ";
}

//11- delete item function
function deleteItem(e) {
  const item = e.target;
  if(item.classList[0] === "delete-btn") {
  //12- to do item's parent element is newItemDiv so it deletes them together
    const todoItem = item.parentElement;
    //13- it first falls and them deletes so in the next next line it has an eventListener
    todoItem.classList.add("fall");
    removeItem(todoItem);
    todoItem.addEventListener("transitionend", function(){
    todoItem.remove();
    });
  }

  if(item.classList[0] === "done-btn") {
    const todoItem = item.parentElement;
    todoItem.classList.toggle("done");
  }
}
//15- filter method for select item
function filterItems(e) {
  const allItems = todoList.childNodes;
  allItems.forEach(function(newItemDiv){
    switch (e.target.value) {
      case "all":
          newItemDiv.style.display = "flex";
        break;
      case "done":
        if(newItemDiv.classList.contains("done")){
          newItemDiv.style.display = "flex";
        } else {
          newItemDiv.style.display = "none";
        }
        break;
      case "notDone":
        if(!newItemDiv.classList.contains("done")) {
          newItemDiv.style.display = "flex";
        } else {
          newItemDiv.style.display = "none";
        }
        break;
    }
  })
}

//17- save the items into the local storage
function saveLocal(newItemDiv) {
  let allItems;
  if(localStorage.getItem("allItems") === null) {
    allItems = [];
  } else {
    allItems = JSON.parse(localStorage.getItem("allItems"));
  }
  allItems.push(newItemDiv);
  localStorage.setItem("allItems", JSON.stringify(allItems));
}

//19- adding items to local storage, copy the add items function above, but there are some changes

function addItems() {
  //20- copy this part from 17
  let allItems;
  if(localStorage.getItem("allItems") === null) {
    allItems = [];
  } else {
    allItems = JSON.parse(localStorage.getItem("allItems"));
  }
  allItems.forEach(function(todoItem) {
    //21- addNewItem function copied version

    // b5- create a new div for li, doneBtn and delet  eBtn

    const newItemDiv = document.createElement('div');
    newItemDiv.classList.add("new-item-div");

    // b6- create the li item in the ul and append it into the new item div
    const newToDo = document.createElement('li');
    // 22- change inner text to new item div
    newToDo.innerHTML = todoItem;
    newToDo.classList.add("new-to-do");
    newItemDiv.appendChild(newToDo)

    //b7- create the doneBtn
    const doneBtn = document.createElement('button');
    doneBtn.innerHTML = `<i class="fas fa-check"></i>`
    doneBtn.classList.add("done-btn");
    newItemDiv.appendChild(doneBtn);

      //b8- create the deleteBtn
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`
    deleteBtn.classList.add("delete-btn");
    newItemDiv.appendChild(deleteBtn);

    // b9- append new item div to ul
    todoList.appendChild(newItemDiv);

  })
}


function removeItem(todoItem) {
  let allItems;
  if(localStorage.getItem("allItems") === null) {
    allItems = [];
  } else {
    allItems = JSON.parse(localStorage.getItem("allItems"));
  }
  const itemIndex = todoItem.children[0].innerText;
  allItems.splice(allItems.indexOf(itemIndex), 1);
//need to set it back to local storage
  localStorage.setItem("allItems", JSON.stringify(allItems));
}



// const todoIndex = Array.from(todosList.childNodes).indexOf(todo);
// todos.splice(todoIndex, 1);
