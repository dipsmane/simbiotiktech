import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: SharedataService) { }
  myForm: any;
  userData: any;
  task: any = '';

  ngOnInit(): void {
    this.myForm = this.fb.group({
      task: ['', [Validators.required]]
    })
    this.getAllTask();//refresh task list on page load
  }

  /**
   * Used to fetch all tasks.
   */
  getAllTask() {
    this.userData = this.data.getAllTask();
  }

  /**
   * Used to add new task.
   */
  onAddTask() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      return;
    } else {
      let requestObject = {
        task: this.myForm.value.task,
        status: false
      }
      this.data.addTask(requestObject);
      this.getAllTask();//refresh task list
      this.resetForm();//reset form on submit
      alert("Task Added.");
    }
  }

  /**
   * Used to update status of task as done.
   */
  onDone(data: any) {
    this.data.markTaskAsDone(data);
    this.getAllTask();//refresh task list
    alert("Marked as Done.");
  }

  /**
   * Used to remove task.
   */
  onRemove(data: any) {
    this.data.removeTask(data);
    this.getAllTask();//refresh task list
    alert("Removed Successfully.");
  }

  /**
   * Used to reset form on submit.
   */
  resetForm() {
    this.myForm.reset();
  }
  get t() {
    return this.myForm.controls;
  }
}