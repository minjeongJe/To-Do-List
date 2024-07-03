 // 유저가 값을 입력한다.
 // + 버튼을 클릭하면, 할일이 추가된다.
 // delete 버튼을 누르면 할일이 삭제된다.
 // check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
 // 1. check 버튼을 클릭하는 순간 true false
 // 2. ture이면 끝난걸로 간주하고 밑줄 보여주기
 // 3. false이면 안끝난걸로 간주하고 그대로

 // 진행중 끝남 탭을 누르면, 언더바가 이동한다.
 // 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 보여지게 한다.
 // 전체탭을 누르면 다시 전체아이템으로 돌아온다.

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
    let task = {
        id: randomIDGenerate (),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = "";
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML += `
            <div class="task task-done">
                <div class="taskList">${taskList[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${taskList[i].id}')"><i class="material-icons check">restart_alt</i></button>
                    <button onclick = "deleteTask('${taskList[i].id}')"><i class="material-icons delete">delete_forever</i></button>
                </div>
            </div> `;
        }else {
             resultHTML += `
            <div class="task">
                <div class="taskList">${taskList[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${taskList[i].id}')"><i class="material-icons check">check_circle</i></button>
                    <button onclick = "deleteTask('${taskList[i].id}')"><i class="material-icons delete">delete_forever</i></button>
                </div>
            </div> `;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete (id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
};

function deleteTask(id) {  
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    console.log(taskList);
    render();
}

function randomIDGenerate () {
    return '_' + Math.random().toString(36).substr(2,9);
};

