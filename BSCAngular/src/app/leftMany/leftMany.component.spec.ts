/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LeftManyComponent } from './leftMany.component';

describe('LeftManyComponent', () => {
  let component: LeftManyComponent;
  let fixture: ComponentFixture<LeftManyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftManyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
