import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedChildComponent } from './nested-child.component';

describe('NestedChildComponent', () => {
  let component: NestedChildComponent;
  let fixture: ComponentFixture<NestedChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
