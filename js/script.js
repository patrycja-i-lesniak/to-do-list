{
  const tasks = [
    {
      content: "zrobić zadanie domowe z JS",
      done: false,
    },
    {
      content: "przerobić lekcję z hiszpańskiego",
      done: true,
    },
  ];



  const addNewTask = (newTaskContent) => {
    tasks.push({content: newTaskContent,});
    render();
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
    const removeIcons = document.querySelectorAll(".js-removeIcon");

    removeIcons.forEach((removeIcon, index) => {
      removeIcon.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const doneIcons = document.querySelectorAll(".js-doneIcon");

    doneIcons.forEach((doneIcon, index) => {
      doneIcon.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
};


  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li
    
        ${task.done ? ' style="text-decoration: line-through"' : ""}
        >
        

        <img class="doneIcon js-doneIcon" src="https://i.ibb.co/zbGNRVr/uncheck-mark-25px.png" alt="uncheck-mark-25px" border="0" />
        
       
        ${task.content}
        <img class="removeIcon js-removeIcon" src="https://i.ibb.co/SRKnmct/trash-25px.png" alt="trash-25px" border="0" />
    </li>
    `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();


  };

  

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };
  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
