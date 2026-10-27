const input = document.getElementById('input');
const btn1 = document.getElementById('btn1');
const list = document.getElementById('list');
const clearBtn = document.getElementById('btn2');
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
let taskToDelete = null;

function addTask() {
    const value = input.value.trim();
    if (value === "") return;

    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = value;
    taskText.setAttribute("contenteditable", "true");
    taskText.setAttribute("spellcheck", "false");
    taskText.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            taskText.blur();
        }
    });
    li.appendChild(taskText);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
        taskText.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(taskText);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    });
    li.appendChild(editBtn);

    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";
    dltBtn.classList.add("delete-btn");
    dltBtn.addEventListener("click", function () {
        taskToDelete = li;
        deleteModal.style.display = 'flex';
    });
    li.appendChild(dltBtn);

    list.appendChild(li);
    clearBtn.style.display = 'inline-flex';
    input.value = "";
    input.focus();
}

btn1.addEventListener("click", addTask);

clearBtn.addEventListener('click', () => {
    list.innerHTML = "";
    clearBtn.style.display = 'none';
});

confirmDelete.addEventListener('click', () => {
    if (taskToDelete) {
        taskToDelete.remove();
        taskToDelete = null;
    }
    deleteModal.style.display = 'none';
});

cancelDelete.addEventListener('click', () => {
    taskToDelete = null;
    deleteModal.style.display = 'none';
});

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


