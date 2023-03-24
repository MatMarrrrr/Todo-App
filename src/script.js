$(document).ready(() => {
  window.todos = getTodos();
  loadTodos(window.todos);
});

$(document).on("click", ".addTaskButton", () => {
  let tasksInput = $(".tasksInput");
  let inputValue = tasksInput.val();
  let errorMessage = $(".errorMessage");

  if (inputValue != "") {
    errorMessage.addClass("hidden");

    let taskID = 0;

    if (window.todos !== undefined) {
      taskID = window.todos.length;
    }

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

$(document).on("click", ".taskCheckButton", function () {
  let taskElement = $(this).parent();
  let todoID = taskElement.attr("id");
  taskElement.attr("state", "completed");
  taskElement.removeClass("toDO");
  taskElement.addClass("completed");
  updateTodo(todoID, "completed");
});

$(document).on("click", ".deleteTaskButton", function () {
  let taskElement = $(this).parent();
  let todoID = taskElement.attr("id");

  taskElement.attr("state", "deleted");

  taskElement.removeClass("toDO");
  taskElement.removeClass("completed");
  taskElement.addClass("deleted");
  updateTodo(todoID, "deleted");
});

$(document).on("keypress", ".tasksInput", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    $(".addTaskButton").click();
  }
});

$(document).on("click", ".clearAllTasksButton", () => {
  window.localStorage.removeItem("todos");
  window.localStorage.setItem("todos", JSON.stringify([]));
  $(".taskElement").remove();
  window.todos = getTodos();
});

$(document).on("change", ".sortTasks", function () {
  let tasks = $(".taskElement");

  tasks.each(function () {
    let state = $(this).attr("state");

    if ($(".sortTasks").val() !== state && $(".sortTasks").val() !== "all") {
      $(this).addClass("hidden");
    } else {
      $(this).removeClass("hidden");
    }
  });
});

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
  let todosData = JSON.parse(window.localStorage.getItem("todos"));
  let todoDetails = todosData[todoID].split(",");

  todoDetails[0] = newState;
  todosData[todoID] = todoDetails.join(",");

  window.localStorage.setItem("todos", JSON.stringify(todosData));
}

function getTodos() {
  let todos = [];

  try {
    if (window.localStorage.getItem("todos") !== null) {
      todos = JSON.parse(window.localStorage.getItem("todos"));
    }
  } catch (e) {
    console.error("Error parsing todos:", e);
    window.localStorage.removeItem("todos");
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
