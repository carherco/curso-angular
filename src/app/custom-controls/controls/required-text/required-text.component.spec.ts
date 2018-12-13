import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredTextComponent } from './required-text.component';

describe('RequiredTextComponent', () => {
  let component: RequiredTextComponent;
  let fixture: ComponentFixture<RequiredTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
