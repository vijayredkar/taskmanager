import { Injectable } from '@angular/core';
import { Task } from './task';
import { TASK_ITEMS } from './task-data';
import { findIndex } from 'lodash';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { STATUS_ITEMS } from './status-data';

@Injectable()
export class TaskService {
  public data:any[]  = [];
  public error:any;
  public data3:any;
  public taskResponseArr:Task[]  = [];
  public taskResponse:Task;
  private taskItems = TASK_ITEMS;
//  private statusItems = STATUS_ITEMS;
  
  constructor(private http:Http) { }

  getTasks(): Task[] {    
    
    var observable = this.http.get('http://localhost:8080/v1/tasks')
                         .map((response:Response) => response.json());
                          //.catch(this.handleErrorObservable);

      observable.subscribe
      (
        (data) => {	                 
                    this.taskResponseArr = data;
                    console.log('retrieved existing tasks '+this.taskResponseArr.length);

                    for(let i=0; i<this.taskResponseArr.length;i++)          
                    {
                      console.log('add tasks to list - print id and name '+this.taskResponseArr[i].id + '--' + this.taskResponseArr[i].name);
                      //console.log('add tasks to list for display - print id and name '+this.taskResponseArr[i].name) +' '+this.taskResponseArr[i].name);
                      this.taskItems.push(this.taskResponseArr[i]);  
                    }
                  },
        (error) => {console.log(error); alert('Exception occured. Please try again later ')}
      );
    
      console.log('existing tasks '+this.taskItems.length);
      return this.taskItems
    }

  addTask(taskToAdd: Task) {
     console.log(' task service taskToAdd status '+taskToAdd.status);   
    //let task:Task  = new Task('testName','testDesc' , 'onhold');
    var observable = this.http.post('http://localhost:8080/v1/tasks',taskToAdd)
                              .map((response:Response) => response.json());

      observable.subscribe
      (
        (data) => {	                 
              this.taskResponse = data;
              //this.taskResponseArr = data;          
              
              console.log('added task name '+this.taskResponse.name);

              this.taskItems.push(this.taskResponse);
              console.log(this.taskItems);               
              },
        (error) => {console.log(error); alert('Exception occured. Please try again later ')}
      );
  }

  updateProduct(task: Task) {
   
    console.log('task id '+task.id);
    let URL_Update:string = 'http://localhost:8080/v1/tasks/'+task.id;
    console.log('URL_Delete '+URL_Update);

    //var observable = this.http.put('http://localhost:8080/v1/tasks/taskId',task).map((response:Response) => response.json());
    var observable = this.http.put(URL_Update, task).map((response:Response) => response.json());

    observable.subscribe
    (
      (data) => {	                 
            this.taskResponse = data;          
            console.log('-----updated id, username '+this.taskResponse.id + ' ' + this.taskResponse.name);

            let index = findIndex(this.taskItems, (p: Task) => {
              return p.id === task.id;
            });

            console.log("index "+index);
            this.taskItems[index] = this.taskResponse;

            console.log("Update successful");
            },
      (error) => {console.log(error); alert('Exception occured. Please try again later ')}
    );
  }

  deleteTask(task: Task) 
  {
    console.log('task id '+task.id);
    let URL_Delete:string = 'http://localhost:8080/v1/tasks/'+task.id;
    console.log('URL_Delete '+URL_Delete);

    var observable = this.http.delete(URL_Delete);

    observable.subscribe
    (
      (data) => 
            {
            this.taskItems.splice(this.taskItems.indexOf(task), 1);
            console.log(this.taskItems);    
            console.log('Deleted successfully');
            },
      (error) => {console.log(error); alert('Exception occured. Please try again later ')}
    );
  }
}