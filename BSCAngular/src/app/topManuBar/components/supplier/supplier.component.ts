import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, count } from 'rxjs/operators';
import { ListViewModel } from '../clientModels/listTableModel';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import {TabService} from '../../tab.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { element } from 'protractor';
import {of} from 'rxjs';
interface FormSource {
  [key: string]: string;
}
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit {
  pageOneForm: FormGroup;
  @ViewChild('grid', null) grid: AgGridAngular;
  constructor(private http: HttpClient, private tabService: TabService , private dialog: MatDialog, private fb: FormBuilder) { }
  private description = 'The Executed SQL Script';
  private scriptText = 'Script TEXT GOES HERE !';
  public density = 'comfortable';
  resData: ListViewModel[];
  resColumnames: string[];
  resOb: Observable<string>;
  columnDefs = [];
  dataTab1: ListViewModel[];
  rowDataTab2: any;
  tab2IsClicked: false;
  tab1Names: string[];
  tab1FormSource: FormSource[];
  defaultColNames: string[];
  // kontrolebis dinamiurad gadacemistvis kontrolebis tipebis shesabamisi veli sheiqeneba da gdaecema html-s, datrialdeba am velshi da shesabamisad daixateba formebi 
  ngOnInit() {
    let numListArray =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    let charList = ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a',]
    let numList =of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
    // setTimeout(() => {
    //   numList =(3,12,23,33,43,53,63,73,83,93,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
    //   alert('Changed');
    // }, 4000);
    this.pageOneForm = this.fb.group({});
    let counter = 0;
    let counterDic=0;
    // tslint:disable-next-line: max-line-length
    this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId + '/0/' + localStorage.getItem('LVselectedRowId'))
    .subscribe(
      data => {this.dataTab1 = data;
               this.tab1Names = data[0].colNames; 
               this.defaultColNames = data[0].defaultColNames;
              },
      (error) => alert(error),

      () => {  for (let i of numListArray) {
                this.pageOneForm.addControl(this.tab1Names[i], this.fb.control(this.defaultColNames[i]));
                console.log(this.defaultColNames[i]);;
              };
              this.defaultColNames = [];
            }
    );
    

    // tslint:disable-next-line: max-line-length
    this.rowDataTab2 = this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId + '/1/' + localStorage.getItem('LVselectedRowId'));
    // tslint:disable-next-line: max-line-length
    this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId + '/1/' + localStorage.getItem('LVselectedRowId')).subscribe(
        // tslint:disable-next-line: max-line-length
        data => { this.resData = data;
                  this.resData[0].colNames.forEach(element => {
            counter++;
            if (element !== 'empty' ) {
              // tslint:disable-next-line: max-line-length
                if(element === 'სასაწყობო ნაკეთობა') {
                  this.columnDefs.push(
                    {
                      headerName: element,
                      marryChildren: true,
                      children:[
                        {headerName: 'filter & sort', field: 'col' + counter, sortable: true, filter: 'agTextColumnFilter', resizable: true, editable: true,
                      },
                      {headerName: 'filter & sort', field: 'col' + counter, sortable: true, filter: true, resizable: true, editable: true, cellEditor: 'agSelectCellEditor',
                    cellEditorParams: {
                      values: ['Porsche', 'Toyota', 'Ford', 'AAA', 'BBB', 'CCC'],
                        } 
                      },
                      {headerName: 'filter & sort', field: 'col' + counter , sortable: true, filter: 'agTextColumnFilter', resizable: true, editable: false},
                      ]
                      
                    }
                  )
                }else {
                    this.columnDefs.push(
                      {headerName: element, marryChildrentrue: true, children:[
                        {headerName: 'filter & sort', field: 'col' + counter, sortable: true, resizable: true , filter: true, editable: true,}
                      ]}
                   )
               }
             }
            }
          )},
        (error) => alert(error),
        () => {this.grid.api.setColumnDefs(this.columnDefs); }
        );
  }
}
