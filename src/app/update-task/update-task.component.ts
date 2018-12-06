import { Component, OnInit,ViewChild, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe,formatDate } from '@angular/common';
import { Http,Response } from '@angular/http';
import { Task } from '../task';
import {TaskService} from './../task.service';
import {LoggerService} from './../shared/logger.service';
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  providers: [LoggerService]
})
export class UpdateTaskComponent implements OnInit {
  subscription:Subscription;
  taskUpdated:boolean=false;
  tasks:Task[];
  task: Task;
  @ViewChild('f') updateTaskForm: NgForm;

  constructor(private taskService:TaskService, private route: ActivatedRoute, 
              private router:Router,private logger:LoggerService) { 
    this.task = {
      taskID:'',
      task:'',
      parentTask:'',
      priority:15,
      startDate:'',
      endDate:'',
      status:'A'
    };
    this.taskService.editTaskDetails.subscribe((newTask:Task ) => this.task = newTask);
  }

  ngOnInit() { 
    this.logger.logToConsole('Inside view task - ngOnInit()');
    this.getTasks();
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

  onUpdate(){
    this.logger.logToConsole('Inside Update Task Component - onUpdate()');
    this.logger.logToConsole(this.task.taskID);
    this.task.task=this.updateTaskForm.value.taskname;
    this.task.parentTask=this.updateTaskForm.value.parentTask;
    this.task.priority=this.updateTaskForm.value.priority;
    this.task.startDate==formatDate(this.updateTaskForm.value.startDate,'yyyy-MM-dd','en');
    this.task.endDate==formatDate(this.updateTaskForm.value.endDate,'yyyy-MM-dd','en');
    this.logger.logToConsole(this.updateTaskForm);
    this.logger.logToConsole(this.task);
    this.taskService.updateTask(this.task)
    .subscribe(
      (response:Response) => {
        this.logger.logToConsole(response);
        alert("Task Updated Successfully...!!");
        this.router.navigate(['/view']);
      },
      (error) => {
        this.logger.logToConsole(error);
        alert("Task Could Not Be Updated Now. Please Try Again Later...!!");
        this.router.navigate(['/view']);
      }
    );
  }

  onCancel(){
    this.logger.logToConsole('Inside Update Task Component - onCancel()');
    this.router.navigate(['/view']);
  }
}
