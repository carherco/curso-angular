import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { GaleriaComponent } from './galeria.component';

describe('GaleriaComponent', () => {
  let component: GaleriaComponent;
  let fixture: ComponentFixture<GaleriaComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('El title tiene que ser Galería', () => {
    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toContain('Galería');
    expect(el.textContent).toContain(component.title);
  });

  it('Si cambio el title, cambia el h1', () => {
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    component.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

  it('Hay 7 imágenes en la galería', () => {
    expect(component.imagenes.length).toEqual(7);
  });

});
