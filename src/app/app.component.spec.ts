import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Curso de angular'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Curso de angular');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Curso de angular');
  }));

  it('should display a different test title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.title = 'Test Title';
    fixture.detectChanges();
    // query for the title <h1> by CSS element selector
    let de = fixture.debugElement.query(By.css('h1'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Test Title');
  });
});
