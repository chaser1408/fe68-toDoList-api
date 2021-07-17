var getEle = function (id) {
    return document.getElementById(id);
};

taskService = new TaskService();

function getTask() {
    taskService.getListTaskApi()
        .then(function (res) {
            renderTask(res.data);
            setLocalStorage(res.data);
        }).catch(function (err) {
            console.log('getListTask ', err);
        });
};

getEle('addItem').addEventListener('click', function () {
    var taskName = getEle('newTask').value;
    // console.log(taskService);
    var checkFromApi = getLocalStorage();
    // Bởi vì ngay từ đầu mình đã getTask từ API, đã set dưới local rồi, nên có thể lấy lên lại và check
    // console.log(checkFromApi);
    var checkTaskName = checkFromApi.find(task => String(task.nameTask) === String(taskName));
    // console.log(checkTaskName, 'TRÙNG TAG RỒI');

    if (!taskName) {
        alert('Please input your Task!!');
    }
    else if (checkTaskName) {
        alert("Plese don't repeat your Task again!!");
    }
    else {
        var newTask = new Task(taskName);

        taskService.addTaskApi(newTask)
            .then(function (res) {
                getTask();
                alert('Add task success!!');
            }).catch(function (err) {
                console.log('addTask ', err);
            });

        getEle('newTask').value = '';
    }
});

function deleteTask(id) {
    taskService.deleteTaskApi(id)
        .then(function (res) {
            getTask();
            alert('Delete task success!!');
        }).catch(function (err) {
            console.log('deleteTask ', err);
        });
};

function callTask(id) {
    console.log('hello');
    taskService.getTaskIdApi(id)
        .then(function (res) {
            let taskChange = res.data;
            console.log(res.data);
            taskChange.status = !taskChange.status;
            console.log(taskChange);

            updateTask(id, taskChange);
        }).catch(function (err) {
            console.log('getId ', err);
        });
}

function updateTask(id, task) {
    taskService.updateTaskApi(id, task)
        .then(function (res) {
            getTask();
        }).catch(function (err) {
            console.log('updateTask ', err);
        });
};

function renderTask(taskList) {
    getLocalStorage(taskList);
    let taskListTodo = taskList.filter(task => task.status === false);
    let taskListDone = taskList.filter(task => task.status === true);

    renderTaskTodo(taskListTodo);
    renderTaskDone(taskListDone);
};

function renderTaskTodo(taskList) {
    let content = generateTaskList(taskList);
    getEle('todo').innerHTML = content;
};

function renderTaskDone(taskList) {
    let content = generateTaskList(taskList);
    getEle('completed').innerHTML = content;
};

function generateTaskList(taskList) {
    var content = '';

    taskList.forEach(function (task, index) {
        content += `
            <li>
                <span>${task.nameTask}</span>

                <div class="buttons">
                    <button id="idToDo" class="remove" onclick="deleteTask('${task.id}')">
                        <i class="fas fa-trash-alt "></i>
                    </button>

                    <button id="statusToDo" class="complete" onclick="callTask('${task.id}')">
                        <i class="far fa-check-circle"></i>
                    </button>
                </div>
            </li>
        `;
    });

    return content;
};

function setLocalStorage(taskList) {
    localStorage.setItem('Task Storage', JSON.stringify(taskList));
};

function getLocalStorage() {
    if (localStorage.getItem('Task Storage')) {
        return JSON.parse(localStorage.getItem('Task Storage'));
    }
};

getTask();
