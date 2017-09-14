import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {ErrandService} from '../errand.service';
import {Errand} from '../errand.model';

@Component({
  selector: 'app-errand-form',
  templateUrl: './errand-form.component.html',
  styleUrls: ['./errand-form.component.css']
})
export class ErrandFormComponent implements OnInit {
  errandForm: FormGroup;

  constructor(private errandService:ErrandService) { }

  ngOnInit() {
    this.initForm();    
  }

  onSubmit(){
      console.log(this.errandForm);
      const errandName:string = this.errandForm.value['promoID'] + this.errandForm.value['promoCompany'] + this.errandForm.value['promoName']
      const newErrand = new Errand(
        12,
        errandName,
        this.errandForm.value['promoPC'],
        this.errandForm.value['promoMC'],
        this.errandForm.value['promoLaunch'],
        this.errandForm.value[''],
        
      );
      this.errandService.addErrand(newErrand);
      
  }

  onAddDeliverable(){
    (<FormArray>this.errandForm.get('promoDeliverables')).push(      
        new FormGroup({'deliverableUrl': new FormControl('test Server URL', [
          Validators.required,
          // Validators.pattern(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/)
        ])}),      
    );
  }
  

  private initForm(){
    let formPromoID = '';
    let formPromoCompany = '';
    let formPromoName = '';
    let formPromoBDM = '';
    let formPromoMC = '';
    let formPromoPC = '';
    let formPromoLaunch = '';
    let formPromoType = '';

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
