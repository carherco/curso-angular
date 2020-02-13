import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbanValidatorExampleComponent } from './iban-validator-example.component';

describe('IbanValidatorExampleComponent', () => {
  let component: IbanValidatorExampleComponent;
  let fixture: ComponentFixture<IbanValidatorExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbanValidatorExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbanValidatorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
