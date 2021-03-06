{
    let tasks = [];
    let hideDoneTasks = false;

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
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    }

    const toggleAllTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));

        render();
    }

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks

        render();
    }

    const bindToggleTasksDone = () => {
        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasksButton");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", () => {
                toggleHideDoneTasks();
            });
        }
    }

    const bindToggleAllTasksDone = () => {
        const toggleAllTasksButton = document.querySelector(".js-toggleAllTasksDoneButton");

        if (toggleAllTasksButton) {
            toggleAllTasksButton.addEventListener("click", () => {
                toggleAllTasksDone();
            });
        }
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    }

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const renderButtons = () => {
        let buttonsHTML = "";

        if (tasks.length > 0) {
            buttonsHTML += `
            <button class="
            section__button js-toggleHideDoneTasksButton
            "
            >
                ${hideDoneTasks ? "Poka??" : "Ukryj"} uko??czone
            </button>
            <button 
              class="section__button js-toggleAllTasksDoneButton" 
              ${tasks.every(({ done }) => done) ? "disabled" : ""}
            > 
            Uko??cz wszystkie
            </button>
            `;
        }

        document.querySelector(".js-buttonsContainer").innerHTML = buttonsHTML;
    }

    const renderTasks = () => {
        let tasksHTML = "";

        for (const task of tasks) {
            tasksHTML += `
            <li class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""}">
               <button class="list__button list__button--done js-done">
                  ${task.done ? "???" : ""}
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
               ????
               </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksHTML;
    }

    const render = () => {
        renderTasks();
        renderButtons();

        bindToggleTasksDone();
        bindToggleAllTasksDone();
        bindRemoveEvents();
        bindToggleDoneEvents();
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