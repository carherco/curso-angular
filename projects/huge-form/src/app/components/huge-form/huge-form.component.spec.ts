import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HugeFormComponent } from './huge-form.component';

describe('HugeFormComponent', () => {
  let component: HugeFormComponent;
  let fixture: ComponentFixture<HugeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HugeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HugeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
