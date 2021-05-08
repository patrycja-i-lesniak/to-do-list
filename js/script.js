{
  const tasks = [
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };

  const resetInput = (newTask) => {
    newTask.value = "";
    newTask.focus();
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
    const removeButtons = document.querySelectorAll(".js-removeButton");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="list__item">
        <button class="list__button js-doneButton">${
          task.done ? "done" : ""
        }</button>   
        <section class=${
          task.done ? '"list__span list__span--done">' : '"list__span">'
        }${task.content}</section>
        <button class="list__button list__button--remove js-removeButton">delete</button>
    </li>
    `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    const newTask = document.querySelector(".js-newTask");

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
