import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { HighlightDirective } from './highlight.directive';
import { By } from "@angular/platform-browser";

@Component({
  template: `
  <h2 appHighlight="yellow">Something Yellow</h2>
  <h2 appHighlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>`
})
class TestComponent { }

describe('TestComponent', () => {
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
  xit('should have 0 highlighted elements', () => {
    expect(this.des.length).toBe(0);
  });

  it('should color 1st <h2> background "yellow"', () => {
    this.des[0].triggerEventHandler('mouseover', null);
    this.fixture.detectChanges();
    const bgColor = this.des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    const dir = this.des[1].injector.get(HighlightDirective) as HighlightDirective;
    this.des[1].triggerEventHandler('mouseover', null);
    this.fixture.detectChanges();
    const bgColor = this.des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('hovering over input', () => {
    this.des[0].triggerEventHandler('mouseover', null);
    this.fixture.detectChanges();
    expect(this.des[0].nativeElement.style.backgroundColor).toBe('blue');

    this.des[0].triggerEventHandler('mouseout', null);
    this.fixture.detectChanges();
    console.log(this.des[0].nativeElement.style.backgroundColor);
    expect(this.des[0].nativeElement.style.backgroundColor).toBe('inherit');
});

});
