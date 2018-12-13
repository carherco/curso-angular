import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredTextValidator } from './required-text-validator.component';

xdescribe('RequiredTextComponent', () => {
  let component: RequiredTextValidator;
  let fixture: ComponentFixture<RequiredTextValidator>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredTextValidator ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredTextValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
