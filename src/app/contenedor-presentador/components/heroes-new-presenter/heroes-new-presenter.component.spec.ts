import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesNewPresenterComponent } from './heroes-new-presenter.component';

describe('HeroesNewPresenterComponent', () => {
  let component: HeroesNewPresenterComponent;
  let fixture: ComponentFixture<HeroesNewPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesNewPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesNewPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
