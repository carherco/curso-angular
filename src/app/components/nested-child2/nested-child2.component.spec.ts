import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedChild2Component } from './nested-child2.component';

describe('NestedChild2Component', () => {
  let component: NestedChild2Component;
  let fixture: ComponentFixture<NestedChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
