import { Component, OnInit } from '@angular/core';
import { Errand } from '../errand.model';
import { ErrandService } from '../errand.service';

@Component({
  selector: 'app-errand-list',
  templateUrl: './errand-list.component.html',
  styleUrls: ['./errand-list.component.css']
})
export class ErrandListComponent implements OnInit {
  errands: Errand[] = [];

  constructor(private errandService: ErrandService) { }

  ngOnInit() {
    this.errands = this.errandService.getErrands();
  }

}
