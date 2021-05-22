{
  let tasks = [];
  let hideTaskDone = false;

  const activateInput = (newTask) => {
    newTask.focus();
  };

  const resetInput = (newTask) => {
    newTask.value = "";
    activateInput(newTask);
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    task = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex].done = !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleHideTaskDone = () => {
    hideTaskDone = !hideTaskDone;
    render();
  };

  const toggleStatusOfAllTask = () => {
    tasks.map(task => task.done = false);
    render();
  };

  const completeAllTasks = () => {
    tasks.map(task => task.done = true);
    render();
  };

  const deleteAllTasks = () => {
    tasks = [
      ...tasks.splice(0, tasks.lenght),
    ];
    render();
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-doneButton");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);

      });
    });
  };

  const bindRemoveEvents = () => {
    const removeTaskButtons = document.querySelectorAll(".js-removeTaskButton");
    removeTaskButtons.forEach((removeTaskButton, index) => {
      removeTaskButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindHideTaskDoneEvents = () => {
    const hideTaskDoneButton = document.querySelector(".js-hideTaskDoneButton");
    if (hideTaskDoneButton)
      hideTaskDoneButton.addEventListener("click", () => {
        toggleHideTaskDone();
      });
  };

  const bindUnselectedAllTaskButtonEvents = () => {
    const unselectedAllTaskButton = document.querySelector(".js-unselectedAllTaskButton");
    if (unselectedAllTaskButton)
    unselectedAllTaskButton.addEventListener("click", () => {
        toggleStatusOfAllTask();
      });
  };

  const bindCompleteAllTasksEvents = () => {
    const completeAllTasksButton = document.querySelector(".js-completeAllTasksButton");
    if (completeAllTasksButton)
      completeAllTasksButton.addEventListener("click", () => {
        completeAllTasks();
      });
  };
  const bindDeleteAllTasksButtonEvents = () => {
    const deleteAllTasksButton = document.querySelector(".js-deleteAllTasksButton");
    if (deleteAllTasksButton)
    deleteAllTasksButton.addEventListener("click", () => {
        deleteAllTasks();
      });
  };


  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString +=
        `
      <li class="list__item
      ${task.done && hideTaskDone ? "list__item--hide" : ""}">
          <button class="list__button js-doneButton">
            ${task.done ? "done" : ""}
          </button>
          <span class="list__span
            ${task.done ? " list__span--done" : ""}">
            ${task.content}
            </span>
           <button class="list__button list__button--remove js-removeTaskButton">delete</button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderOptionalButtonsTop = () => {
    let optionalButtonsTop = "";

    if (tasks.length > 0) {
      optionalButtonsTop += `
        <button class="container__optionalButtons js-hideTaskDoneButton"
        ${ tasks.every( task => !task.done) ? "disabled" : ""}
        </button>
          ${hideTaskDone ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button >
        <button class="container__optionalButtons js-completeAllTasksButton"
          ${tasks.every(task => task.done) ? "disabled" : ""} >
        Ukończ wszystkie
        </button>
    `;
    }

    document.querySelector(".js-optionalButtonsTop").innerHTML = optionalButtonsTop;
  };

const renderOptionalButtonsBottom = () => {
  let optionalButtonsBottom = "";

    if (tasks.length > 0) {
      optionalButtonsBottom += `
      <button class=" container__optionalButtons js-unselectedAllTaskButton"
          ${tasks.every(task => !task.done) ? "disabled" : ""} >
        Odznacz wszystkie
        </button>
        <button class=" container__optionalButtons js-deleteAllTasksButton">
        Usuń wszystkie
        </button>
    `;
    }

    document.querySelector(".js-optionalButtonsBottom").innerHTML = optionalButtonsBottom;
  };

  const render = () => {
    renderTasks();
    renderOptionalButtonsTop();
    renderOptionalButtonsBottom();
    bindToggleDoneEvents();
    bindRemoveEvents();
    bindHideTaskDoneEvents();
    bindCompleteAllTasksEvents();
    bindUnselectedAllTaskButtonEvents();
    bindDeleteAllTasksButtonEvents();
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