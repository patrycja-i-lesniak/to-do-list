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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li>
        ${task.content}
    </li>
    `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const init = () => {
    render();
  };

  init();
}
