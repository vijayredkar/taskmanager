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
var lodash_1 = require("lodash");
var task_service_1 = require("./task.service");
var status_data_1 = require("./status-data");
var TaskComponent = (function () {
    function TaskComponent(_taskService) {
        this._taskService = _taskService;
        this.taskForm = false;
        this.editTaskForm = false;
        this.newTask = {};
        this.editedTask = {};
        this.statusItems = status_data_1.STATUS_ITEMS;
        this.selectedStatus = this.statusItems[0];
    }
    TaskComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    TaskComponent.prototype.getTasks = function () {
        this.tasks = this._taskService.getTasks();
    };
    TaskComponent.prototype.showEditTaskForm = function (task) {
        if (!task) {
            this.taskForm = false;
            return;
        }
        this.editTaskForm = true;
        this.editedTask = lodash_1.clone(task);
    };
    TaskComponent.prototype.showAddTaskForm = function () {
        // resets form if edited task
        if (this.tasks.length) {
            this.newTask = {};
        }
        this.taskForm = true;
        this.isNewForm = true;
    };
    TaskComponent.prototype.saveTask = function (task) {
        if (this.isNewForm) {
            if (task.name === undefined) {
                alert("Task name cannot be empty");
                return;
            }
            if (task.desc === undefined) {
                alert("Task description cannot be empty");
                return;
            }
            // add a new task
            task.status = this.selectedStatus.name;
            this._taskService.addTask(task);
        }
        this.taskForm = false;
    };
    //removeProduct(task: Task) {
    TaskComponent.prototype.removeTask = function (task) {
        this._taskService.deleteTask(task);
    };
    TaskComponent.prototype.updateTask = function () {
        if (this.editedTask.name === undefined ||
            this.editedTask.name === null ||
            this.editedTask.name.length == 0) {
            alert("Task name cannot be empty");
            return;
        }
        if (this.editedTask.desc === undefined ||
            this.editedTask.desc === null ||
            this.editedTask.desc.length == 0) {
            alert("Task description cannot be empty");
            return;
        }
        this.editedTask.status = this.selectedStatus.name;
        this._taskService.updateProduct(this.editedTask);
        this.editTaskForm = false;
        this.editedTask = {};
    };
    TaskComponent.prototype.cancelNewTask = function () {
        this.newTask = {};
        this.taskForm = false;
    };
    TaskComponent.prototype.cancelEdits = function () {
        this.editedTask = {};
        this.editTaskForm = false;
    };
    TaskComponent.prototype.onSelect = function (statusId) {
        this.selectedStatus = null;
        for (var i = 0; i < this.statusItems.length; i++) {
            if (this.statusItems[i].id == statusId) {
                this.selectedStatus = this.statusItems[i];
            }
        }
    };
    return TaskComponent;
}());
TaskComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'task.template.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskComponent);
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map