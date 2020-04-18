import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { TabService } from './tab.service';
import {Tab} from './tab.model';
import {TableListViewComponent} from './components/tableListView/tableListView.component';
import {GrouplistComponent} from './components/grouplist/grouplist.component';
import {Comp2Component} from './components/comp2.component';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';
import {TabContentComponent} from './tab-content.component';
import {EditFormComponent} from './components/editForm/editForm.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SupplierComponent} from './components/supplier/supplier.component';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-topManuBar',
  templateUrl: './topManuBar.component.html',
  styleUrls: ['./topManuBar.component.css'],
  providers: [TabService]
})

export class TopManuBarComponent implements OnInit {
    constructor(public tabService: TabService, public http: HttpClient) { }
    @ViewChild('targetBtn', { static: true }) public targetBtn: ElementRef;
    tabTitle = '';
    tabs = this.tabService.tabs;
    selectedTab: number;
    counter = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    ngOnInit() {}
  tabChanged(event) {
  }
  addNewTab(event: any, operationId: number, edit: boolean) {
    TabService.selectedOperationId = operationId;
    const btnClassName = event.srcElement.className;
    const title = edit ? this.tabService.tabs.find(c => c.active === true).title + ' - ' : '';
    this.selectedTab = this.tabService.tabs.findIndex(c => c.active === true) + 2;
    // setTimeout(() => {
    //   console.log(this.selectedTab);
    // }, 500);
    let component: any;
    if ( !edit ) {
      component = GrouplistComponent;
    }
    else {
      switch (operationId) {
        case  600101: {component = SupplierComponent; } break;
        // tslint:disable-next-line: no-switch-case-fall-through
        case 1500: {component = EditFormComponent; }
      }; 
    }
    
    if (!(btnClassName.includes('wrapper') || btnClassName.includes('trigger') )){
      this.tabService.addTab(
         new Tab(component, title + event.srcElement.innerText , { parent: 'AppComponent' })
      );
    }

  }
  removeTab(index: number): void {
    this.tabService.removeTab(index);
   }
  }

