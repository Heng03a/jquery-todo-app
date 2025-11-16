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

    // Delete task with slide + fade
    $(document).on("click", ".deleteBtn", function () {
        $(this).parent().slideUp(400, function () {
            $(this).remove();
            saveTasks();
        });
    });

    // Add task to DOM with fade-in
    function addTaskToDOM(text, completed) {
        const taskHTML = `
            <li style="display:none;">
                <span class="task ${completed ? 'complete' : ''}">${text}</span>
                <button class="deleteBtn">X</button>
            </li>
        `;
        $("#taskList").append(taskHTML);
        $("#taskList li:last").fadeIn(500);
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
