import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lazy5Component } from './lazy5.component';

describe('Lazy5Component', () => {
  let component: Lazy5Component;
  let fixture: ComponentFixture<Lazy5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lazy5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lazy5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
