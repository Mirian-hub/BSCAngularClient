import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSCComponent } from './bsc.component';

describe('BSCComponent', () => {
  let component: BSCComponent;
  let fixture: ComponentFixture<BSCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
