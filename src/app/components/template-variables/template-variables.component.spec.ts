import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateVariablesComponent } from './template-variables.component';

describe('TemplateVariablesComponent', () => {
  let component: TemplateVariablesComponent;
  let fixture: ComponentFixture<TemplateVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
