import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { HighlightDirective } from './highlight.directive';
import { By } from "@angular/platform-browser";

@Component({
  template: `
  <h2 appHighlight="'red'">Something Red</h2>
  <h2 appHighlight>The Default (yellow)</h2>
  <h2>No Highlight</h2>`
})
class TestComponent { }

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture:   ComponentFixture<TestComponent>;
  let des:       DebugElement;
  let elH2:      HTMLElement;

  beforeEach(() => {
    this.fixture = TestBed.configureTestingModule({
      declarations: [ HighlightDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    this.fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    this.des = this.fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // the h2 without the HighlightDirective
    this.elH2 = this.fixture.debugElement.query(By.css('h2:not([appHighlight])'));
  });

  // color tests
  it('should have 2 highlighted elements', () => {
    expect(this.des.length).toBe(2);
  });

  it('should color 1st <h2> background be "red" on mouse enter', () => {
    this.des[0].triggerEventHandler('mouseenter', null);
    this.fixture.detectChanges();
    const bgColor = this.des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('red');
  });

  it('should color 2nd <h2> background w/ default color on mouse enter', () => {
    const dir = this.des[1].injector.get(HighlightDirective) as HighlightDirective;
    this.des[1].triggerEventHandler('mouseenter', null);
    this.fixture.detectChanges();
    const bgColor = this.des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('mouseleave', () => {
    this.des[0].triggerEventHandler('mouseenter', null);
    this.fixture.detectChanges();
    expect(this.des[0].nativeElement.style.backgroundColor).toBe('red');

    this.des[0].triggerEventHandler('mouseleave', null);
    this.fixture.detectChanges();
    expect(this.des[0].nativeElement.style.backgroundColor).toBe('');
  });

});
