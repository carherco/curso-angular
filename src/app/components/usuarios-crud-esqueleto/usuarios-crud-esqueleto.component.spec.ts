import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCrudEsqueletoComponent } from './usuarios-crud-esqueleto.component';

describe('UsuariosCrudEsqueletoComponent', () => {
  let component: UsuariosCrudEsqueletoComponent;
  let fixture: ComponentFixture<UsuariosCrudEsqueletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosCrudEsqueletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCrudEsqueletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
