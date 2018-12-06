import { Component, OnInit } from '@angular/core';
import { DatePipe,formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http,Response } from '@angular/http';
import * as _ from 'lodash';
import {Task} from './../task';
import {TaskService} from './../task.service';
import {LoggerService} from './../shared/logger.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [LoggerService]
})
export class ViewTaskComponent implements OnInit {
  taskDeleted:boolean=false;
  tasks:Task[];
  filteredTasks:Task[];
  pipe:DatePipe;
  parentTaskName:String="";
   
  constructor(private taskService:TaskService,private router:Router, 
              private logger:LoggerService ) {  }

  ngOnInit() {
    this.logger.logToConsole('Inside view task - ngOnInit()');
    console.log('Inside view task - ngOnInit()');
    this.getTasks();
    this.pipe = new DatePipe('en');
  }

  getTasks(): void {
    this.logger.logToConsole('Inside view task - getTasks()');    
    this.taskService.getTasks()
      .subscribe(
        (response:Response) => {
          this.tasks = response.json();
          this.filteredTasks = _.clone(this.tasks);
          this.logger.logToConsole(this.tasks);
        },
        (error) => this.logger.logToConsole(error)        
      );
  } 

  onEdit(task:Task):void{
    this.logger.logToConsole('Inside view task - onEdit()');
    this.logger.logToConsole(task);
    task.startDate=formatDate(task.startDate,'yyyy-MM-dd','en');
    task.endDate=formatDate(task.endDate,'yyyy-MM-dd','en');
    this.taskService.editTaskDetails.next(task);
    this.router.navigate(['/update']);
  }

  onEnd(task:Task):void{
    this.logger.logToConsole('Inside view task - onEnd()');
    task.status='I';
    task.startDate=formatDate(task.startDate,'yyyy-MM-dd','en');
    task.endDate=formatDate(task.endDate,'yyyy-MM-dd','en');
    this.taskService.updateTask(task)
    .subscribe(
      (response:Response) => {
        this.logger.logToConsole(response);
        alert("Task Ended Successfully...!!");
        this.router.navigate(['/view']);
      },
      (error) => {
        this.logger.logToConsole(error);
        alert("Task Could Not Be Updated Now. Please Try Again Later...!!");
        this.router.navigate(['/view']);
      }
    );
  }

  onSearch(form:NgForm){
    this.logger.logToConsole('Inside view task - onSearch()');
    let hasCriteriaMet=true;
    this.logger.logToConsole(form.value.taskName);
    this.logger.logToConsole(form.value.parentTaskName);
    this.logger.logToConsole(form.value.priorityFrom);
    this.logger.logToConsole(form.value.priorityTo);
    this.logger.logToConsole(form.value.startDate);
    this.logger.logToConsole(form.value.endDate);
     
    if( form.value.taskName == "" && form.value.parentTaskName == "" &&
        form.value.priorityFrom == "" && form.value.priorityTo == "" &&
        form.value.startDate == "" && form.value.endDate == "" 
      ){
        alert("No Search Criteria Entered! All available tasks are listed below..")
        this.logger.logToConsole("All search parameters are empty");
        this.logger.logToConsole(this.tasks);
        this.filteredTasks= _.clone(this.tasks);
    }else{
      this.filteredTasks.splice(0,this.filteredTasks.length);
      this.filteredTasks=_.filter(this.tasks, function(o){
        hasCriteriaMet = true;
        if(form.value.taskName !== ""){
          if(o.task!==form.value.taskName){
              hasCriteriaMet=false;
          }
        }
           
          if(form.value.parentTaskName !== "" && hasCriteriaMet !== false){
            if(o.parentTask!==form.value.parentTaskName){
              hasCriteriaMet=false;
            }
          }
         
          if(form.value.priorityFrom != "" && hasCriteriaMet !== false){
            if(o.priority<form.value.priorityFrom){
              hasCriteriaMet=false;
            }
          }
          if(form.value.priorityTo != "" && hasCriteriaMet !== false){
            if(o.priority>form.value.priorityTo){
              hasCriteriaMet=false;
            }
          }
          if(form.value.startDate != "" && hasCriteriaMet !== false){
            if(formatDate(o.startDate,'yyyy-MM-dd','en')!==formatDate(form.value.startDate,'yyyy-MM-dd','en')){
              hasCriteriaMet=false;
            }
          }
          if(form.value.endDate != "" && hasCriteriaMet !== false){
            if(formatDate(o.endDate,'yyyy-MM-dd','en')!==formatDate(form.value.endDate,'yyyy-MM-dd','en')){
              hasCriteriaMet=false;
            }
          }
          
          if (hasCriteriaMet===true){
            return o;
          }
    });
  }
  }
  isActive(currentTask:Task){
    if(currentTask.status==='A'){
      return false;
    }else{
      return true;
    }    
  }
}
