import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationQueryStagerComponent } from './animation-query-stager.component';

describe('AnimationQueryStagerComponent', () => {
  let component: AnimationQueryStagerComponent;
  let fixture: ComponentFixture<AnimationQueryStagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationQueryStagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationQueryStagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
