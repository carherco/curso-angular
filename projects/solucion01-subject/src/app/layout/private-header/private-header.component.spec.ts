import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateHeaderComponent } from './private-header.component';

describe('PrivateHeaderComponent', () => {
  let component: PrivateHeaderComponent;
  let fixture: ComponentFixture<PrivateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
