import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Errand } from '../errand.model';
import { ErrandService } from '../errand.service';
import {UserStorageService} from '../../shared/user-storage.service';
import {TaskListService} from '../../shared/task-list.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-errand-list',
  templateUrl: './errand-list.component.html',
  styleUrls: ['./errand-list.component.css']
})
export class ErrandListComponent implements OnInit {
  errands: Errand[] = [];
  errandList:string;
  tasklists:any[]=[];

  constructor(private errandService: ErrandService, private userStorageService: UserStorageService, private taskListService: TaskListService) { }

  ngOnInit() {
    this.onGetErrands();
    this.errandService.errandsChanged
      .subscribe(
        (errands:Errand[]) => {
          this.errands = errands;
        }
      );
    this.errands = this.errandService.getErrands();
  }

  onSaveData(){
    this.userStorageService.storeErrands()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData(){
    this.userStorageService.getErrands();
  }

  onPostTasks(){
    this.taskListService.postTasks()
    .subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }


  onGetErrands(){
    this.taskListService.getAPIErrands()
    .subscribe(
      data => this.parseErrands(data), 
      error => alert(error),
      () => console.log("Task Lists")
      );
  }

  parseErrands(data){
    this.tasklists= data["tasklists"];
    console.log(this.tasklists);
    let index = 0;
    for (let tasklist of this.tasklists) {
      
      this.taskListService.getAPITasks(tasklist.id)
      .subscribe(
        data => this.compileErrand(data, tasklist), 
        error => alert(error),
        () => console.log("TASK"+index)
        );
        index++;
    }


  }
  // onGetTasks(){
  //   this.taskListService.getAPITasks()
  //   .subscribe(
  //     data => this.parseTasks(data), 
  //     error => alert(error),
  //     () => console.log("Finished")
  //     );
  // }

  compileErrand(taskData,tasklistData){
    const tasklist = tasklistData;
    let tasks= taskData["todo-items"];
    let parsedTaskArray:any[]=[];

    let calcUrgency;
  
    let totalEstimate: number=0;
    let remainingMinutes:number = 100;
    let todayDate = new Date();
    let launchDate = new Date("2015-10-20");



    for (let task of tasks) {
      let dueDate= task["due-date"];
      dueDate=dueDate.slice(0,4)+"-"+dueDate.slice(4,6)+"-"+dueDate.slice(6);
      
      let taskDueDate = new Date(dueDate);

      let taskItem = {
        progress: (task["progress"]), 
        taskName: task.content, 
        taskID: task.id, 
        taskAssignee:(task["responsible-party-firstname"] + task["responsible-party-lastname"]), 
        taskStart: task["start-date"], 
        taskEnd: task["due-date"]
      };
      parsedTaskArray.push(taskItem);
      if (launchDate.getTime()<taskDueDate.getTime()) {
        launchDate = taskDueDate;
      }      
      // totalEstimate=+ task["estimated-minutes"];
    }    

    const urgency = Math.ceil((launchDate.getTime() - todayDate.getTime())/(1000 * 3600 * 24));

    let newErrand = new Errand(
      tasklist.id,
      urgency, 
      tasklist.name, 
      tasklist.description,
      parsedTaskArray
      // [ 
      //   {progress: '25', taskName: 'Name of Task1', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
      //   {progress: '85', taskName: 'Name of Task2', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
      //   {progress: '68', taskName: 'Name of Task3', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'}
      // ]
    );

    this.errandService.addErrand(newErrand);
    
    console.log(tasks);



    
    
   }

  parseTasks(data){
    // let tasks= data["todo-items"];
    // let newErrand:Errand;
    // console.log(tasks);
    console.log(data);


  }


  // onGetErrands(){
  //   this.taskListService.getAPIErrands()
  //   .subscribe(
  //     (par:any[]) => {

  //       // this.reworkErrands(par);

  //     }
  //   );
  // }

  // reworkErrands(fetchedErrands:any[]){
  //   console.log(fetchedErrands);
    
  //   for(var i in data)
  //   {
  //        var id = data[i].id;
  //        console.log(id);
  //        var name = data[i].name;
  //        console.log(name);
  //   }
    

  // }

  // onGetTasks(){
  //   this.userStorageService.getTasks()
  //     .subscribe(
  //       (response: Response) => {
  //         console.log(response);
  //       }
  //     );
  // }

}
