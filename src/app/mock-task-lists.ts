import {Task} from './task';

export const Tasks: Task[] = [
    {"task":"Bill Details","taskID":"1","parentTask":"","startDate":"2018-01-31","endDate":"2018-02-27","priority":10,"status":"I"},
    {"task":"EB Bill Details","taskID":"2","parentTask":"Bill Details","startDate":"2018-02-02","endDate":"2018-02-02","priority":15,"status":"I"},
    {"task":"BSNL Bill Details","taskID":"3","parentTask":"Bill Details","startDate":"2018-02-04","endDate":"2018-02-04","priority":20,"status":"I"},
    {"task":"Credit Card Bill Details","taskID":"4","parentTask":"Bill Details","startDate":"2018-02-10","endDate":"2018-02-10","priority":30,"status":"I"},
    {"taskID":"5","task":"Loan","parentTask":"","startDate":"2018-11-11","endDate":"2018-11-11","priority":25,"status":"A"},
    {"taskID":"6","task":"EMI - Car Loan","parentTask":"Loan","startDate":"2018-11-11","endDate":"2018-11-11","priority":20,"status":"A"},
    {"taskID":"7","task":"EMI - Home Loan","parentTask":"Loan","startDate":"2018-11-11","endDate":"2018-11-11","priority":30,"status":"A"},
    {"taskID":"8","task":"Personal Loan","parentTask":"Loan","startDate":"2018-11-11","endDate":"2018-11-11","priority":28,"status":"A"},
    {"taskID":"9","task":"Bike Loan","parentTask":"Loan","startDate":"2018-11-11","endDate":"2018-11-11","priority":5,"status":"A"},
    {"taskID":"10","task":"Misc Loan","parentTask":"Loan","startDate":"2018-11-11","endDate":"2018-11-11","priority":22,"status":"A"},
    {"taskID":"11","task":"Testing Loan","parentTask":"Loan","startDate":"2018-11-11","endDate":"2018-11-11","priority":27,"status":"A"},    
]