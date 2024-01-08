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
  bindTaskEvents(listItem);

  taskInput.value = "";
};

var editTask = function () {
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
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompletedToggle = function () {
  var listItem = this.parentNode;
  if (listItem.parentNode.id === "incomplete-tasks") {
    completedTasksHolder.appendChild(listItem);
  } else {
    incompleteTaskHolder.appendChild(listItem);
  }
};

addButton.onclick = addTask;

var bindTaskEvents = function (taskListItem) {
  var checkBox = taskListItem.querySelector(".task__check");
  var editButton = taskListItem.querySelector(".task__button");
  var deleteButton = taskListItem.querySelector(".task__delete-button");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = taskCompletedToggle;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i]);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i]);
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
