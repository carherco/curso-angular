# Tests e2e con Protractor

## Instalar protactor

> npm install -g protractor

Comprobamos que se ha instalado:

> protractor --version

Con protractor se instalan dos comandos de consola: *protractor* y *webdriver-manager*.

El comando *webdriver-manager update* obtiene una instancia de Selenium

> webdriver-manager update

Y con *webdriver-manager start* encendemos un servidor de Selenium: 

> webdriver-manager start


2) Lanzar el comando ng e2e

> ng e2e



## Protractor utiliza Jasmine

Los tests e2e están en el directorio *e2e* del proyecto de angular. Los archivos tienen extensión *e2e-spec.ts*.

Protactor utiliza Jasmine por debajo, con lo que los test tienen la misma estructura:

```typescript
describe('protractor App', () => {
  //...

  beforeEach(() => {
    //...
  });

  it('should display welcome message', () => {
    //...
    expect(...);
  });
});
```

## Organizar los tests en Page Objects

Desde angular recomiendan crear Page Objects para organizar mejor los tests. Estos Page Objects residen en archivos con extensión .po.ts.

Ejemplo de un test e2e sin Page Object:


```typescript
import { browser, by, element } from 'protractor';

describe('protractor App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    browser.get('/');
    expect(element(by.css('app-root h1')).getText()).toEqual('Welcome to app!');
  });
});
```

Ejemplo de un test e2e con Page Objects:

```typescript
import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

```

```typescript
import { HomePage } from './app.po';

describe('protractor App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
```

## El objeto browser

**Browser** es una variable global creada por Protractor. Tiene métodos como **browser.get** que permiten navegar a una url de la aplicación.

## element y By

**Element** y **by** también son variables/funciones globales introducidas por Protactor. Permiten encontrar elementos en la página HTML.

La función *element()* toma un parámetro de entrada, un **Locator**, que describe cómo encontrar el elemento. El objeto *by* crea Loctators. Ejemplos de Locators:

- by.id('calc'): encuentra el elemento con *id="calc"*.
- by.css('.myclass'): Encuentra elementos utilizando selectores de css

http://www.protractortest.org/#/api?view=ProtractorBy

```typescript
describe('Protractor Demo App', function() {
  it('should add one and two', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.id('varA')).sendKeys(1);
    element(by.id('varB')).sendKeys(2);

    element(by.id('calc')).click();

    expect(element(by.id('result')).getText()).
        toEqual('5'); // This is wrong!
  });
});
```

La función *element()* devuelve un objeto **ElementFinder**. El ElementFinder sabe como localizar el elemento del DOM utilizando el Locator que se le ha proporcionado, pero no realiza la búsqueda hasta que no se realiza alguna acción sobre el ElementFinder. Los métodos de acción más comunes son:

```javascript
var el = element(locator);

// Click on the element.
el.click();

// Send keys to the element (usually an input).
el.sendKeys('my text');

// Clear the text in an element (usually an input).
el.clear();

// Get the value of an attribute, for example, get the value of an input.
el.getAttribute('value');
```

Todas las acciones son asíncronas y devuelven una promesa. Son wrappers de los que dispone Selenium.

```javascript
var el = element(locator);
el.getText().then(function(text) {
  console.log(text);
});
```

### element.all

Element.all() funciona de forma similar a element() pero devuelve un array de objetos ElementFinder

```javascript
element.all(by.css('.selector')).then(function(elements) {
  // elements is an array of ElementFinders.
});
```

Element.all() tiene helpers bastante útiles

```javascript
// Number of elements.
element.all(locator).count();

// Get by index (starting at 0).
element.all(locator).get(index);

// First and last.
element.all(locator).first();
element.all(locator).last();
```

Element y element.all se pueden encadenar:

```javascript
element.all(by.css('some-css')).first().element(by.tagName('tag-within-css'));
element.all(by.css('some-css')).get(index).element(by.tagName('tag-within-css'));
element.all(by.css('some-css')).first().all(by.tagName('tag-within-css'));
```


## El explorador de elementos

Se puede lanzar protactor en modo explorador de elementos / debug con el modificador --element-explorer:

> ng e2e --element-explorer















