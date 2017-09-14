import { Component, OnInit, Input } from '@angular/core';
import { Errand } from '../../errand.model';
import { ErrandService } from '../../errand.service';


@Component({
  selector: 'app-errand-item',
  templateUrl: './errand-item.component.html',
  styleUrls: ['./errand-item.component.css']
})
export class ErrandItemComponent implements OnInit {
  @Input() errand:Errand;

  constructor(private errandService: ErrandService) {}

  ngOnInit() {}

  onSelected() {
    this.errandService.errandSelected.emit(this.errand);
  }

}
