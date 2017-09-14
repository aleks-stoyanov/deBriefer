import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import {ErrandService} from '../errands/errand.service';
import {Errand} from '../errands/errand.model';

import 'rxjs/Rx';


@Injectable()

export class TaskListService {
    constructor(private http: Http, private errandService: ErrandService) {}

    date = new Date();
    month = this.date.getMonth() + 1;
    day = this.date.getDate();
    company = "thetaxbackgroup";
    // key = "twp_q96YiLmqi2Hg9C2B8DcmDbtWXi67";
    key = "love349marker";

    tasklist_id = "1513908";
    task_name = "This is an example task created with AJAX using JSON.";
    due_date = this.date.getFullYear() + (this.month < 10 ? '0' : '') + this.month + (this.day < 10 ? '0' : '') + this.day;    
    json = {"todo-item": { "content": this.task_name, "due-date": this.due_date }};
    
    postTasks(){
        const url:string = "https://" + this.company + ".teamwork.com/todo_lists/"+ this.tasklist_id + "/todo_items.json";
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
        return this.http.post(url, this.json, {headers});
    }
    
    getTasks(){
        const url:string = "https://" + this.company + ".teamwork.com/todo_lists/"+ this.tasklist_id + "/todo_items.json";
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
        return this.http.get(url, {headers})
        .map(
            (response: Response) => {
                const tasks = response.json();
                
                // for(const task of tasks){
                //     task.content = 'jsdhfjsgfj' + task.content;
                // }
                return tasks;
                

            }
        );
    }

    // getTasks(){
    //     const url:string = "https://" + this.company + ".teamwork.com/todo_lists/"+ this.tasklist_id + "/todo_items.json";
    //     const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
    //     return this.http.get(url, {headers})
    //     .subscribe(
    //         (response: Response) => {
    //             const tasks = response.json();
    //             console.log(tasks);
    //             for(const task of tasks){
    //                 task.content = '''+ task.content;
    //             }
                

    //             // const test: Errand[] = [
    //             //     new Errand(12, "[1129] Canon Austria Mobile Money Cashback", "Martin Nenchev", "Janice Janice", "26/10/2016", 
    //             //     [ {progress: '25', phase: 'Coordination', phaseID: 'cd', taskName: 'Name of Coordination Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //             //       {progress: '85', phase: 'Design', phaseID: 'ds', taskName: 'Name of Design Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //             //       {progress: '68', phase: 'Front End', phaseID: 'fe', taskName: 'Name of Slice Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'}
    //             //     ]),
    //             //     new Errand(12, "[xxxx] Canon Austria Mobile Money Cashback", "Martin Nenchev", "Janice Carlin", "26/10/2016", 
    //             //     [ {progress: '25', phase: 'Coordination', phaseID: 'cd', taskName: 'Name of Coordination Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //             //       {progress: '85', phase: 'Design', phaseID: 'ds', taskName: 'Name of Design Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //             //       {progress: '68', phase: 'Front End', phaseID: 'fe', taskName: 'Name of Slice Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'}
    //             //     ])
    //             // ];
    //             // 
    //             // this.errandService.setErrands(test);
    //         }
    //     );
    // }

    
}