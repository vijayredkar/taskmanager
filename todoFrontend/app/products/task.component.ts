import { Component, OnInit } from '@angular/core';
import { clone } from 'lodash';
import { TaskService } from './task.service';
import { Task } from './task';
import { Status } from './status';
import { STATUS_ITEMS } from './status-data';

@Component({
    moduleId: module.id,
    templateUrl: 'task.template.html'
})

export class TaskComponent implements OnInit {
  tasks: Task[];
  taskForm: boolean = false;
  editTaskForm: boolean = false;
  isNewForm: boolean;
  newTask: any = {};
  editedTask: any = {};
  private statusItems = STATUS_ITEMS;
  public selectedStatus: Status = this.statusItems[0];


  constructor(private _taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasks = this._taskService.getTasks();
  }

  showEditTaskForm(task: Task) {
    if(!task) {
      this.taskForm = false;
      return;
    }
    this.editTaskForm = true;
    this.editedTask = clone(task);
  }

  showAddTaskForm() {
    // resets form if edited task
    if(this.tasks.length) {
      this.newTask = {};
    }
    this.taskForm = true;
    this.isNewForm = true;
  }

  saveTask(task: Task) {
    if(this.isNewForm) {

      if(task.name === undefined)
      {
       alert("Task name cannot be empty");
       return;        
      }
      if(task.desc === undefined)
      {
       alert("Task description cannot be empty");
       return;        
      }

      // add a new task
      task.status = this.selectedStatus.name;

      this._taskService.addTask(task);
    }
    this.taskForm = false;
  }

  //removeProduct(task: Task) {
    removeTask(task: Task) {
    this._taskService.deleteTask(task);
  }

  updateTask() {

    if(this.editedTask.name === undefined ||
      this.editedTask.name === null       ||
       this.editedTask.name.length ==0)
    {
     alert("Task name cannot be empty");
     return;        
    }
    if(this.editedTask.desc === undefined ||
      this.editedTask.desc === null       ||
       this.editedTask.desc.length ==0)
    {
     alert("Task description cannot be empty");
     return;        
    }

    this.editedTask.status = this.selectedStatus.name;
    
    this._taskService.updateProduct(this.editedTask);
    this.editTaskForm = false;
    this.editedTask = {};
  }

  cancelNewTask() {
    this.newTask = {};
    this.taskForm = false;
  }

  cancelEdits() {
    this.editedTask = {};
    this.editTaskForm = false;
  }

  onSelect(statusId:number) { 
      this.selectedStatus = null;
      for (var i = 0; i < this.statusItems.length; i++)
      {
        if (this.statusItems[i].id == statusId) {
          this.selectedStatus = this.statusItems[i];
        }
      }
  }

}
