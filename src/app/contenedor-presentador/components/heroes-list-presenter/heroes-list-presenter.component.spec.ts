import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListPresenterComponent } from './heroes-list-presenter.component';

describe('HeroesListPresenterComponent', () => {
  let component: HeroesListPresenterComponent;
  let fixture: ComponentFixture<HeroesListPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesListPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
