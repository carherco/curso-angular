import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionChild1Component } from './change-detection-child1.component';

describe('ChangeDetectionChild1Component', () => {
  let component: ChangeDetectionChild1Component;
  let fixture: ComponentFixture<ChangeDetectionChild1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDetectionChild1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDetectionChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
