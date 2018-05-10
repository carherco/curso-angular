# Testing

## Herramientas y tecnologías

- Jasmine: 
- Angular testing utilities
- Karma
- Protactor

## Jasmine (versión 2.4)

Jasmine es un framework de testeo para javascript.

No depende de otras librerías ni frameworks. Tampoco necesita un DOM.

### Suites (describe)

Una **test suite** consiste en una función **describe**, la cual recibe dos parámetros: una cadena de texto -el nombre/descripción de la suit- y una función. La función define un bloque de código que implementa la suite.

```js
describe("Una suite es una función", function() {
  //...
  });
});

describe("En un archivo .spec.ts puede haber más de una suite.", function() {
  //...
  });
});
```

### Specs (it)

Una **spec** consiste en una función **it** que recibe de nuevo dos parámetros: una string -el nombre/descripción de la spec- y la función con el código de la spec.


```js
describe("Una suite es una función", function() {
  //...

  it("esto es una spec", function() {
    //...
  });

  it("esto es otra spec", function() {
    //...
  });
});
```

### Expectations (expect)

Las **expectations** se construyen con la función **expect** que recibe un valor, llamado **actual value**. La función se encadena con una **Matcher function**, que recibe un valor llamado **expected value**.

```js
it("esto es una spec", function() {
    a = true;
    expect(a).toBe(true);
  });
```

Cada *matcher* implementa una comparación booleana entre el *actual value* y el *expected value*. El matcher es responsable de reportar a Jasmine si la expectation es *true* o *false*, provocando un *pass* o un *fail* de la spec.

Existe el "operador" not, que se encadena a cualquier matcher para negar la expectation.

```js
it("and can have a negative case", function() {
  expect(false).not.toBe(true);
});
```

Los matchers disponibles son:
- toBe
- toEqual
- toMatch
- toBeDefined
- toBeUndefined
- toBeNull
- toBeTruthy
- toBeFalsy
- toContain
- toBeLessThan
- toBeGreaterThan
- toBeCloseTo
- toThrow
- toThrowError

https://jasmine.github.io/2.4/introduction.html

Todos los matchers adminten un segundo parámetro de tipo string que es el mensaje que Jasmine mostrará si la expectation no se cumple.

```js
it("esto es una spec", function() {
    a = true;
    expect(a).toBe(true,'mensaje si falla');
  });
```

Esto permite localizar rápidamente la expectation fallida.

### Setup y Teardown

Para el setup y el teardown, Jasmine nos proporciona las siguientes 4 funciones autoexplicativas:

 - beforeEach
 - afterEach
 - beforeAll
 - afterAll

```js
describe("A spec using beforeEach and afterEach", function() {
  //...

  beforeAll(function() {
    //...
  });

  afterAll(function() {
    //...
  });

  beforeEach(function() {
    //...
  });

  afterEach(function() {
    //...
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
});
```

### Anidar suites

Se pueden anidar funciones describe.

### xdescribe y xit

Las suites declaradas con xdescribe y las specs declaradas con xit no son ejecutadas por Jasmine y aparecen como pendientes.

https://jasmine.github.io/2.4/introduction.html

## Karma

Karma es un *test runner* desarrollado por el equipo de Angular. Funciona con Jasmine, Mocka o QUnit.

Se integra fácilmente con herramientas de integración contínua como Jenckins, Travis o Semaphore.

Para ejectuar los tests, basta con utilizar el comando de angular cli *ng test*:

> ng test

Para integrar Karma con Jenkins hay que seguir las instrucciones que hay en la misma web de Karma:

https://karma-runner.github.io/1.0/plus/jenkins.html



## Testeo de componentes

Angular proporciona algunas herramientas muy útiles para el testeo:

- TestBed: Crea un módulo de angular para el testeo, en el que podemos configurar un entorno con lo mínimo necesario para el test utilizando los mismos atributos de metadatos que @ngModule (declarations, providers...).
- Component Fixture: un manejador del entorno del test. Proporciona acceso a la instancia del componente y al DebugElement.
- DebugElement: Es un manejador del HTML DOM del componente.



```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { GaleriaComponent } from './galeria.component';

describe('GaleriaComponent (inline template)', () => {

  let comp:    GaleriaComponent;
  let fixture: ComponentFixture<GaleriaComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  // Creamos un módulo nuevo para cada spec
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaComponent ], // declare the test component
    }).compileComponents();  // compile template and css;

    fixture = TestBed.createComponent(GaleriaComponent);

    comp = fixture.componentInstance; // GaleriaComponent test instance

  });

  it('should display original title', () => {
    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

});
```

El método compileComponents de TestBed.configureTestingModule compila de forma asíncrona los componentes configurados en el módulo de testing.

Por tanto, para llamar al método necesitamos añadir async en el beforeEach.




### detectChanges

En producción y en desarrollo, la detección de cambio se produce automáticamente cuando Angular crea un componente o el usuario pulsa una tecla cuando se completa alguna operación asíncrona... 

Pero en los tests, no. Esto está hecho así de manera intencionada, para que el tester tenga la posibilidad de acceder al componente antes y después de que se produzcan cambios.

Cada vez que se invoque a fixture.detectChanges() se ejecutará la detección de cambios.

Sin embargo, algunos testers prefieren que el entorno de tests de Angular ejecute automáticamente la detección de cambios. Esto es posible configurando el TestBed con el provider ComponentFixtureAutoDetect.

```typescript
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
```

```typescript
TestBed.configureTestingModule({
  declarations: [ GaleriaComponent ],
  providers: [
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
})
```

Pero el ComponentFixtureAutoDetect service tiene una limitación: Responde a actividades asíncronas (observables, promesas), timers  y DOM events pero no a cambios directos en propiedades del componente.

```typescript
it('should display original title', () => {
  // Hooray! No `fixture.detectChanges()` needed
  expect(el.textContent).toContain(comp.title);
});

it('should still see original title after comp.title change', () => {
  const oldTitle = comp.title;
  comp.title = 'Test Title';
  // Displayed title is old because Angular didn't hear the change :(
  expect(el.textContent).toContain(oldTitle);
});

it('should display updated title after detectChanges', () => {
  comp.title = 'Test Title';
  fixture.detectChanges(); // detect changes explicitly
  expect(el.textContent).toContain(comp.title);
});
```

## Testeo de componentes con dependencias

Si nuestro componente tiene dependencias de servicios, las declararemos en la sección providers.

Lo ideal es que los servicios declarados fueran dobles (Mocks, Stubs...)

```typescript
TestBed.configureTestingModule({
   declarations: [ CrudComponent ],
// providers:    [ UserService ]  // NO! Don't provide the real service!
                                  // Provide a test-double instead
   providers:    [ {provide: HeroeService, useValue: MockHeroeService } ]
});
```

Ejemplo: 

```typescript
beforeEach(async(() => {
  // stub UserService for test purposes
  userServiceStub = {
    isLoggedIn: true,
    user: { name: 'Test User'}
  };

  TestBed.configureTestingModule({
     declarations: [ WelcomeComponent ],
     providers:    [ {provide: UserService, useValue: userServiceStub } ]
  }).compileComponents();

  fixture = TestBed.createComponent(WelcomeComponent);
  comp    = fixture.componentInstance;

  // UserService from the root injector
  userService = TestBed.get(UserService);
  // Otra forma de inyectar el servicio
  // userService = fixture.debugElement.injector.get(UserService);

  //  get the "welcome" element by CSS selector (e.g., by class name)
  de = fixture.debugElement.query(By.css('.welcome'));
  el = de.nativeElement;
});
```

```typescript
it('should welcome the user', () => {
  fixture.detectChanges();
  const content = el.textContent;
  expect(content).toContain('Welcome', '"Welcome ..."');
  expect(content).toContain('Test User', 'expected name');
});

it('should welcome "Bubba"', () => {
  userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
  fixture.detectChanges();
  expect(el.textContent).toContain('Bubba');
});

it('should request login if not logged in', () => {
  userService.isLoggedIn = false; // welcome message hasn't been shown yet
  fixture.detectChanges();
  const content = el.textContent;
  expect(content).not.toContain('Welcome', 'not welcomed');
  expect(content).toMatch(/log in/i, '"log in"');
});
```

## Testeo de servicios

Para testear un servicio, crearemos un módulo de testing en el que proveeremos el servicio, para poder inyectarlo en los tests.

```typescript
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
```

Gracias a la inyección de dependencias ya podemos testear los métodos del servicio, sus propiedades, etc.


```typescript
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  afterEach(() => {
    localStorage.removeItem('user_token');
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('isLogged() returns true when user logged', inject([AuthService], (service: AuthService) => {
    localStorage.setItem('user_token', '1234');
    expect(service.isLogged()).toBeTruthy();
  }));

  it('isLogged() returns false when user logged', inject([AuthService], (service: AuthService) => {
    expect(service.isLogged()).toBeFalsy();
  }));
});
```

## Testeo de pipes

Las pipes son los elementos más fáciles de testear en Angular. Al ser una clase con un método, la forma de testearla es como si fuera una clase normal y corriente.

```typescript
describe('Testeando una pipe', () => {
  let pipe: MiPipe;

  beforeEach(() => {
    pipe = new MiPipe();
  });

  it('Al aplicarla a X devuelve Y', () => {
    expect(pipe.transform('X')).toBe('Y');
  });

  it('Al aplicarla a J devuelve K', () => {
    expect(pipe.transform('J')).toBe('K');
  });
});
```






Configurar jenkins con karma:

https://karma-runner.github.io/1.0/plus/jenkins.html
