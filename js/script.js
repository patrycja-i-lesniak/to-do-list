{
  let tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks = [
    ...tasks,
    {content: newTaskContent},
  ];
    render();
  };

  const resetInput = (newTask) => {
    newTask.value = "";
    activateInput(newTask);
  };

  const activateInput = (newTask) => {
    newTask.focus();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    const removeTaskButtons = document.querySelectorAll(".js-removeTaskButton");

    removeTaskButtons.forEach((removeTaskButton, index) => {
      removeTaskButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="list__item">
        <button class="list__button js-doneButton">${task.done ? "done" : ""
        }</button>
        <span
        class="list__span${task.done ? " list__span--done" : ""}">
        ${task.content}
       </span>
        <button class="list__button list__button--remove js-removeTaskButton">delete</button>
    </li>
    `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const render = () => {
    renderTasks();
    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTask = document.querySelector(".js-newTask");
    const newTaskContent = newTask.value.trim();

    if (newTaskContent === "") {
      activateInput(newTask);
      return;
    }
    resetInput(newTask);
    addNewTask(newTaskContent);
    return;
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
