import { Injectable } from '@angular/core';
import { Tab } from './tab.model';
import { TableListViewComponent } from './components/tableListview/tableListview.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TabService {
  static selectedOperationId: number;
  public tabs: Tab[] = [
   new Tab(TableListViewComponent, 'Comp1 View', { parent: 'AppComponent' })  ];

  public tabSub = new BehaviorSubject<Tab[]>(this.tabs);

  public removeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.tabs.length > 0) {
      this.tabs[this.tabs.length - 1].active = true;
    }
    this.tabSub.next(this.tabs);
  }

  public addTab(tab: Tab) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].active === true) {
        this.tabs[i].active = false;
      }
    }
    tab.id = this.tabs.length + 1;
    tab.active = true;
    this.tabs.push(tab);
    this.tabSub.next(this.tabs);
  }
}
