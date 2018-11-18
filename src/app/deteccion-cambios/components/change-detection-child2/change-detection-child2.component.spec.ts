import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionChild2Component } from './change-detection-child2.component';

describe('ChangeDetectionChild2Component', () => {
  let component: ChangeDetectionChild2Component;
  let fixture: ComponentFixture<ChangeDetectionChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDetectionChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDetectionChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
