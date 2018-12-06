import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DatePipe,formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Http,Response } from '@angular/http';
import { Task } from '../task';
import {TaskService} from './../task.service';
import {LoggerService} from './../shared/logger.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [LoggerService]
})
export class AddTaskComponent implements OnInit {
  subscription:Subscription;
  taskCreated:boolean=false;
  parentTask:string;
  tasks:Task[];
  pipe:DatePipe;
  task:Task = {
    taskID:'',
    task:'',
    parentTask:'',
    priority:15,
    startDate:'',
    endDate:'',
    status:'A'
  };
  @ViewChild('f') addTaskForm: NgForm;
  
  constructor(private taskService:TaskService,private logger:LoggerService,
              private router:Router) { }
  ngOnInit() {
    this.logger.logToConsole('Inside Add task - ngOnInit()');
    this.getTasks();
    this.pipe = new DatePipe('en');
  }

  getTasks(): void {
    this.logger.logToConsole('Inside view task - getTasks()');
    this.taskService.getTasks()
    .subscribe(
      (response:Response) => {
        this.tasks = response.json();
        this.logger.logToConsole(this.tasks);
      },
      (error) => this.logger.logToConsole(error)
      
    );
  } 

  onSubmit(){
    this.logger.logToConsole('Inside Add Task Component - onSubmit()');
    this.logger.logToConsole(this.addTaskForm);
    this.task.task=this.addTaskForm.value.taskname;
    this.task.parentTask=this.addTaskForm.value.parentTask;
    this.task.priority=this.addTaskForm.value.priority;
    this.task.startDate=this.pipe.transform(this.addTaskForm.value.startDate,'yyyy-MM-dd');
    this.task.endDate=this.pipe.transform(this.addTaskForm.value.endDate,'yyyy-MM-dd');
    this.logger.logToConsole(this.addTaskForm);
    this.logger.logToConsole(this.task);
    this.taskService.addTask(this.task)
        .subscribe(
          (response:Response) => {
            this.logger.logToConsole(response);
            alert("Task Added Successfully...!!");
            this.router.navigate(['/view']);
          },
          (error) => {
            this.logger.logToConsole(error);
            alert("Task Could Not Be Added Now. Please Try Again Later...!!");
            this.router.navigate(['/view']);
          }
        );
  }
  clearForm(){
    this.taskCreated=false;
    this.addTaskForm.resetForm();
  }
  onSelect(){
    this.logger.logToConsole(this.parentTask);
  }
}
