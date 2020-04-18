import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { map } from 'rxjs/operators';

export interface _ListViewModel {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-listTable',
  templateUrl: './listTable.component.html',
  styleUrls: ['./listTable.component.css']
})
export class ListTableComponent implements OnInit {
  dataSource: _ListViewModel[];
  constructor(private service: UserService) { }
  ngOnInit() {
     this.service.getListView()
     .pipe(
      map((data: _ListViewModel[])=> {
       this.dataSource =  data;
      }
     )
    )
  }
}
