import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsLoaderComponent } from './ads-loader.component';

describe('AdsLoaderComponent', () => {
  let component: AdsLoaderComponent;
  let fixture: ComponentFixture<AdsLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
