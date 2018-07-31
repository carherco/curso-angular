import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesFriosComponent } from './observables-frios.component';

describe('ObservablesFriosComponent', () => {
  let component: ObservablesFriosComponent;
  let fixture: ComponentFixture<ObservablesFriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservablesFriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservablesFriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
