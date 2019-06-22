import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PovidersListComponent } from './poviders-list.component';

describe('PovidersListComponent', () => {
  let component: PovidersListComponent;
  let fixture: ComponentFixture<PovidersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PovidersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PovidersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
