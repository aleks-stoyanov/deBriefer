import { Component, OnInit, Input } from '@angular/core';
import {Errand } from '../errand.model';

@Component({
  selector: 'app-errand-details',
  templateUrl: './errand-details.component.html',
  styleUrls: ['./errand-details.component.css']
})
export class ErrandDetailsComponent implements OnInit {
  @Input() errand:Errand;
  constructor() { }

  ngOnInit() {
  }

  onCloseDrawer(){
    
  }

}
