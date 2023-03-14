$(document).ready(() => {
  if (localStorage.tasks == null) {
    let tasksArray = [[], [], []];
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  } else {
    var tasksArray = JSON.parse(localStorage.getItem("tasks"));
  }
});

$(document).on("click", ".addTaskButton", () => {
  let input = $(".tasksInput").val();
  
});
