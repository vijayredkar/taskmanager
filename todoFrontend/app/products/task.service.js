"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_data_1 = require("./task-data");
var lodash_1 = require("lodash");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var TaskService = (function () {
    //  private statusItems = STATUS_ITEMS;
    function TaskService(http) {
        this.http = http;
        this.data = [];
        this.taskResponseArr = [];
        this.taskItems = task_data_1.TASK_ITEMS;
    }
    TaskService.prototype.getTasks = function () {
        var _this = this;
        var observable = this.http.get('http://localhost:8080/v1/tasks')
            .map(function (response) { return response.json(); });
        //.catch(this.handleErrorObservable);
        observable.subscribe(function (data) {
            _this.taskResponseArr = data;
            console.log('retrieved existing tasks ' + _this.taskResponseArr.length);
            for (var i = 0; i < _this.taskResponseArr.length; i++) {
                console.log('add tasks to list - print id and name ' + _this.taskResponseArr[i].id + '--' + _this.taskResponseArr[i].name);
                //console.log('add tasks to list for display - print id and name '+this.taskResponseArr[i].name) +' '+this.taskResponseArr[i].name);
                _this.taskItems.push(_this.taskResponseArr[i]);
            }
        }, function (error) { console.log(error); alert('Exception occured. Please try again later '); });
        console.log('existing tasks ' + this.taskItems.length);
        return this.taskItems;
    };
    TaskService.prototype.addTask = function (taskToAdd) {
        var _this = this;
        console.log(' task service taskToAdd status ' + taskToAdd.status);
        //let task:Task  = new Task('testName','testDesc' , 'onhold');
        var observable = this.http.post('http://localhost:8080/v1/tasks', taskToAdd)
            .map(function (response) { return response.json(); });
        observable.subscribe(function (data) {
            _this.taskResponse = data;
            //this.taskResponseArr = data;          
            console.log('added task name ' + _this.taskResponse.name);
            _this.taskItems.push(_this.taskResponse);
            console.log(_this.taskItems);
        }, function (error) { console.log(error); alert('Exception occured. Please try again later '); });
    };
    TaskService.prototype.updateProduct = function (task) {
        var _this = this;
        console.log('task id ' + task.id);
        var URL_Update = 'http://localhost:8080/v1/tasks/' + task.id;
        console.log('URL_Delete ' + URL_Update);
        //var observable = this.http.put('http://localhost:8080/v1/tasks/taskId',task).map((response:Response) => response.json());
        var observable = this.http.put(URL_Update, task).map(function (response) { return response.json(); });
        observable.subscribe(function (data) {
            _this.taskResponse = data;
            console.log('-----updated id, username ' + _this.taskResponse.id + ' ' + _this.taskResponse.name);
            var index = lodash_1.findIndex(_this.taskItems, function (p) {
                return p.id === task.id;
            });
            console.log("index " + index);
            _this.taskItems[index] = _this.taskResponse;
            console.log("Update successful");
        }, function (error) { console.log(error); alert('Exception occured. Please try again later '); });
    };
    TaskService.prototype.deleteTask = function (task) {
        var _this = this;
        console.log('task id ' + task.id);
        var URL_Delete = 'http://localhost:8080/v1/tasks/' + task.id;
        console.log('URL_Delete ' + URL_Delete);
        var observable = this.http.delete(URL_Delete);
        observable.subscribe(function (data) {
            _this.taskItems.splice(_this.taskItems.indexOf(task), 1);
            console.log(_this.taskItems);
            console.log('Deleted successfully');
        }, function (error) { console.log(error); alert('Exception occured. Please try again later '); });
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map