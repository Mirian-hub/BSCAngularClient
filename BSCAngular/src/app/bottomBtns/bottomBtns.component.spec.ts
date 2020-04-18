/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BottomBtnsComponent } from './bottomBtns.component';

describe('BottomBtnsComponent', () => {
  let component: BottomBtnsComponent;
  let fixture: ComponentFixture<BottomBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
