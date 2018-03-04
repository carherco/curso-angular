import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lazy3Component } from './lazy3.component';

describe('Lazy3Component', () => {
  let component: Lazy3Component;
  let fixture: ComponentFixture<Lazy3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lazy3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lazy3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
