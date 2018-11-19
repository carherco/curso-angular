import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesContainerComponent } from './heroes-container.component';

describe('HeroesContainerComponent', () => {
  let component: HeroesContainerComponent;
  let fixture: ComponentFixture<HeroesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
