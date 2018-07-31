import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColdObservablesComponent } from './cold-observables.component';

describe('ColdObservablesComponent', () => {
  let component: ColdObservablesComponent;
  let fixture: ComponentFixture<ColdObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColdObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColdObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
