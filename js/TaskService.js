function TaskService() {

};

TaskService.prototype.getListTaskApi = function () {
    return axios({
        url: 'https://60e5f554086f730017a6fe88.mockapi.io/task',
        method: 'GET',
    });
};

TaskService.prototype.addTaskApi = function (task) {
    return axios({
        url: 'https://60e5f554086f730017a6fe88.mockapi.io/task',
        method: 'POST',
        data: task,
    });
};

TaskService.prototype.deleteTaskApi = function (id) {
    return axios({
        url: 'https://60e5f554086f730017a6fe88.mockapi.io/task/' + id,
        method: 'DELETE',
        data: id,
    })
};

TaskService.prototype.getTaskIdApi = function (id) {
    return axios({
        url: 'https://60e5f554086f730017a6fe88.mockapi.io/task/' + id,
        method: 'GET',
        data: id,
    });
};

TaskService.prototype.updateTaskApi = function (id, task) {


    return axios({
        url: 'https://60e5f554086f730017a6fe88.mockapi.io/task/' + id,
        method: 'PUT',
        data: task,
    });
};