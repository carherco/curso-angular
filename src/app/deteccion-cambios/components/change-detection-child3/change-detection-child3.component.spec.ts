import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionChild3Component } from './change-detection-child3.component';

describe('ChangeDetectionChild3Component', () => {
  let component: ChangeDetectionChild3Component;
  let fixture: ComponentFixture<ChangeDetectionChild3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDetectionChild3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDetectionChild3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
