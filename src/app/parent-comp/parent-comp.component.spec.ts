import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCompComponent } from './parent-comp.component';

describe('ParentCompComponent', () => {
  let component: ParentCompComponent;
  let fixture: ComponentFixture<ParentCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
