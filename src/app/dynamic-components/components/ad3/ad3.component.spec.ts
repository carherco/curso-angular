import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ad3Component } from './ad3.component';

describe('Ad3Component', () => {
  let component: Ad3Component;
  let fixture: ComponentFixture<Ad3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ad3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ad3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
