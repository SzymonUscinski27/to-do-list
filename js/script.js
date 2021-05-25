{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done : !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    }

    const bindRemoveEvent = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    }

    const bindToggleDoneEvent = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const renderTasks = () => {
        let tasksHTML = "";

        for (const task of tasks) {
            tasksHTML += `
            <li class="list__item">
               <button class="list__button list__button--done js-done">
                  ${task.done ? "✓" : " "}
               </button>
               <span 
               class="
                  list__taskContent
                  ${task.done ? "list__taskContent--done" : ""}
                "
                >
                  ${task.content}
               </span>
               <button class="list__button list__button--remove js-remove">
               🗑
               </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksHTML;
    }

    const render = () => {
        renderTasks();
        bindRemoveEvent();
        bindToggleDoneEvent();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        newTask.value = "";
        newTask.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();
}