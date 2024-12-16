var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incompleted");
var completedTasksHolder = document.getElementById("completed");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'task__label';
  listItem.className = "list__item task";
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  editInput.type = "text";
  editInput.className = "task__input";
  editButton.innerText = "Edit";
  editButton.className = "task__btn task__btn_edit";
  deleteButton.className = "task__btn task__btn_delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "task__img";
  deleteButtonImg.alt = "remove icon";
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

var editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type = text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".task__btn_edit");
  var containsClass = listItem.classList.contains("list__item_editmode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("list__item_editmode");
};

var deleteTask = function() {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  console.log("Complete Task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Incompleted Task...");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");
  var checkBox = taskListItem.querySelector("input[type = checkbox]");
  var editButton = taskListItem.querySelector(".task__btn_edit");
  var deleteButton = taskListItem.querySelector(".task__btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}