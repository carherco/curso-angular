import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  size = 9;
  registerForm!: FormGroup;
  mapForm!: Map<string, number>;

  constructor(private fb: FormBuilder, private db: DbService) { }

  createForm() {
    this.registerForm = this.fb.group({
      role: ['voluntario'],
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],

      DNI: [''], /*DNI number */
      NUSS: [''], /*Social Security Number*/
      AD: [''], /*Associated Disorders*/
      DLevel: [''], /* Nivel de discapacidad */
      Tutor: [''], /*Tutor o Tutora*/
      Asociacion: [''], /*Asociacion*/
      JS: [''], /*Situación Jurídica*/
      TRecurso: [''], /*Tipo de recurso al que asiste*/

      // Rasgos
      Alegre: [''], /*Numero de enteros*/
      Activo: [''],
      Timido: [''],
      Depresivo: [''],
      Pasivo: [''],
      Desobediente: [''],
      TomaIniciativas: [''],
      Triste: [''],
      Nervioso: [''],
      Perezoso: [''],
      Grosero: [''],
      Hablador: [''],
      Carinyoso: [''],
      ToleraFrustracion: [''],
      Distraido: [''],
      Lloron: [''],
      Rencoroso: [''],
      Mentiroso: [''],
      Caprichoso: [''],
      Desordenado: [''],
      CambiosEmocionales: [''],
      Observations: [''], // Campo de texto de longitud variable
      Angry: [''], // Campo de texto--> Lo que le pone nervioso
      Calm: [''], // Campo de texto --> Lo que le calma
      // Familiares: this.familiaresControl
      // Tutor: this.fb.group({
      //   name: '',
      //   apeellido: ''
      // })

    }, {validator: this.passwordMatchValidator});

    this.mapForm = new Map();
    this.mapForm.set('role', 1);
    this.mapForm.set('gender', 1);
    this.mapForm.set('username', 1);

    this.mapForm.set('DNI', 2);
    this.mapForm.set('ANUSS', 2);
    this.mapForm.set('AD', 2);

    this.mapForm.set('Alegre', 3);
    this.mapForm.set('Activo', 3);
    this.mapForm.set('Timido', 3);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  getForm(): FormGroup {
    return this.registerForm;
  }

  getMap(): Map<string, number> {
    return this.mapForm;
  }

  getPage(pageId) {

  }

  save(value) {
    localStorage.setItem('registerForm', JSON.stringify(value)); // Límite de "about 5MB"
    // this.db.add(value);
  }
}


// Paginado no si no se permite al usuario cambiar de página libremente, mejor un stepper.
// https://material.angular.io/components/stepper/overview

// Controlar con un servicio el estado del formulario y guardar en IndexedDB
//  - Calcular número de páginas
//  - Ir cambiando de página
//  - Guardar respuestas en localStorage o en IndexedDB en cada cambio de página por si le dan a F5
//  - No permitir cambiar de página si no se dan las condiciones...

// https://angular.io/api/forms/FormGroup
