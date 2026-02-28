// Key for localStorage
const STORAGE_KEY = "jquery_todo_tasks";

let tasks = [];
let currentFilter = "all"; // 'all' | 'active' | 'completed'

$(document).ready(function () {
  loadTasks();
  renderTasks();

  // Add task button
  $("#add-task-btn").on("click", function () {
    addTaskFromInput();
  });

  // Enter key in input
  $("#task-input").on("keypress", function (e) {
    if (e.which === 13) {
      addTaskFromInput();
    }
  });

  // Filter buttons
  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    currentFilter = $(this).data("filter");
    renderTasks();
  });

  // Clear completed
  $("#clear-completed-btn").on("click", function () {
    // phua commented/added codes below on 1/3/2026
    //tasks = tasks.filter((t) => !t.completed);
    if (confirmClearComplete()) {
      tasks = tasks.filter((t) => !t.completed);
      saveTasks();
      renderTasks();
    }
  });

  // Delegated events for dynamically created items
  $("#task-list")
    // toggle complete
    .on("click", ".task-toggle", function () {
      const id = $(this).closest(".task-item").data("id");
      toggleTaskCompleted(id);
    })
    // delete task
    $(document).on("click", ".delete-task-btn", function () {
    const id = $(this).closest(".task-item").data("id");

    if (confirmDelete()) {
      deleteTask(id);
    }
  });
});

/* -------------------------------
   Core helpers
--------------------------------*/

function addTaskFromInput() {
  const input = $("#task-input");
  const text = input.val().trim();

  if (!text) return;

  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.val("").focus();
}

function toggleTaskCompleted(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function confirmDelete() {
    return confirm("Are you sure you want to delete this task?");
}

function confirmClearCompleted() {
    return confirm("Are you sure you want to Clear this Completed task?");
}

/* -------------------------------
   Rendering
--------------------------------*/

function renderTasks() {
  const list = $("#task-list");
  list.empty();

  let filtered = tasks;
  if (currentFilter === "active") {
    filtered = tasks.filter((t) => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = tasks.filter((t) => t.completed);
  }

  if (filtered.length === 0) {
    list.append(
      `<li class="task-item empty"><span class="task-text">No tasks to show.</span></li>`
    );
  } else {
    filtered.forEach((task) => {
      const completedClass = task.completed ? "completed" : "";
      const checkIcon = task.completed ? "✓" : "";

      const itemHtml = `
        <li class="task-item ${completedClass}" data-id="${task.id}">
          <div class="task-left">
            <button class="task-toggle" aria-label="Toggle complete">
              ${checkIcon}
            </button>
            <span class="task-text">${escapeHtml(task.text)}</span>
          </div>
          <div class="task-actions">
            <button class="icon-btn delete-task-btn" aria-label="Delete task">
              ✕
            </button>
          </div>
        </li>
      `;

      list.append(itemHtml);
    });
  }

  updateStats();
}

function updateStats() {
  const remaining = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  $("#remaining-count").text(remaining);
  $("#completed-count").text(completed);
}

/* -------------------------------
   Storage
--------------------------------*/

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load tasks from localStorage", e);
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks to localStorage", e);
  }
}

/* -------------------------------
   Utility
--------------------------------*/

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
