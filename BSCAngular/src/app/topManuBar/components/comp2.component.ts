import { Component, Input } from '@angular/core';

@Component({
  template: './listView/listView.component.html'
})
export class Comp2Component {
  @Input() data;
}