# TypeScript (Microsoft)

Desarrollado por Microsoft. 

Se compila para generar código ES6 (también llamado ES2015) o ES5 (diciembre 2009).

![Diagrama de TypeScript](img/typescript.png "Diagrama de TypeScript")


## Características de ES2015/ES6

### Template literals

- Multilínea
- Interpolación con sintaxis ${variable}
- Permiten parseo de cada parte de la cadena, tagged template literals

### let/const

- Alternativa a var para declarar variables
- Scope restringido al bloque

```javascript
      for (var i = 0; i < 10; i++) {
          // algo
      }
      console.log(i) // 10!

      for (let j = 0; j < 10; j++) {
          // algo
      }
      console.log(j) // j is not defined
```

- No podemos usar una variable antes de definirla

- Binding en cada iteración, nos permite crear funciones en bucles que utilicen variables dentro del for.

### Arrow functions

- Funciones expresadas de forma compactas

```javascript
  increment = function(x) {
        return x+1
  };

  increment = x => x+1;
```

- Con retorno implícito si sólo tienen 1 expresión (no hace falta el return ni las llaves)
- No hace faltan los paréntesis en los parámetros si sólo tienen 1 (si no, () => 1 o (a,b)=>a+b )
- No bindean this, por lo que es más fácil definir event handlers en el DOM.

### for … of

- Iteración mejorada (no recorre propiedades padre como for in)
- Funciona con todos los iterables (como strings)
- Combinable con destructuring

### Sintaxis corta de objetos

Forma breve de definir objetos que usar como nombre de la variable el nombre de la propiedad.

```javascript
    let name = 'Carlos';
    obj = {name: name} // antigua forma
    obj = {name} // nueva forma
```

### Rest y spread

Operadores (¡diferentes!) con la misma sintaxis: … (3 puntos seguidos)

Spread sirve para extraer valores de un array o un objeto:

```javascript
    log(...[1, 2, 3]); // uso de spread operator

    function log(a, b, c) {
        console.log(`first value is ${a}, second is ${b} and third ${c}`)
    };
```

Rest para la operación inversa, de elementos a array:

```javascript
    log(1, 2, 3); // uso de rest operator

    function log(... array) {
        console.log(array) // array [1, 2, 3]
    };
```

### Valores por defecto

En parámetros de una función

```javascript
    function ejemplo(valor = 1) {

    }
```

### Destructuring

Descomponer arrays y objetos a variables

```javascript
    let arr = [0, 1, 2];

    let [a, b, c] = arr;

    console.log(a, b, c) // 0, 1, 2
```

Se puede combinar con valores por defecto y operador rest.

```javascript
    let arr = [0, 1, 2];

    let [a, ...b] = arr;

    console.log(a, b) // 0, [1, 2]
```

```javascript
    let [a, b, c, d = 3] = arr;

    console.log(a, b, c, d) // 0, 1, 2, 3
```

También podemos usarlo para invertir variables

```javascript
    let a = 0;
    let b = 1;

    [b, a] = [a, b];

    console.log(a, b) // 1, 0
````

O para transformar parámetros de entrada de funciones

```javascript
    let arr = [0, 1];

    log(arr);

    function log([a, b]) {
        console.log(a, b)
    }
```

### Más características de ES2015/ES6

- Soporte para Maps & Sets
- Soporte nativo de promesas
- Async/await
- Módulos

### Clases

Soporte de:

- Herencia ( extends )
- Constructores ( constructor() {} )
- Métodos de instancia ( metodo() {} )
- Métodos estáticos ( static metodo() {} )
- Overrides de métodos a hijos ( super.metodo() )
- Llamadas a constructores padre ( super() )

```javascript
    class AppComponent {

    atributo;

    metodo() {
    }

    constructor() { }
    }
```

## Características de TypeScript

Diferencias de Typescript


### Tipos

boolean | number | string | arrays | enum (enumerados) | Any (cualquiera) | Void (ninguno) | Object

```javascript
      let cadena: string;
      cadena = 'Hola';
      cadena = 2: // ERROR!
```

Con tipado gradual. Podemos no escribir un tipo y el compilador intentará inferirlo y hacer comprobaciones en tiempo compilación.

Tipo any para saltarse las comprobaciones de tipos.

La sintaxis en arrays es

```javascript
    let array1: Array<number>;
    let array2: number[];
```

### Interfaces

No generan código en producción, sólo son comprobaciones en tiempo de ejecución

```javascript
    interface Talk {
        name: String;
    }

    let charla = {name: 'Rx'}; //implementación implícita

    class MyTalk implements Talk {
        name = 'Rx';
    }

    let charla2 = new MyTalk(); //implementación explícita
```

### Visibilidad

Public por defecto.

Constructores breves

```javascript
    constructor(public name: string) {}
```

Equivale a definir un atributo y fijar su valor:

```javascript
    public name: string;

    constructor(name) {
    this.name = name;
    }
```

### Tipos unión 

La propiedad solamente podrá tomar uno de los valores definidos.

```javascript
    pos: ‘North’ | ‘East’;
```

### Tipos función en interfaces

### Generics y constraints

### Mixins y merging


### Operador Elvis (NO es de Typescript, es sintaxis de templates de angular)

Previene errores al recorrer un objeto con valores nulos

```
    {{objeto?.propiedad?.valor}}
```
