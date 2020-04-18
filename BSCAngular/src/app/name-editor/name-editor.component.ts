import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {  Observable, fromEvent } from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {debounceTime, distinctUntilChanged,filter, map, switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements AfterViewInit  {

  constructor() { }
  name = new FormControl('');


   searchBox = document.getElementById('search-box');

   typeahead = fromEvent(this.searchBox, 'input').pipe(
    map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
    filter(text => text.length > 2),
    debounceTime(10),
    distinctUntilChanged(),
    switchMap(() => ajax('/api/endpointhttp://localhost:49946/api/values'))
  );
  onClickInput() {
    alert('hi');
    this.typeahead.subscribe( (data) => alert(data));
  }
  clickMe() {
    alert("btn hi");
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
  }
}
