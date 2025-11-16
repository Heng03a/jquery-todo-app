$(document).ready(function () {
    $("#addBtn").click(function () {
        const task = $("#taskInput").val().trim();

        if (task === "") return;

        $("#taskList").append(`
            <li>
                <span class="task">${task}</span>
                <button class="deleteBtn">X</button>
            </li>
        `);

        $("#taskInput").val("");
    });

    // Mark as complete
    $(document).on("click", ".task", function () {
        $(this).toggleClass("complete");
    });

    // Delete task
    $(document).on("click", ".deleteBtn", function () {
        $(this).parent().remove();
    });
});
