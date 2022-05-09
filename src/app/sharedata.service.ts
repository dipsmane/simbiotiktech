import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  constructor() { }

  public getAllTask() {
    var todoTask = JSON.parse(localStorage.getItem('task') || '[]');//fetch all task from local storage if task is null then set empty array
    return todoTask;
  }

  public addTask(data: any) {
    var todoTask = this.getAllTask();// fetch all task from local storage
    todoTask.unshift(data); // add data at beggining

    this.saveInLocalStorage(todoTask);
  }

  public markTaskAsDone(data: any) {
    var tasks = this.getAllTask();// fetch all task from local storage
    var index = tasks.findIndex((v: { task: any; }) => v.task === data.task);// find index of task by task name
    tasks[index].status = true; //update status of specified task by index

    // sort task by status move all done task at end.
    tasks.sort(function(a: { status: number; },b: { status: number; }){
      return(a.status-b.status);
    });

    this.saveInLocalStorage(tasks);
  }

  public removeTask(data: any) {

    var tasks = this.getAllTask(); // fetch all task from local storage
    var index = tasks.findIndex((v: { task: any; }) => v.task === data.task);// find index of task by task name
    tasks.splice(index, 1);//remove task from array using splice

    this.saveInLocalStorage(tasks);
  }

  private saveInLocalStorage(todoTask:any){
    localStorage.setItem('task', JSON.stringify(todoTask));
  }
}