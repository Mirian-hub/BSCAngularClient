import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { finalize, count, retry } from 'rxjs/operators';
import { ListViewModel } from '../clientModels/listTableModel';
import {ChildColumnModel} from '../clientModels/HelperControlsModel';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import {TabService} from '../../tab.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { element } from 'protractor';
import {of} from 'rxjs';
import {BsModalService, BsModalRef, ModalOptions} from 'ngx-bootstrap/modal';
import {TemplateRendererComponent} from './templateRendererComponent';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { ChildTepmlatedataModel } from '../clientModels/childTemplateDataModel';
import { debug } from 'util';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit {
  @ViewChild('searchCell1', null) searchCell1: TemplateRef<any>;
  @ViewChild('textBoxCell11', null) textBoxCell11: TemplateRef<any>;
  @ViewChild('textBoxCell12', null) textBoxCell12: TemplateRef<any>;
  // textBox11Source: any;
  // textBox12Source: any;
  // searchCell1Source: any;
  search1Source: ChildColumnModel[];
  // search2Source: ChildColumnModel[];

  @ViewChild('searchCell2', null) searchCell2: TemplateRef<any>;
  @ViewChild('textBoxCell21', null) textBoxCell21: TemplateRef<any>;
  @ViewChild('textBoxCell22', null) textBoxCell22: TemplateRef<any>;
  textBox21Source: any;
  textBox22Source: any;
  searchCell2Source: any;
  search2Source: ChildColumnModel[];

  @ViewChild('searchCell3', null) searchCell3: TemplateRef<any>;
  @ViewChild('textBoxCell31', null) textBoxCell31: TemplateRef<any>;
  @ViewChild('textBoxCell32', null) textBoxCell32: TemplateRef<any>;
  textBox31Source: any;
  textBox32Source: any;
  searchCell3Source: any;
  search3Source: ChildColumnModel[];

  @ViewChild('searchCell4', null) searchCell4: TemplateRef<any>;
  @ViewChild('textBoxCell41', null) textBoxCell41: TemplateRef<any>;
  @ViewChild('textBoxCell42', null) textBoxCell42: TemplateRef<any>;
  textBox41Source: any;
  textBox42Source: any;
  searchCell4Source: any;
  search4Source: ChildColumnModel[];

  @ViewChild('searchCell5', null) searchCell5: TemplateRef<any>;
  @ViewChild('textBoxCell51', null) textBoxCell51: TemplateRef<any>;
  @ViewChild('textBoxCell52', null) textBoxCell52: TemplateRef<any>;
  textBox51Source: any;
  textBox52Source: any;
  searchCell5Source: any;
  search5Source: ChildColumnModel[];


  private spinnerOn = true;
  private frameworkComponents: any;
  private commandText1: string;
  private commandText2: string;
  private sqlQuery: string;
  modalref: BsModalRef;
  showSubmitBtn1 = false;
  pageOneForm: FormGroup;
  comboSource: ChildTempDt[];
  @ViewChild('grid', null) grid: AgGridAngular;

  dialogRef: MatDialogRef<SupplierEditComponent>;
  options: DefaultData[];
  tmp1: string;
  tmp2: string;
  tmp3: string;

  complexColumnNumber: number;
  defaultSelections = [];
  constructor( private http: HttpClient, private tabService: TabService , private dialog: MatDialog,
               private fb: FormBuilder, private modalService: BsModalService,
              ) { }
  public density = 'comfortable';
  resData: ListViewModel[];
  resColumnames: string[];
  resOb: Observable<string>;
  columnDefs = [];
  columnDefs2 = [];

  dataTab1: ListViewModel[];
  rowDataTab2: any;
  rowDataTab3: any;

  tab2IsClicked: false;
  tab1Names: string[];
  defaultColNames: string[];
  arrRes: string[];
  childTempData: ChildTempDt[];
  selectedOptions: DefaultData[];
  selectOption = [1, 2, 3, 4];
  defaultSelectionsDictionary = [];
  complexColumnIndexies = [];
  complexColumnNames = [];
  complexColumnSourcData = [];
  colTemplateTypesTab2 = [];
  columnFormatName: string;
  complexColumnIndex = [];
  ngOnInit() {
    this.columnFormatName = 'None';
    const numListArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    this.pageOneForm = this.fb.group({});
    this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId +
                                    '/0/' + localStorage.getItem('LVselectedRowId'))
    .subscribe(
      data => {this.dataTab1 = data;
               this.commandText1 = this.dataTab1[0].executedQuery;
               this.tab1Names = data[0].colNames;
               this.defaultColNames = data[0].defaultColNames;
              },
      (error) => alert(error),

      () => {  for (const i of numListArray) {
                this.pageOneForm.addControl(this.tab1Names[i], this.fb.control(this.defaultColNames[i]));
                // console.log(this.defaultColNames[i]);
              }
               this.defaultColNames = [];
               this.showSubmitBtn1 = true;
               this.spinnerOn = false;
            }
    );
    // this.http.get<ChildColumnModel[]>('http://localhost:49946/api/InnerListView/StockItemT0ID_C').subscribe(
    //   (data) => {
    //     this.search1Source = data;
    //    });
    // this.rowDataTab2 = this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId +
    //                                                   '/1/' + localStorage.getItem('LVselectedRowId'));
    let counter = 0;
    let simpleRowCounter = 0;
    let complexRowCounter = 0;
    this.rowDataTab2 = this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId +
                                   '/1/' + localStorage.getItem('LVselectedRowId'));
    this.rowDataTab2.subscribe(
        // tslint:disable-next-line: max-line-length
        data => { this.resData = data;
                  this.commandText2 = data[0].executedQuery;
                  this.resData[0].colNames.forEach(element=> {
                  const childsArray = [];
                  if (data[0].colIsSimple[counter] === false) {
                    this.complexColumnIndex.push(new ComplexColumn(simpleRowCounter, complexRowCounter));
                    simpleRowCounter++;
                    this.complexColumnNames.push(element);
                    this.complexColumnIndexies.push(counter + 1);
                    this.complexColumnNumber++;
                    complexRowCounter++;
                    let colCounter = 1;
                    let childColNumbers = 0;
                    data[0].childTemplates.forEach(childelement => {
                      if ( element === childelement.parentColumnName) {
                        childColNumbers++;
                        if ( childColNumbers === 1  ) {
                          childsArray.push({
                            headerName: childelement.columnNames[colCounter],
                            // width: 300,
                            resizable: true,
                            cellRendererFramework: TemplateRendererComponent,
                            cellRendererParams: {
                              ngTemplate: this.dynamicTemplateForm('search', complexRowCounter)
                            },
                            valueFormatter: this.testValueFormatter
                          });
                        } else if (childColNumbers === 2) {

                          childsArray.push({
                            headerName: childelement.columnNames[colCounter],
                            // width: 300,
                            resizable: true,
                            cellRendererFramework: TemplateRendererComponent,
                            cellRendererParams: {
                              ngTemplate: this.dynamicTemplateForm('text', complexRowCounter)
                            },
                            valueFormatter: this.testValueFormatter
                          });
                        } else {
                          childsArray.push({
                            headerName: childelement.columnNames[colCounter],
                            // width: 300,
                            resizable: true,
                            cellRendererFramework: TemplateRendererComponent,
                            cellRendererParams: {
                              ngTemplate: this.dynamicTemplateForm('textBoxCell12', complexRowCounter)
                            },
                            valueFormatter: this.testValueFormatter
                          });
                        }
                        colCounter++;
                      }
                    });
                   } else {
                    simpleRowCounter++;
                    childsArray.push({headerName: data[0].colTemplateTypes[counter] , field: 'col' + simpleRowCounter, sortable: true,
                                  resizable: true , filter: true, editable: true,
                                  valueFormatter: this.testValueFormatter });
                   }
                  this.columnDefs.push(
                    {
                      headerName: element,
                      marryChildren: true,
                      minWidth:  200,
                      children: childsArray
                    }
                  );
                  counter++;
                  }
          );
        },
        (error) => alert(error),
        () => {this.grid.api.setColumnDefs(this.columnDefs);
               this.childTempData = [];
               console.log('this data' + this.resData[0].col1);
               this.resData.forEach(el => this.childTempData.push(new ChildTempDt(this.search1Source, el.operationId.toString())));
               // get default selected values of complex columns
               // tslint:disable-next-line: prefer-for-of
               for (let i = 0; i < this.resData.length; i++) {
                  this.complexColumnIndexies.forEach(el => {
                    this.defaultSelections.push(this.resData[i]['col'+ el]);
                  });
               }
               // get comlex column sources
               for (let i = 0; i < this.complexColumnNames.length; i++) {
                this.http.get<ChildColumnModel[]>('http://localhost:49946/api/InnerListView/' + this.complexColumnNames[i]).subscribe(
                  (data) => {
                    this.complexColumnSourcData[i] =  data;
                   });
               }
               this.defaultSelectionsDictionary = this.sliceArrayIntoNPeaces(this.complexColumnIndexies.length, this.defaultSelections);
               
               this.search1Source = this.complexColumnSourcData[0];
              }
        );
  }
  public openModalEdit(tmplateNumber: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    const dataSource = this.complexColumnSourcData[tmplateNumber - 1];
    dataSource.forEach( element => {
      element.templateClassNumber = tmplateNumber;
    }); 
    dialogConfig.data = dataSource;
    // debugger; 
    this.dialogRef =  this.dialog.open(SupplierEditComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(data => { this.searchDialog(data); });
  }

  public openModal(template: TemplateRef<any>, tabNumber: number) {
    this.modalref = this.modalService.show(template);
    switch (tabNumber) {
      case 1: this.sqlQuery =   this.commandText1; break;
      case 2: this.sqlQuery = this.commandText2; break;
    }
  }

  public addNewRow() {
    this.grid.api.updateRowData({ add: [{}] });
    // console.log('addNewRow fn exe');
  }

  public bdclick(ev: Event) {
    const inputvalue = (ev.target as HTMLInputElement).value;
  }
  public search(ev: Event) {
   const searchKey = (ev.target as HTMLInputElement).value;
   const searrhced = this.search1Source.find(c => c.col2 === searchKey);
   if ( searrhced !== undefined) {
    document.getElementsByClassName('value2')[this.grid.api.getFocusedCell().rowIndex].textContent = searrhced.col3;
    document.getElementsByClassName('value3')[this.grid.api.getFocusedCell().rowIndex].textContent = searrhced.col4;
   } else {
    document.getElementsByClassName('value2')[this.grid.api.getFocusedCell().rowIndex].textContent = null;
    document.getElementsByClassName('value3')[this.grid.api.getFocusedCell().rowIndex].textContent = null;
   }
  }

  public testValueFormatter(paramas) {
   // let value = paramas.value;
   // const tmp = this.columnFormatName;
    // if(value < 0) {
    //   return paramas.val
    // }
    switch(paramas.colDef.headerName) {
      case 'Price': {
        // tslint:disable-next-line: radix
        let val = parseInt(paramas.value);
        let finres;
        if(val<0) {
           return  '(' + val.toFixed(4) + ')';
        }else {
           return val.toFixed(4);
        }
      }
    }
  }

  public setMultipleChoiceDefaults() {
    let tmp = this.columnFormatName;
    setTimeout (() => { let counter1 = 0;
                        this.defaultSelectionsDictionary[0].forEach(innerElement => {
                      const targetDataSource1 = this.complexColumnSourcData[0].find(c => c.col1 === innerElement);
                      if (document.getElementsByClassName('value11')) {
                      (document.getElementsByClassName('value11')[counter1] as HTMLInputElement).value = targetDataSource1.col2;
                      }
                      if (document.getElementsByClassName('value12')) {
                        document.getElementsByClassName('value12')[counter1].textContent = targetDataSource1.col3;
                      }
                      if (document.getElementsByClassName('value13')) {
                        document.getElementsByClassName('value13')[counter1].textContent = targetDataSource1.col4;
                      }
                      counter1++;
                    });

                      let counter2 = 0;
                        this.defaultSelectionsDictionary[1].forEach(innerElement => {
                      const targetDataSource2 = this.complexColumnSourcData[1].find(c => c.col1 === innerElement);
                      if (document.getElementsByClassName('value21')) {
                      (document.getElementsByClassName('value21')[counter2] as HTMLInputElement).value = targetDataSource2.col2;
                      }
                      if (document.getElementsByClassName('value22')) {
                        document.getElementsByClassName('value22')[counter2].textContent = targetDataSource2.col3;
                      }
                      counter2++;
                    });

                        let counter3 = 0;
                        this.defaultSelectionsDictionary[2].forEach(innerElement => {
                      const targetDataSource3 = this.complexColumnSourcData[2].find(c => c.col1 === innerElement);
                      if (document.getElementsByClassName('value31')) {
                      (document.getElementsByClassName('value31')[counter3] as HTMLInputElement).value = targetDataSource3.col2;
                      }
                      if (document.getElementsByClassName('value32')) {
                        document.getElementsByClassName('value32')[counter3].textContent = targetDataSource3.col3;
                      }
                      // if (document.getElementsByClassName('value33')) {
                      //   document.getElementsByClassName('value33')[counter3].textContent = targetDataSource3.col4;
                      // }
                      counter3++;
                    });
                        let counter4 = 0;
                        this.defaultSelectionsDictionary[3].forEach(innerElement => {
                    const targetDataSource4 = this.complexColumnSourcData[3].find(c => c.col1 === innerElement);
                    if (document.getElementsByClassName('value41')) {
                    (document.getElementsByClassName('value41')[counter4] as HTMLInputElement).value = targetDataSource4.col2;
                    }
                    if (document.getElementsByClassName('value42')) {
                      document.getElementsByClassName('value42')[counter4].textContent = targetDataSource4.col3;
                    }
                    // if (document.getElementsByClassName('value33')) {
                    //   document.getElementsByClassName('value33')[counter3].textContent = targetDataSource3.col4;
                    // }
                    counter4++;
                  });

    }, 3000);
  }

  public searchDialog(data: ChildColumnModel ) {
    const searched = data;
    const colpexColNumber = data.templateClassNumber;
    const rwoIndex = this.grid.api.getFocusedCell().rowIndex;
    if(searched.numberOfColumn === 4) {
      (document.getElementsByClassName('value' + colpexColNumber + '1')[rwoIndex] as HTMLInputElement).value = searched.col2;
      document.getElementsByClassName('value' + colpexColNumber + '2')[rwoIndex].textContent = searched.col3;
      document.getElementsByClassName('value' + colpexColNumber + '3')[rwoIndex].textContent = searched.col4;
    }
    if(searched.numberOfColumn === 3) {
      (document.getElementsByClassName('value' + colpexColNumber + '1')[rwoIndex] as HTMLInputElement).value = searched.col2;
      document.getElementsByClassName('value' + colpexColNumber + '2')[rwoIndex].textContent = searched.col3;
    }
      }

public dynamicTemplateForm( sourceName: string, columnNum: number) {
  switch (sourceName ) {
    case 'search': switch (columnNum) {
        case 1: return this.searchCell1;
        case 2: return this.searchCell2;
        case 3: return this.searchCell3;
        case 4: return this.searchCell4;
        case 5: return this.searchCell5;
      }
    // tslint:disable-next-line: no-switch-case-fall-through
    case 'text': switch (columnNum) {
      case 1: return this.textBoxCell11;
      case 2: return this.textBoxCell21;
      case 3: return this.textBoxCell31;
      case 4: return this.textBoxCell41;
      case 5: return this.textBoxCell51;
      }
    case 'textBoxCell12': switch (columnNum) {
      case 1: return this.textBoxCell12;
      case 2: return this.textBoxCell22;
      case 3: return this.textBoxCell32;
      case 4: return this.textBoxCell42;
      case 5: return this.textBoxCell52;
      }
  }
}


  public sliceArrayIntoNPeaces(n: number, sourc: string[]) {
   const multipl = sourc.length / n;
   const res = [];
   for (let j = 0; j < n; j++) {
      const tmp = [];
      for (let i = j; i < sourc.length; i += n) {
        tmp.push(sourc[i]);
      }
      res.push(tmp);
    }
   return res;
  }

  public refresh () {
    this.rowDataTab2 = this.http.get<ListViewModel[]>('http://localhost:49946/api/listview/' + TabService.selectedOperationId +
                                   '/1/' + localStorage.getItem('LVselectedRowId'));
    for (let i = 0; i < this.complexColumnNames.length; i++) {
      this.http.get<ChildColumnModel[]>('http://localhost:49946/api/InnerListView/' + this.complexColumnNames[i]).subscribe(
        (data) => {
          this.complexColumnSourcData[i] =  data;
         });
    }
    this.setMultipleChoiceDefaults();

  }
}


export class ChildTempDt {
  dataSrc: ChildColumnModel[];
  operationId: string;
  // tslint:disable-next-line: variable-name
  constructor(_dataSrc: ChildColumnModel[], _operationId: string) {
    this.dataSrc = _dataSrc;
    this.operationId = _operationId;
  }
}


export class DefaultData {
  columnIndex: number;
  selectionId: number;
  constructor(columnIndex: number, selectionId: number) {
    this.columnIndex = columnIndex;
    this.selectionId = selectionId;
  }
}

class RowPosition {
  rowIndex: number;
  rowPinned: string | undefined;
  constructor(rowIndex: number) {
    this.rowIndex = rowIndex;
  }
}
class ComplexColumn {
  colIndex: number;
  colNumber: number;
  constructor(colindex: number, colNumber: number) 
  {
    this.colIndex = colindex;
    this.colNumber = colNumber;
  }
}

