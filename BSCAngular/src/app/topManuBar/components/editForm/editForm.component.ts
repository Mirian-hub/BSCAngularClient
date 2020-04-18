import { Component, OnInit } from '@angular/core';
import {GrouplistComponent} from '../grouplist/grouplist.Component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { defaultCipherList } from 'constants';
import {GroupViewModel} from '../clientModels/groupTableModel';
import {ListViewModel} from '../clientModels/listTableModel';
import {AppService} from '../service/mainservice';
// tslint:disable-next-line: class-name
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-editForm',
  templateUrl: './editForm.component.html',
  styleUrls: ['./editForm.component.css']
})

// tslint:disable-next-line: class-name

export class EditFormComponent implements OnInit {
  readonly BaseUrl = 'http://localhost:49946/api/';
  termCode: string; termName: string; termFormat: string;
  termType: string[];
  termStatus = ['Active - აქტიური', 'Passive - პასიური'];
  termGroup: string[];
  public groupDatasource: ListViewModel[];
  constructor(private http: HttpClient, private service: AppService ) {}
  public getGroupView(): Observable<ListViewModel[]> {
    return this.http.get<ListViewModel[]>(this.BaseUrl + 'listview' + '/1500');
   }
  ngOnInit(): void {
    // tslint:disable-next-line: max-line-length
    // this.getGroupView().subscribe(data => this.groupDatasource = data.filter((element, i, arr) => arr.findIndex(t => t.id == element.id) === i));
    this.termCode = this.service.termCode;
    this.termName = this.service.termName;
    this.termFormat = this.service.termFormat;
    this.groupDatasource = this.service.groupDatasource;
  }

}
