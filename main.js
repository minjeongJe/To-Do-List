let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let underLine = document.getElementById("under-line");
let underLineMenus = document.querySelectorAll(".task-tabs div:not(#under-line)");  

taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

// 밑줄 슬라이딩
underLineMenus.forEach(menu => menu.addEventListener("click", (e) => moveUnderlineTo(e.currentTarget)));

function moveUnderlineTo(target) {
    underLine.style.left = target.offsetLeft + "px";
    underLine.style.width = target.offsetWidth + "px";
}

addButton.addEventListener("click",addTask);
taskInput.addEventListener("click", function() {
    taskInput.value = "";
})

function addTask () {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `
            <div class="task">
                <div>${taskList[i]}</div>
                <div>
                    <button>Check</button>
                    <button>Delete</button>
                </div>
            </div>
        `;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

