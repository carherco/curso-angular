import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxHeroesEditPresenterComponent } from './redux-heroes-edit-presenter.component';

describe('ReduxHeroesEditPresenterComponent', () => {
  let component: ReduxHeroesEditPresenterComponent;
  let fixture: ComponentFixture<ReduxHeroesEditPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxHeroesEditPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxHeroesEditPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
