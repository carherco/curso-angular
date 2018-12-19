import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomControlsComponent } from './custom-controls.component';

describe('CustomControlsComponent', () => {
  let component: CustomControlsComponent;
  let fixture: ComponentFixture<CustomControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
