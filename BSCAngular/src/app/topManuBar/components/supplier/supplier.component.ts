import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, count } from 'rxjs/operators';
import { ListViewModel } from '../clientModels/listTableModel';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  @ViewChild('grid', null) grid: AgGridAngular;
  constructor(private http: HttpClient ) { }
  public density = 'comfortable';
  resData: ListViewModel[];
  resColumnames: string[];
  resOb: Observable<string>;

    columnDefs = [];

rowData: any;

ngOnInit() {
  let counter = 0;
  // tslint:disable-next-line: max-line-length
  this.rowData = this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/1500');
  this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/1500').subscribe(
      // tslint:disable-next-line: max-line-length
      data => { this.resData = data; console.log(this.resData[0].colNames);
                this.resData[0].colNames.forEach(element => {
          counter++;
          if( element !== 'empty' ) {
            this.columnDefs.push({headerName: element, field: 'col' + counter, sortable: true, filter: true, editable: true })}
          }
        )},
      (error) => alert(error),
      () => {this.grid.api.setColumnDefs(this.columnDefs); }
      );
}


}
