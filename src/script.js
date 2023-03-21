$(document).ready(() => {
  window.todos = getTodos();
  loadTodos(todos);
});

$(document).on("click", ".addTaskButton", () => {
  let tasksInput = $(".tasksInput");
  let inputValue = tasksInput.val();
  let errorMessage = $(".errorMessage");

  if (inputValue != "") {
    errorMessage.addClass("hidden");

    let taskID = window.todos.length;

    createTaskElement("toDO", inputValue, taskID);
    tasksInput.val("");
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");

    let todoValue = "toDO" + "," + inputValue + "," + taskID;

    window.todos.push(todoValue);
    saveTodo(todoValue);
  } else {
    errorMessage.text("Add task name");
    errorMessage.removeClass("hidden");
  }
});

$(document).on("click", ".taskCheckButton", () => {});

$(document).on("click", ".deleteTaskButton", () => {});

function createTaskElement(state, value, id) {
  let taskElement = $(
    "<div class='taskElement " +
      state +
      "' state='" +
      state +
      "' id='" +
      id +
      "'>" +
      "<div class='deletedTaskLine'></div>" +
      "<div class='taskContent'>" +
      value +
      "</div>" +
      "<button class='taskCheckButton'>" +
      "<i class='fa-solid fa-check'></i>" +
      "</button>" +
      "<button class='deleteTaskButton'>" +
      "<i class='fa-solid fa-x'></i>" +
      "</button>" +
      "</div>"
  );
  $(".tasksContainer").append(taskElement);
}

function saveTodo(todoToSave) {
  let todos = [];

  if (window.localStorage.getItem("todos") !== null) {
    todos = JSON.parse(window.localStorage.getItem("todos"));
  }

  todos.push(todoToSave);
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodo(todoID, newState) {
  let todoData = window.todos[todoID].split(",");
  todoData[0] = newState;
  window.todos[todoID] = todoData;
  window.localStorage.setItem("todos", JSON.stringify(todoData));
}

function getTodos() {
  let todos = [];
  if (window.localStorage.getItem("todos") !== null) {
    todos = JSON.parse(window.localStorage.getItem("todos"));
  }
  return todos;
}

function loadTodos(todos) {
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i].split(",");
    let state = todo[0];
    let value = todo[1];
    let id = parseInt(todo[2]);

    createTaskElement(state, value, id);
  }
}
