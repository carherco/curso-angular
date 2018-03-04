import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lazy4Component } from './lazy4.component';

describe('Lazy4Component', () => {
  let component: Lazy4Component;
  let fixture: ComponentFixture<Lazy4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lazy4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lazy4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
