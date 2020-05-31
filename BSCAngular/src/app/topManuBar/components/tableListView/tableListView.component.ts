import { Component, Input, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-tableListView',
  templateUrl: './tableListView.component.html',
  styleUrls: ['./tableListView.component.css']
})

export class TableListViewComponent implements OnInit  {
  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
  }


  ngOnInit(): void {
     const s = this.renderer2.createElement('script');
   s.type = 'text/javascript';
   s.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
      s.onload = this.loadNextScript.bind(this);
   s.text = ``;
   this.renderer2.appendChild(this._document.body, s);
  }
  loadNextScript() {
    const s = this.renderer2.createElement('script');
    s.text = `
    // This would error, if previous script has not yet been loaded
 `
    this.renderer2.appendChild(this._document.body, s);
 }
 
}
