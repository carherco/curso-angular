import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMenuComponent } from './private-menu.component';

describe('PrivateMenuComponent', () => {
  let component: PrivateMenuComponent;
  let fixture: ComponentFixture<PrivateMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
