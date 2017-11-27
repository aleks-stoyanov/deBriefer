import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Errand } from '../errand.model';
import { ErrandService } from '../errand.service';
import {TwApiService} from '../../shared/tw-api.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-errand-list',
  templateUrl: './errand-list.component.html',
  styleUrls: ['./errand-list.component.css']
})
export class ErrandListComponent implements OnInit {
  errands: Errand[] = [];
  errandList:string;

  constructor(private errandService: ErrandService, private twApiService: TwApiService) { }

  ngOnInit() {
    this.twApiService.getAPIErrands()
    .subscribe(
      data => this.parseErrands(data), 
      error => console.log(error),
      () => console.log("")
    );

    this.errandService.errandsChanged
      .subscribe(
        (errands:Errand[]) => {
          this.errands = errands;
        }
      );
    this.errands = this.errandService.getErrands();
  }

  parseErrands(taskListData){
    const tasklists:any[] = taskListData["tasklists"];

    for (let tasklist of tasklists) {
      
      this.twApiService.getAPITasks(tasklist.id)
      .subscribe(
        data => this.compileErrand(data, tasklist), 
        error => console.log(error),
        () => console.log("")
        );
    }
  }

  compileErrand(taskData,tasklistData){
    const tasklist = tasklistData;
    let tasks= taskData["todo-items"];
    let parsedTaskArray:any[]=[];

    let calcUrgency;
  
    let totalEstimate: number=0;
    let remainingMinutes:number = 100;
    let todayDate = new Date();
    let launchDate = new Date("2015-10-30");



    for (let task of tasks) {
      let taskDueDate = new Date(task["due-date"].slice(0,4)+"-"+task["due-date"].slice(4,6)+"-"+task["due-date"].slice(6));

      let taskItem = {
        progress: (task["progress"]), 
        taskName: task["content"], 
        taskID: task["id"], 
        taskAssignee:(task["responsible-party-firstname"] + " " + task["responsible-party-lastname"]), 
        taskStart: task["start-date"], 
        taskEnd: task["due-date"]
      };

      parsedTaskArray.push(taskItem);
      if (launchDate.getTime()<taskDueDate.getTime()) {
        launchDate = taskDueDate;
      }
    }    

    const urgency = Math.ceil((launchDate.getTime() - todayDate.getTime())/(1000 * 3600 * 24));

    let newErrand = new Errand(
      tasklist.id,
      urgency, 
      tasklist.name, 
      tasklist.description,
      parsedTaskArray
    );

    this.errandService.addErrand(newErrand);    
   }

  }
