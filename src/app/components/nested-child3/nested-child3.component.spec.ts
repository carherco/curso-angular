import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedChild3Component } from './nested-child3.component';

describe('NestedChild3Component', () => {
  let component: NestedChild3Component;
  let fixture: ComponentFixture<NestedChild3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedChild3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedChild3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
