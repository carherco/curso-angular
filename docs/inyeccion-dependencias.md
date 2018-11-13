# Inyección de dependencias

La inyección de dependencias es un patrón de diseño orientado a objetos, en el que se suministran objetos a una clase en lugar de ser la propia clase la que cree el objeto. También se conoce como IoC (Inversion of Control).

Veamoslo en un ejemplo. Pongamos que tenemos una clase HeroService que para instanciarla necesita recibir en el constructor un objeto Http.

```typescript
export class HeroService {
  constructor (private http: Http) {}
}
```

Http es una clase que para instanciarla necesita 2 objetos.

```typescript
export class Http {
    protected _backend: ConnectionBackend;
    protected _defaultOptions: RequestOptions;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions);
```

## Método tradicional

Sin el patrón de inyección de dependencias, si quiero una instancia de HeroService tengo que hacer lo siguiente:

```typescript
export class CrudBasicoComponent implements OnInit {

  private heroService;

  constructor() {
      backend = new ConnectionBackend();
      options = new RequestOptions();
      http = new Http(backend, options);
      this.heroService = new HeroService(http);
  }
```

Problemas de esto:
- Hacen falta demasiadas líneas de programación simplemente para instanciar un único objeto. 
- Hace falta conocimiento de las clases y de los constructores para poder instanciarlas todas.
- Si modifico el constructor de HeroService (para añadir otro parámetro, o para cambiarlo por otro...) tengo que revisar TODA la aplicación para cambiar todos los new HeroService() que tenga.

## Con inyección de dependencias

Si se utiliza el patrón de inyección de dependencias, es el *sistema* el que se encarga de suministrar los objetos correspondientes a cada clase.

Simplemente tipando en el constructor el tipo de cada variable, Angular se encargará de instanciar todas clases que sean necesarias

```typescript
export class CrudBasicoComponent implements OnInit {

  private heroService;

  constructor(heroService: HeroService) {
      this.heroService = heroService;
  }
```

O con la forma abreviada

```typescript
export class CrudBasicoComponent implements OnInit {

  constructor(private heroService: HeroService) {
  }
```

Con este patrón, desparecen todos los problemas mencionados anteriormente.

https://angular.io/guide/dependency-injection

[Índice](index.md)
