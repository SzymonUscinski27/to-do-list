{
    const tasks = [];

    const resetNewTaskContent = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent
        });

        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const render = () => {
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

        bindEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        resetNewTaskContent(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();
}