# Testing

## Herramientas y tecnologías

- Jasmine: 
- Angular testing utilities
- Karma
- Protactor

## Jasmine (versión 2.4)

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
  beforeEach(() => {  
    TestBed.configureTestingModule({
      declarations: [ GaleriaComponent ], // declare the test component
    });

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















You should write isolated unit tests for pipes and services.

Pero para comonentes, Such tests require the Angular testing utilities. The Angular testing utilities include the TestBed class and several helper functions from @angular/core/testing. 

Vamos primero a probar que nuestro entorno de testeo funciona.


Tests written in Jasmine are called specs . The filename extension must be .spec.ts,


> ng test




Configurar jenkins con karma:

https://karma-runner.github.io/1.0/plus/jenkins.html
