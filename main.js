 // 유저가 값을 입력한다.
 // + 버튼을 클릭하면, 할일이 추가된다.
 // delete 버튼을 누르면 할일이 삭제된다.
 // check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
 // 1. check 버튼을 클릭하는 순간 true false
 // 2. true이면 끝난걸로 간주하고 밑줄 보여주기
 // 3. false이면 안끝난걸로 간주하고 그대로
 // 진행중 끝남 탭을 누르면, 언더바가 이동한다.
 // 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 보여지게 한다.
 // 전체탭을 누르면 다시 전체아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");  
let underLine = document.getElementById("under-line");
let underLineMenus = document.querySelectorAll(".task-tabs div:not(#under-line)");  
let mode ='all';
let filterList = [];


// 탭 클릭 이벤트 리스너 추가
for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}

// 엔터 키 입력 시 할일 추가
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

// + 버튼 클릭 시 할일 추가
addButton.addEventListener("click",addTask);

// 할일 추가 함수
function addTask() {
    let taskContent = taskInput.value.trim();
    if (taskContent === "") {
        alert("할일을 입력하세요."); 
        return;
    }

    let task = {
        id: randomIDGenerate (),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
    taskInput.value = ""; 
}

// 할일 목록 렌더링 함수
function render() {
    // 1. 내가 선택한 탭에 따라서 
    let list = [];
    if(mode ==="all") {
        // all => taskList 
        list = taskList;
    }else if(mode === "ongoing"  || mode === "done"){
        //ongoing,done => filterList
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다.

    let resultHTML = "";
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `
            <div class="task task-done">
                <div class="taskList">${list[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${list[i].id}')"><i class="material-icons check">restart_alt</i></button>
                    <button onclick = "deleteTask('${list[i].id}')"><i class="material-icons delete">delete_forever</i></button>
                </div>
            </div> `;
        }else {
             resultHTML += `
            <div class="task">
                <div class="taskList">${list[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${list[i].id}')"><i class="material-icons check">check_circle</i></button>
                    <button onclick = "deleteTask('${list[i].id}')"><i class="material-icons delete">delete_forever</i></button>
                </div>
            </div> `;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

// 할일 완료 상태 토글 함수
function toggleComplete(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
			/* 클릭한 아이템의 id가 같아질 때 isComplete값 변경(true or false) */
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filterTasks();
    render();
    console.log(taskList);
};

// 할일 삭제 함수
function deleteTask(id) {  
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filterTasks();
    console.log(taskList);
    render();
}

// 필터링 함수
function filter(event) {
    console.log("filter", event.target.id);
    mode = event.target.id;
    filterTasks();
    render();
}

// 필터링 작업을 수행하는 함수
function filterTasks() {
    filterList = [];
    if (mode == "all") {
        //전체 리스트를 보여준다.
        filterList = taskList; // 전체 할 일 목록을 필터링 목록에 저장
    } else if (mode == "ongoing") {
        //진행중인 아이템을 보여준다. 
        //task.isComplete = false 
        filterList = taskList.filter(task => !task.isComplete);  // 완료되지 않은 할 일만 필터링하여 저장
    } else if (mode == "done") {
        //끝나는 케이스
        //task.isComplete = true 
        filterList = taskList.filter(task => task.isComplete); // 완료된 할 일만 필터링하여 저장
    }
}

// 랜덤 ID 생성 함수
function randomIDGenerate () {
    return '_' + Math.random().toString(36).substr(2,9);
};

