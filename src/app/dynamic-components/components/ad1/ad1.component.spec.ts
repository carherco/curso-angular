import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ad1Component } from './ad1.component';

describe('Ad1Component', () => {
  let component: Ad1Component;
  let fixture: ComponentFixture<Ad1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ad1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ad1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
