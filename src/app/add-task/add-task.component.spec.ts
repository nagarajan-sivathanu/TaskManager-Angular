import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './../app.component';
import { AddTaskComponent } from './../add-task/add-task.component';
import { ViewTaskComponent } from './../view-task/view-task.component';
import { UpdateTaskComponent } from './../update-task/update-task.component';

describe('AddTaskComponent', () => {
  const appRoutes:Routes=[
    {path:'add', component: AddTaskComponent},
    {path:'view', component:ViewTaskComponent},
    {path:'update', component:UpdateTaskComponent}
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddTaskComponent,
        ViewTaskComponent,
        UpdateTaskComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes) ,
        HttpModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ] 
    }).compileComponents();
  }));

 

  it('should create', () => {
    const fixture = TestBed.createComponent(AddTaskComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
