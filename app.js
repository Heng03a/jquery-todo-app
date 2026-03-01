// Key for localStorage
const STORAGE_KEY = "jquery_todo_tasks";

let tasks = [];
let currentFilter = "all"; // 'all' | 'active' | 'completed'

let currentSort = "newest";
 
$(document).ready(function () {
  loadTasks();
  renderTasks();

  // ---------- Custom Sort Dropdown ----------
 
  function getSortLabel(value) {
    switch (value) {
      case "newest": return "Newest";
      case "oldest": return "Oldest";
      case "completed": return "Completed First";
      case "active": return "Active First";
      default: return "Newest";
    }
  }

  function setSort(value) {
    console.log("Sort changed to:", value);
    currentSort = value;

    // Sync hidden native select (keeps compatibility)
    $("#sort-select").val(value);

    // Update button label
    $("#sort-dd-btn .sort-dd__label").text(getSortLabel(value));

    // Update ARIA selected state
    $("#sort-dd-list .sort-dd__opt").each(function () {
      const isSelected = $(this).data("value") === value;
      $(this).attr("aria-selected", isSelected ? "true" : "false");
      $(this).toggleClass("is-active", false);
    });

    renderTasks();
  }

function openSortDD() {
    $("#sort-dd").addClass("is-open");
    $("#sort-dd-btn").attr("aria-expanded", "true");

    const $opts = $("#sort-dd-list .sort-dd__opt");
    $opts.removeClass("is-active");

    const $selected = $opts.filter("[aria-selected='true']");
    $selected.addClass("is-active");

    $("#sort-dd-list").focus();
  }
  //
  function closeSortDD() {
    $("#sort-dd").removeClass("is-open");
    $("#sort-dd-btn").attr("aria-expanded", "false");
    $("#sort-dd-list .sort-dd__opt").removeClass("is-active");
  }

  function isSortDDOpen() {
    return $("#sort-dd").hasClass("is-open");
  }
  //
  function moveActive(delta) {
    const $opts = $("#sort-dd-list .sort-dd__opt");
    let idx = $opts.index($opts.filter(".is-active"));

    if (idx === -1) {
      idx = $opts.index($opts.filter("[aria-selected='true']"));
    }

    let next = idx + delta;

    if (next < 0) next = $opts.length - 1;
    if (next >= $opts.length) next = 0;

    $opts.removeClass("is-active");
    $opts.eq(next).addClass("is-active");
  }
  //
function chooseActive() {
    const $opts = $("#sort-dd-list .sort-dd__opt");
    const $active = $opts.filter(".is-active");

    if ($active.length) {
      const value = $active.data("value");
      setSort(value);
    }

    closeSortDD();
    $("#sort-dd-btn").focus();
  }  
  // Init from existing select value (if any)
  const initialSort = $("#sort-select").val() || "newest";
  setSort(initialSort);

  // Button click toggles dropdown
  $("#sort-dd-btn").on("click", function () {
    if (isSortDDOpen()) closeSortDD();
    else openSortDD();
  });

  // Click option
  $("#sort-dd-list").on("click", ".sort-dd__opt", function () {
    setSort($(this).data("value"));
    closeSortDD();
    $("#sort-dd-btn").focus();
  });

  // Keyboard handling
  $("#sort-dd-btn").on("keydown", function (e) {
    // Open with ArrowDown/Enter/Space
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isSortDDOpen()) openSortDD();
    }
  });

  $("#sort-dd-list").on("keydown", function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeSortDD();
      $("#sort-dd-btn").focus();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveActive(1);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveActive(-1);
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      chooseActive();
      return;
    }

    // Optional: Home/End for speed
    if (e.key === "Home") {
      e.preventDefault();
      const $opts = $("#sort-dd-list .sort-dd__opt");
      $opts.removeClass("is-active");
      $opts.first().addClass("is-active");
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      const $opts = $("#sort-dd-list .sort-dd__opt");
      $opts.removeClass("is-active");
      $opts.last().addClass("is-active");
      return;
    }
  });

  // Click outside closes dropdown
  $(document).on("click", function (e) {
    const $dd = $("#sort-dd");
    if (!$dd.length) return;
    if (isSortDDOpen() && !$dd.is(e.target) && $dd.has(e.target).length === 0) {
      closeSortDD();
    }
  });

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


  // Delegated events for dynamically created items
  $("#task-list")
    // toggle complete
    .on("click", ".task-toggle", function () {
      const id = $(this).closest(".task-item").data("id");
      toggleTaskCompleted(id);
    })

    // Clear completed
    $("#clear-completed-btn").on("click", function () {

            if (confirmClearCompleted()) {
        tasks = tasks.filter((t) => !t.completed);
        saveTasks();
        renderTasks();
      }

    });

    // Native sort change Listener
    // Remove (commented) - Custom Dropdown now controls sorting
    //$("#sort-select").on("change", function () {
    //renderTasks();
    //});


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
    createdAt: Date.now()
}


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


function sortTasks(tasksArray, type) {

  const sorted = [...tasksArray]; // shallow copy (no mutation)

  console.log("Sort changed to:", type);

  switch (type) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt - a.createdAt);

    case "oldest":
      return sorted.sort((a, b) => a.createdAt - b.createdAt);

    case "completed":
      return sorted.sort((a, b) => Number(b.completed) - Number(a.completed));

    case "active":
      return sorted.sort((a, b) => Number(a.completed) - Number(b.completed));

    default:
      return sorted;
  }
}

/* -------------------------------
   Rendering
--------------------------------*/
// refactor: render pipeline (filter → sort → render)
function renderTasks() {
  const list = $("#task-list");
  list.empty();

  console.log("Render using sort:", currentSort);

  // 1️⃣ Filter first
  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter((t) => !t.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  }

  // 2️⃣ Then sort filtered results
  const sortType = currentSort || "newest";
  const sortedTasks = sortTasks(filteredTasks, sortType);

  // 3️⃣ Render sorted + filtered
  if (sortedTasks.length === 0) {
    list.append(`
      <li class="task-item empty">
        <span class="task-text">No tasks to show.</span>
      </li>
    `);
  } else {
    sortedTasks.forEach((task) => {
      const completedClass = task.completed ? "completed" : "";
      const checkIcon = task.completed ? "✓" : "";

    const statusDot = task.completed
      ? '<span class="status-dot completed-dot"></span>'
      : '<span class="status-dot active-dot"></span>';

    const itemHtml = `
      <li class="task-item ${completedClass}" data-id="${task.id}">
        <div class="task-left">
          ${statusDot}
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
