import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {TaskListService} from '../../shared/task-list.service';

import {ErrandService} from '../errand.service';
import {Errand} from '../errand.model';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';

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
      const errandDescription:string = 
      "PC: " + this.errandForm.value['promoPC'] + " | " + 
      "DC: " + this.errandForm.value['promoMC'] + " | " + 
      "Launch: " + this.errandForm.value['promoLaunch'];
      
      const newErrand = new Errand(
        "",
        urgency,
        errandName,
        errandDescription,
        this.errandForm.value[''],
        
      );
      
        
      const taskName:string = "Visualization of deliverables";
      const taskDescription:string = 
      "ArtWork Location: " + this.errandForm.value['promoArtwork'] + "\n" + 
      "Base Microsite: " + this.errandForm.value['promoBase'] + "\n" + 
      "Using the provided materials please visualize the following deliverables: " + "\n" + 
      this.parseTaskDeliverables(this.errandForm.value['promoDeliverables']) + 
      "all to be delivered before " + this.errandForm.value['promoLaunch'];

      // const url:string = "https://" + this.company + ".teamwork.com/todo_lists/"+ this.tasklist_id + "/todo_items.json";
      const url:string = "https://" + this.company + ".teamwork.com/projects/"+ this.project_id + "/tasklists.json";
  
      //this.errandService.addErrand(newErrand);
      //this.taskListService.postErrand(url, errandName, errandDescription, this.key);
      
      this.taskListService.postErrand(url, errandName, errandDescription, this.key)
      .subscribe(
        data => this.taskListService.postAPITasks(data["TASKLISTID"],taskName,taskDescription, launchDate), 
        error => alert(error),
        // () => console.log(this.errandForm.value['promoDeliverables'])
        () => window.location.reload()
        );      
  }

  parseTaskDeliverables(deliverables:any){
    let stringifiedDeliverables:string = "";
    let counter:number = 1;
    for (let deliverable of deliverables) {
      stringifiedDeliverables += counter + ". " + deliverable["deliverableName"] + " x " + deliverable["deliverableVersions"] +"\nTest Server URL: " + deliverable["deliverableUrl"] + "\n\n";
      counter++;
    }
    return stringifiedDeliverables;
  }

  onAddDeliverable(){
    (<FormArray>this.errandForm.get('promoDeliverables')).push(     
         
        new FormGroup({
          'deliverableName': new FormControl('Type of deliverable', [Validators.required]),
          'deliverableVersions': new FormControl('Number of versions', [Validators.required]), 
          'deliverableUrl': new FormControl('test Server URL', [Validators.required,
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
    let formPromoArtwork = 'Location on Shared drive';
    let formPromoBase = 'Test Url';
    let formPromoType = 'Standard';

    let formPromoDeliverables = new FormArray([]);    
    formPromoDeliverables.push(
        new FormGroup({

          'deliverableName': new FormControl('Landing Page', [Validators.required]),
          'deliverableVersions': new FormControl('2', [Validators.required]), 
          'deliverableUrl': new FormControl('Test server URL', [Validators.required, 
          // Validators.pattern(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/)
          ])
        }
      )
  
    );
    formPromoDeliverables.push(
      new FormGroup({

        'deliverableName': new FormControl('Claim Form', [Validators.required]),
        'deliverableVersions': new FormControl('2', [Validators.required]), 
        'deliverableUrl': new FormControl('Test server URL', [Validators.required, 
        // Validators.pattern(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/)
        ])
      }
    )

  );


    this.errandForm = new FormGroup({
      'promoID': new FormControl(formPromoID, Validators.required),
      'promoCompany': new FormControl(formPromoCompany, Validators.required),
      'promoName': new FormControl(formPromoName, Validators.required),
      'promoBDM': new FormControl(formPromoBDM, Validators.required),
      'promoMC': new FormControl(formPromoMC, Validators.required),
      'promoPC': new FormControl(formPromoPC, Validators.required),
      'promoLaunch': new FormControl(formPromoLaunch, Validators.required),
      'promoArtwork': new FormControl(formPromoArtwork, Validators.required),
      'promoBase': new FormControl(formPromoBase, Validators.required),
      'promoType': new FormControl(formPromoType), 
      'promoDeliverables': formPromoDeliverables
    });
  }

}
