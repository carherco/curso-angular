import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ad4Component } from './ad4.component';

describe('Ad4Component', () => {
  let component: Ad4Component;
  let fixture: ComponentFixture<Ad4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ad4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ad4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
