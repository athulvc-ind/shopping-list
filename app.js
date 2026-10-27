const input = document.getElementById('input');
const btn1 = document.getElementById('btn1');
const list = document.getElementById('list');

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
    dltBtn.addEventListener("click", function () {
        if (confirm("do you want to remove it")) {
            li.remove();
            alert("Task deleted successfully!");
        }
    });
    li.appendChild(dltBtn);

    list.appendChild(li);
    input.value = "";
    input.focus();
}

btn1.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


