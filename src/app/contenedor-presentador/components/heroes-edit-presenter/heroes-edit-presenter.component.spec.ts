import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesEditPresenterComponent } from './heroes-edit-presenter.component';

describe('HeroesEditPresenterComponent', () => {
  let component: HeroesEditPresenterComponent;
  let fixture: ComponentFixture<HeroesEditPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesEditPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesEditPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
