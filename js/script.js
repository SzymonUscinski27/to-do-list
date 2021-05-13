{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent
        });

        render();
    }

    const render = () => {
        let listOfTasks = "";

        for (task of tasks) {
            listOfTasks += `
            <li>
            ${task.content}
            </li>`
        }

        document.querySelector(".js-tasks").innerHTML = listOfTasks;
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();
}