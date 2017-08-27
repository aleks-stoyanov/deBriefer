import { Component, OnInit } from '@angular/core';

import { Errand } from './errand.model';
import { ErrandService } from './errand.service';

@Component({
  selector: 'app-errands',
  templateUrl: './errands.component.html',
  styleUrls: ['./errands.component.css'],
  providers: [ErrandService]
})
export class ErrandsComponent implements OnInit {
  
  selectedErrand: Errand;

  constructor(private errandService: ErrandService) { }

  ngOnInit() {
    this.errandService.errandSelected
    .subscribe(
      (errand:Errand) => {
        this.selectedErrand = errand;
      }
    );
  }

}
