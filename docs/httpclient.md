# HTTPClient

Se trata de un servicio que podemos inyectar en nuestros componentes y servicios
para realizar peticiones HTTP. Está especialmente pensado para el uso de API's 
REST.

Para utilizar este servicio hemos de importar el módulo `HttpClientModule`.

```javascript
import { HttpClientModule } from '@angular/common/http';
```

Si queremos tenerlo disponible en toda la aplicación realizaremos la importación en
el módulo principal `AppModule`.

El servicio `HttpClient` se importa donde lo necesitemos de la siguiente manera:

```javascript
import { HttpClient } from '@angular/common/http';
```

Y lo inyectamos por un constructor del componente o servicio:

```javascript
constructor(private http: HttpClient){}
```

El servicio permite realizar todos los tipo de peticiones HTTP (GET, POST, PUT, DELETE, 
HEAD, PATCH, ...) de manera asíncrona utilizando observables. En efecto cada uno de los
método siguientes devuelve un observable al que podemos subscribirnos para obtener/enviar
datos a la API REST:

```javascript
http.get('http://la.url')
http.put('http://la.url/4', data)
http.post('http://la.url', data)
http.delete('http://la.url/4')
```

Normalmente, cuando usamos una API REST, hay que enviar ciertos headers. Un header típico es
el `Content-Type: application/json`. El servicio `HttpClient` admite headers que se definen
de la siguiente manera:

```javascript
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"      
    })
  };

http.get('http://la.url', httpOptions)
http.put('http://la.url/4', data, httpOptions)
http.post('http://la.url', data,httpOptions)
http.delete('http://la.url/4', httpOptions)
```

En  lugar de usar `HttpClient` directamente en un componente, es aconsejable crear un servicio
que dependa de `HttpClient` para realizar las operaciones sobre la API y usarlo en el 
componente que lo requiera. La idea, como siempre, es ocultar en el servicio los detalles de implementación, 
que pueden llegar a ser muy farragosos, y construir componentes fáciles de leer
y mantener. Además se gana en reutilización.

## Ejercicio: 

Programar un CRUD de usuarios con las siguientes especificaciones:

- Una clase User con la definición de nuestro modelo
- Un componente para el listado: UserList
- Un componente para editar usuarios: UserEdit
- Un componente para añadir usuarios: UserAdd
- Un servicio UserService con los métodos:
  - getAll()
  - getOne(id: number)
  - edit(id: number, user: User)
  - add(user: User)
  - delete(id: number)

- Los componetes NO utilizarán directamente el servicio HttpClient


[Índice](index.md)
