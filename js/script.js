{
  let tasks = [];
  let hideTaskDone = false;

  const setFocusOnInput = (newTask) => {
    newTask.focus();
  };

  const resetInput = (newTask) => {
    newTask.value = "";
    setFocusOnInput(newTask);
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    const task = tasks[taskIndex];
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...task,
        done: !task.done
      },
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

  const setAllTasksNotDone = () => {
    tasks = tasks.map(task => ({
      ...task,
      done: false,
    }));
    render();
  };

  const completeAllTasks = () => {
    tasks = tasks.map(task => ({
      ...task,
      done: true,
    }));
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

  const bindHideTaskDoneEvent = () => {
    const hideDoneTasksButton = document.querySelector(".js-hideTaskDoneButton");
    if (!hideDoneTasksButton) {
      return;
    }
    hideDoneTasksButton.addEventListener("click", () => {
      toggleHideTaskDone();
    });
  };

  const bindUnselectAllTaskButtonEvent = () => {
    const unselectAllTasksButton = document.querySelector(".js-unselectedAllTaskButton");
    if (!unselectAllTasksButton) {
      return;
    }
    unselectAllTasksButton.addEventListener("click", () => {
      setAllTasksNotDone();
    });
  };

  const bindCompleteAllTasksEvent = () => {
    const completeAllTasksButton = document.querySelector(".js-completeAllTasksButton");
    if (!completeAllTasksButton) {
      return;
    }
    completeAllTasksButton.addEventListener("click", () => {
      completeAllTasks();
    });
  };

  const bindDeleteAllTasksButtonEvent = () => {
    const deleteAllTasksButton = document.querySelector(".js-deleteAllTasksButton");
    if (!deleteAllTasksButton) {
      return;
    }
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
      ${task.done && hideTaskDone ? " list__item--hide" : ""}">
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
    let buttonsTop = "";

    if (tasks.length > 0) {
      buttonsTop += `
      <button class="container__optionalButtons js-hideTaskDoneButton"
        ${tasks.every(task => !task.done) ? "disabled" : ""}
      </button>
        ${hideTaskDone ? "Pokaż ukończone" : "Ukryj ukończone"}
      <button class="container__optionalButtons js-completeAllTasksButton"
        ${tasks.every(task => task.done) ? "disabled" : ""}>
          Ukończ wszystkie
      </button>
      `;
    }
    document.querySelector(".js-buttonsTop").innerHTML = buttonsTop;

    let buttonsBottom = "";

    if (tasks.length > 0) {
      buttonsBottom += `
      <button class=" container__optionalButtons js-unselectedAllTaskButton"
        ${tasks.every(task => !task.done) ? "disabled" : ""} >
      Odznacz wszystkie
      </button>
      <button class=" container__optionalButtons js-deleteAllTasksButton">
      Usuń wszystkie
      </button>
      `;
    }
    document.querySelector(".js-buttonsBottom").innerHTML = buttonsBottom;
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindToggleDoneEvents();
    bindRemoveEvents();
    bindHideTaskDoneEvent();
    bindCompleteAllTasksEvent();
    bindUnselectAllTaskButtonEvent();
    bindDeleteAllTasksButtonEvent();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTask = document.querySelector(".js-newTask");
    const newTaskContent = newTask.value.trim();

    if (newTaskContent === "") {
      setFocusOnInput(newTask);
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