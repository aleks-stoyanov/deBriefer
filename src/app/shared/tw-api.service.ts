import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import {ErrandService} from '../errands/errand.service';
import {Errand} from '../errands/errand.model';

import 'rxjs/Rx';


@Injectable()

export class TwApiService {
    constructor(private http: Http, private errandService: ErrandService) {}

    date = new Date();
    month = this.date.getMonth() + 1;
    day = this.date.getDate();
    company = "thetaxbackgroup";
    key = "love349marker";
    project_id = "400900";
    tasklist_id = "1513908";
    
    task_name = "This is an example task created with AJAX using JSON.";
    due_date = this.date.getFullYear() + (this.month < 10 ? '0' : '') + this.month + (this.day < 10 ? '0' : '') + this.day;    
    json = {"todo-item": { "content": this.task_name, "due-date": this.due_date }};

    
    getTasks(){
        const url:string = "https://" + this.company + ".teamwork.com/todo_lists/"+ this.tasklist_id + "/todo_items.json";
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
        return this.http.get(url, {headers})
        .map(
            (response: Response) => {
                const tasks = response.json();
                return tasks;
            }
        );
    }

    postErrand(url:string, errandName:string, errandDescription: string, key:string){
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
        const errandJson = {"todo-list": { "name": errandName, "description": errandDescription }};
      
        return this.http.post(url, errandJson, {headers})
        .map((response: Response) => response.json());
    }



    getAPIErrands(){
        const url:string = "https://" + this.company + ".teamwork.com/projects/"+ this.project_id + "/tasklists.json"; //just test projects tasklists
        // const url:string = "https://" + this.company + ".teamwork.com/"+ "/tasklists.json"; //all user tasklists
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
        
        return this.http.get(url, {headers})
        .map((response: Response) => response.json());
    }

    getAPITasks(tasklist_id:string){
        let url:string;

        if(tasklist_id){
            url = "https://" + this.company + ".teamwork.com/tasklists/"+tasklist_id+ "/tasks.json";
        } else {
            url = "https://" + this.company + ".teamwork.com"+ "/tasks.json";
        }
        
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
        
        return this.http.get(url, {headers})
        .map((response: Response) => response.json());
    }

    yyyymmdd(date:Date){
        const mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
      
        return [date.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('');
    }

    postAPITasks(tasklist_id:string, taskName: string, taskDescription: string, taskDueDate: Date){
        const dueDate:string = this.yyyymmdd(taskDueDate);
        console.log(taskDescription);
        const url:string = "https://" + this.company + ".teamwork.com/tasklists/"+ tasklist_id + "/tasks.json";
        const taskJson = {"todo-item": { "content": taskName, "description": taskDescription, "due-date": dueDate  }};
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(this.key + ":xxx")});
        
        
        return this.http.post(url, taskJson, {headers})
        .subscribe(
            (response: Response) => {
                const resp = response.json();
                console.log(resp);
                
            }
        );
    }

    

    
}