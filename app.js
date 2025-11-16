$(document).ready(function () {
    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));

    // Add task
    $("#addBtn").click(function () {
        const taskText = $("#taskInput").val().trim();
        if (taskText === "") return;

        addTaskToDOM(taskText, false);
        saveTasks();
        $("#taskInput").val("");
    });

    // Click task to toggle complete
    $(document).on("click", ".task", function () {
        $(this).toggleClass("complete");
        saveTasks();
    });

    // Delete task
    $(document).on("click", ".deleteBtn", function () {
        $(this).parent().remove();
        saveTasks();
    });

    // Add task to DOM
    function addTaskToDOM(text, completed) {
        const taskHTML = `
            <li>
                <span class="task ${completed ? 'complete' : ''}">${text}</span>
                <button class="deleteBtn">X</button>
            </li>
        `;
        $("#taskList").append(taskHTML);
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        $("#taskList li").each(function () {
            const text = $(this).find(".task").text();
            const completed = $(this).find(".task").hasClass("complete");
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
