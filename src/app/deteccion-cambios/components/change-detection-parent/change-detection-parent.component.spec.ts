import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionParentComponent } from './change-detection-parent.component';

describe('ChangeDetectionParentComponent', () => {
  let component: ChangeDetectionParentComponent;
  let fixture: ComponentFixture<ChangeDetectionParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDetectionParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDetectionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
