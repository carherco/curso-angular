import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentsExampleComponent } from './dynamic-components-example.component';

describe('DynamicComponentsExampleComponent', () => {
  let component: DynamicComponentsExampleComponent;
  let fixture: ComponentFixture<DynamicComponentsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicComponentsExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponentsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
