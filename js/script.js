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

  const toggleUncheckDone = () => {
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

  const bindUncheckEvents = () => {
    const uncheckButton = document.querySelector(".js-uncheckButton");
    if (uncheckButton)
      uncheckButton.addEventListener("click", () => {
        toggleUncheckDone();
      });
  };

  const bindCompleteAllEvents = () => {
    const completeAllButton = document.querySelector(".js-completeAllButton");
    if (completeAllButton)
      completeAllButton.addEventListener("click", () => {
        completeAllTasks();
      });
  };
  const bindDeleteAllEvents = () => {
    const deleteAllButton = document.querySelector(".js-deleteAllButton");
    if (deleteAllButton)
      deleteAllButton.addEventListener("click", () => {
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

  const renderButtons = () => {
    let actionButtons = "";

    if (tasks.length > 0) {
      actionButtons += `
        <button class="container__actionButton js-hideTaskDoneButton"
        ${ tasks.every( task => !task.done) ? "disabled" : ""}
        </button>
          ${hideTaskDone ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button >
        <button class="container__actionButton js-completeAllButton"
          ${tasks.every(task => task.done) ? "disabled" : ""} >
        Ukończ wszystkie
        </button>
    `;
    }

    document.querySelector(".js-actionButton").innerHTML = actionButtons;
  };

const renderUncheckButton = () => {
  let uncheckButton = "";

    if (tasks.length > 0) {
      uncheckButton += `
      <button class="container__actionButton js-uncheckButton"
          ${tasks.every(task => !task.done) ? "disabled" : ""} >
        Odznacz wszystkie
        </button>
        <button class="container__actionButton js-deleteAllButton">
        Usuń wszystkie
        </button>
    `;
    }

    document.querySelector(".js-uncheckButton").innerHTML = uncheckButton;
  };

  const render = () => {
    renderTasks();
    renderButtons();
    renderUncheckButton();
    bindToggleDoneEvents();
    bindRemoveEvents();
    bindHideTaskDoneEvents();
    bindCompleteAllEvents();
    bindUncheckEvents();
    bindDeleteAllEvents();
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