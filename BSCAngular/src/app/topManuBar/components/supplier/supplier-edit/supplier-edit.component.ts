import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListViewModel } from '../../clientModels/listTableModel';
import { TabService } from 'src/app/topManuBar/tab.service';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChildColumnModel } from '../../clientModels/HelperControlsModel';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { single } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
  searchValue: string;
  @ViewChild('grid', null) grid: AgGridAngular;
  rowSelection: any;
  gridData: ChildColumnModel[];
  resData: ChildColumnModel[];
  columnDefs = [];
  displayedColumns = ['select' , 'col1', 'col2','col3', 'col4']
  dataSource = new MatTableDataSource<ChildColumnModel>(this.data);
  selection = new SelectionModel<ChildColumnModel>(true, []);
  constructor(private http: HttpClient, private dialogRef: MatDialogRef<SupplierEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit() {
    let counter = 1;
    this.gridData = this.data;
    this.rowSelection = 'single';
    this.data[0].columnNames.forEach(element => {
    // tslint:disable-next-line: no-debugger
    switch (counter) {
        case 1: {
          this.columnDefs.push(
            {
               field: 'col' + counter, headerName: element, sortable: true,
                                  resizable: true ,  filter: true, rowSelection: 'single'
            });
        }; break;
        case 2: {
          this.columnDefs.push(
            {
               field: 'col' + counter, headerName: element,  sortable: true, resizable: true ,  filter: true
            });
        }; break;
        case 3: {
          this.columnDefs.push(
            {
               field: 'col' + counter, headerName: element,  sortable: true, resizable: true ,  filter: true
            });
        }; break;
      } 
      counter++;
        });
    this.columnDefs.push(
          {
              field: 'col4', headerName: 'ერთეულის სახელი',  sortable: true, resizable: true ,  filter: true
          });
    setTimeout(() => this.grid.api.setColumnDefs(this.columnDefs) , 1000);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  select() {
    console.log(this.grid.api.getSelectedRows());
    this.dialogRef.close(this.grid.api.getSelectedRows()[0]);
  }
  public searchinGrid() {
    this.grid.api.setQuickFilter(this.searchValue);
  }
}
