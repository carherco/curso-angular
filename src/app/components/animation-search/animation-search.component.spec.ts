import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationSearchComponent } from './animation-search.component';

describe('AnimationSearchComponent', () => {
  let component: AnimationSearchComponent;
  let fixture: ComponentFixture<AnimationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
