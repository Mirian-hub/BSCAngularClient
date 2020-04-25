import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, count } from 'rxjs/operators';
import { ListViewModel } from '../clientModels/listTableModel';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import {TabService} from '../../tab.service';
import { TopManuBarComponent } from '../../topManuBar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal'
/** Constants used to fill up our data base. */

// tslint:disable-next-line: class-name

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
  private commandText: string;
  modalref: BsModalRef;
  private searchValue: string;
  private gridApi;
  private selectedRowId: string;
  @ViewChild('grid', null) grid: any;
  constructor(private http: HttpClient, private service: TabService, private topManuBar: TopManuBarComponent, private modalService: BsModalService ) { }
  public density = 'comfortable';
  resData: ListViewModel[];
  resColumnames: string[];
  resOb: Observable<string>;

    columnDefs = [
      ];

rowData: any;

ngOnInit() {
  let counter = 0;
  let counterCheck = 0;
  // tslint:disable-next-line: max-line-length
  this.rowData = this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId+'/-1/-1');
  this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId +'/-1/-1').subscribe(
      // tslint:disable-next-line: max-line-length
      data => { this.resData = data; console.log(this.resData[0].colNames);
                this.commandText = this.resData[0].executedQuery;
                this.resData[0].colNames.forEach(element => {
                counter++;
                // chechBoxSelectoi swora ar jdeba
                if( element !== 'empty') {
                  if(counterCheck === 0 ){
                    this.columnDefs.push({headerName: element, field: 'col' + counter,
                                          sortable: true, filter: true, editable: true, checkboxSelection: true, resizable: true });
                  } else {
                      this.columnDefs.push({headerName: element, field: 'col' + counter,
                                            sortable: true, filter: true, editable: true, selection: true, resizable: true });
                    }
                  counterCheck++;
                  }
                }
              );
                this.columnDefs.push({headerName: 'ჯგუფის კოდი', field: 'groupKey', sortable: true,  filter: true,
                 });
                this.columnDefs.push({headerName: 'ჯგუფის სახელი', field: 'groupName' , sortable: true, filter: true });
            },
      (error) => alert(error),
      () => {this.grid.api.setColumnDefs(this.columnDefs); }
      );
}

public onEditBtnClick() {
    // tslint:disable-next-line: deprecation
    this.topManuBar.addNewTab(event, TabService.selectedOperationId, true);
    console.log(this.grid.api.getSelectedRows()[0].col1);
    localStorage.setItem('LVselectedRowId', this.gridApi.getSelectedRows()[0].col1);
  // const val = (event.target as HTMLInputElement);
  // this.service.termCode = val.closest('.igx-display-container').childNodes[4].childNodes[3].textContent;
  // this.service.termName = val.closest('.igx-display-container').childNodes[2].childNodes[3].textContent;
  // this.service.termFormat = val.closest('.igx-display-container').childNodes[3].childNodes[3].textContent;
  // this.service.groupDatasource = this.data.filter((element, i, arr) => arr.findIndex(t => t.col1 == element.col1) === i);
 };
 public onGridReady(par) {
  this.gridApi = par.api;
 }
 public searchinGrid() {
   this.gridApi.setQuickFilter(this.searchValue);
 }
 public openModal (template: TemplateRef<any>) {
   this.modalref = this.modalService.show(template);
 }


}


