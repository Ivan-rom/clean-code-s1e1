//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

var taskInput = document.getElementById("new-task-input");
var addButton = document.getElementById("new-task-btn");
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var addTask = function () {
  if (!taskInput.value) return;
  const taskString = taskInput.value;

  var deleteButtonImg = createElement({
    tagName: "img",
    className: "task__delete-image",
    options: {
      src: "./remove.svg",
      alt: "remove",
    },
  });

  const elements = [
    {
      tagName: "input",
      className: "task__check",
      options: { type: "checkbox" },
    },
    {
      tagName: "label",
      className: "task__text",
      options: { html: [taskString] },
    },
    {
      tagName: "input",
      className: "task__input",
      options: { type: "text" },
    },
    {
      tagName: "button",
      className: "task__button button",
      options: { html: ["Edit"] },
    },
    {
      tagName: "button",
      className: "task__delete-button button",
      options: { html: [deleteButtonImg] },
    },
  ].map((element) => createElement(element));

  var listItem = createElement({
    tagName: "li",
    className: "incomplete-tasks__task task",
    options: {
      html: elements,
    },
  });

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector(".task__input");
  var label = listItem.querySelector(".task__text");
  var editBtn = listItem.querySelector(".task__button");
  var containsClass = listItem.classList.contains("task--edit-mode");

  if (containsClass) {
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task--edit-mode");
};

var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".task__check");
  var editButton = taskListItem.querySelector(".task__button");
  var deleteButton = taskListItem.querySelector(".task__delete-button");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

function createElement({ tagName, className, options = null }) {
  const element = document.createElement(tagName);
  element.className = className;
  if (options) {
    if (options.src) {
      element.src = options.src;
      element.alt = options.alt;
    } else if (options.type) {
      element.type = options.type;
    } else if (options.html) {
      options.html.forEach((html) => element.append(html));
    }
  }
  return element;
}
