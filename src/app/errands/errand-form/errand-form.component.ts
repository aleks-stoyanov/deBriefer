import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {TaskListService} from '../../shared/task-list.service';

import {ErrandService} from '../errand.service';
import {Errand} from '../errand.model';

@Component({
  selector: 'app-errand-form',
  templateUrl: './errand-form.component.html',
  styleUrls: ['./errand-form.component.css']
})
export class ErrandFormComponent implements OnInit {
  errandForm: FormGroup;

  constructor(private errandService:ErrandService, private taskListService: TaskListService) { }

  ngOnInit() {
    this.initForm();    
  }


  
  
  date = new Date();
  month = this.date.getMonth() + 1;
  day = this.date.getDate();
  due_date = this.date.getFullYear() + (this.month < 10 ? '0' : '') + this.month + (this.day < 10 ? '0' : '') + this.day;
  
  company = "thetaxbackgroup";
  key = "love349marker";
  project_id = "400900";
  tasklist_id = "1513908";
  


  onSubmit(){
      console.log(this.errandForm);

      const launchDate = new Date(this.errandForm.value['promoLaunch']);
      const urgency = Math.ceil((launchDate.getTime() - this.date.getTime())/(1000 * 3600 * 24));
      const errandName:string = this.errandForm.value['promoID'] + this.errandForm.value['promoCompany'] + this.errandForm.value['promoName'];
      const errandDescription:string = "PC: " + this.errandForm.value['promoPC'] + " | " + "MC: " + this.errandForm.value['promoMC'] + " | " + "Launch: " + this.errandForm.value['promoLaunch'];
      
      const newErrand = new Errand(
        "",
        urgency,
        errandName,
        errandDescription,
        this.errandForm.value[''],
        
      );

      // const url:string = "https://" + this.company + ".teamwork.com/todo_lists/"+ this.tasklist_id + "/todo_items.json";
      const url:string = "https://" + this.company + ".teamwork.com/projects/"+ this.project_id + "/tasklists.json";
  
      this.errandService.addErrand(newErrand);
      this.taskListService.postErrand(url, errandName, errandDescription, this.key);
      
  }

  onAddDeliverable(){
    (<FormArray>this.errandForm.get('promoDeliverables')).push(      
        new FormGroup({'deliverableUrl': new FormControl('test Server URL', [
          Validators.required,
          // Validators.pattern(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/)
        ])}),      
    );
  }

  onRemoveDeliverable(index){
    (<FormArray>this.errandForm.get('promoDeliverables')).removeAt(index);
  }
  

  private initForm(){
    let formPromoID = '[0001]';
    let formPromoCompany = 'Client Company';
    let formPromoName = 'Name of the promotion';
    let formPromoBDM = 'Ann Marie Smee';
    let formPromoMC = 'Janice Carlin';
    let formPromoPC = 'Martin Nenkov';
    let formPromoLaunch:Date;
    let formPromoType = 'Standard';

    let formPromoDeliverables = new FormArray([]);    
    formPromoDeliverables.push(
        new FormGroup({'deliverableUrl': new FormControl('test Server URL', [
          Validators.required, 
          // Validators.pattern(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/)
        ])}),
  
    );


    this.errandForm = new FormGroup({
      'promoID': new FormControl(formPromoID, Validators.required),
      'promoCompany': new FormControl(formPromoCompany, Validators.required),
      'promoName': new FormControl(formPromoName, Validators.required),
      'promoBDM': new FormControl(formPromoBDM, Validators.required),
      'promoMC': new FormControl(formPromoMC, Validators.required),
      'promoPC': new FormControl(formPromoPC, Validators.required),
      'promoLaunch': new FormControl(formPromoLaunch, Validators.required),
      'promoType': new FormControl(formPromoType), 
      'promoDeliverables': formPromoDeliverables
    });
  }

}
