import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class LoggerService{
    logToConsole(logMessage:any){
        console.log(logMessage);
    }
}