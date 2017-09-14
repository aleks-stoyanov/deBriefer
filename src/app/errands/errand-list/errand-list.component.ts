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

  constructor(private errandService: ErrandService, private userStorageService: UserStorageService, private taskListService: TaskListService) { }

  ngOnInit() {
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

  onGetTasks(){
    // this.taskListService.getTasks();
    this.taskListService.getTasks()
    .subscribe(
      (par:any[]) => {
        console.log(par)
      }
    );
  }

  // onGetTasks(){
  //   this.userStorageService.getTasks()
  //     .subscribe(
  //       (response: Response) => {
  //         console.log(response);
  //       }
  //     );
  // }

}
