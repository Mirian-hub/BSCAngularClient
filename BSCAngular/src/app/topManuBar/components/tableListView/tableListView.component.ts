import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-tableListView',
  templateUrl: './tableListView.component.html',
  styleUrls: ['./tableListView.component.css']
})

export class TableListViewComponent  {
  dataSource:any;
  @Input() data;
}
