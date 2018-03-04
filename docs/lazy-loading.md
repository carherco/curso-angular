# Separar la aplicación en módulos


```
ng g m Admin  --routing
installing module
  create src/app/admin/admin-routing.module.ts
  create src/app/admin/admin.module.ts
```

En admin.module.ts

```typescript
@NgModule({
  declarations: [
    AdminListComponent,
    AdminEditComponent,
    AdminAddComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports:[
    AdminHomeComponent
  ]
  declarations: []
})
export class AdminModule { }
```
Hace falta CommonModule, pero no BrowserModule. BrowserModule solamente es necesario en el raíz

En admin-routing.module.ts

```typescript
const routes: Routes = [
  {path: '', component: AdminHomeComponent},
  {path: 'users/list', component: UsersListComponent},
  {path: 'users/edit/:id', component: UsersEditComponent},
  {path: 'users/new', component: UsersAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
```

Y en nuestro módulo raíz

```typescript
@NgModule({
  imports: [
    ...
    AdminModule
    ...
  ],
})
export class AppModule { }
```

Y en el routing padre

```typescript
{
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
},
```

Ahora ya podemos en cualquier lugar de nuestro módulo raíz, llamar a la ruta "/admin" o al componente lt;&app-adminhomecomponent>lt;&/app-adminhomecomponent>

Por ejemplo, en app.component.html añadimos un enlace al componente exportado (AdminHomeComponent)

```typescript
<li><a class="nav-link" routerLink="/admin" routerLinkActive="active">Admin Home</a></li>
```



Nota: Angular-cli integra por defecto los componentes las directivas y las pipes que genera en app.module.ts. Si queremos que estén integrados en otro módulo distinto, debemos ejecutar el comando de la siguiente manera:

> ng g component nombre-modulo/nombre-componente

o bien 

> ng g component nombre-componente --module=nombre-modulo


# Lazy loading

## Lazy loading bajo demanda:

Para activar lazy loading en un path necesitamos:
- Cargar un módulo en el path del routing padre
- Definir una ruta por defecto en el módulo hijo
- Configurar el routerModule del módulo lazy con .forChild()
- NO incluir el módulo lazy en el módulo raíz


## Lazy loading con preloading

La librería de routing ofrece dos estrategias de preloading:

- No preloading (por defecto). Los módulos se cargan bajo demanda.
- Preloading de TODOS los módulos.

Vamos a crear unos cuantos módulos y componentes 

```
ng g m lazy1
ng g m lazy2
ng g m lazy3
ng g m lazy4
ng g m lazy5
ng g c lazy1 --module=lazy1
ng g c lazy2 --module=lazy2
ng g c lazy3 --module=lazy3
ng g c lazy4 --module=lazy4
ng g c lazy5 --module=lazy5
```

Y a configurar el routing

```typescript
{ path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
{ path: 'lazy1', loadChildren: 'app/lazy1/lazy1.module#Lazy1Module'},
{ path: 'lazy2', loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'},
{ path: 'lazy3', loadChildren: 'app/lazy3/lazy3.module#Lazy3Module'},
{ path: 'lazy4', loadChildren: 'app/lazy4/lazy4.module#Lazy4Module'},
{ path: 'lazy5', loadChildren: 'app/lazy5/lazy5.module#Lazy5Module'},
```


Para activar el preloading basta configurar el método .forRoot() con la propiedad *preloadingStrategy*:

```typescript
RouterModule.forRoot(
  appRoutes,
  {
    enableTracing: true, // <-- debugging purposes only
    preloadingStrategy: PreloadAllModules
  }
)
```

Si recargamos la aplicación, veremos cómo empiezan a descargarse los módulos de forma lazy justo inmediatamente después de que el componente actual haya sido renderizado completamente en la pantalla.

> Ejercicio: Crear un guard de tipo canLoad que impida cargar uno de los módulos lazy



## Custom preloading

También es posible también programar estrategias de preloading personalizadas.

Para este ejemplo, vamos a poner una propiedad preload en el data de las rutas de un par de módulos:

```typescript
{ path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', data: { preload: true } },
{ path: 'lazy1', loadChildren: 'app/lazy1/lazy1.module#Lazy1Module'},
{ path: 'lazy2', loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'},
{ path: 'lazy3', loadChildren: 'app/lazy3/lazy3.module#Lazy3Module'},
{ path: 'lazy4', loadChildren: 'app/lazy4/lazy4.module#Lazy4Module', data: { preload: true } },
{ path: 'lazy5', loadChildren: 'app/lazy5/lazy5.module#Lazy5Module'},
```

Y vamos a crear un servicio que implemente un preloading selectivo:

> ng g s selective-preloading-strategy --module=app-routing

Debemos implementar el interfaz PreloadingStrategy, que nos obliga a implementar la función preload().

```typescript
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {

      console.log('Preloaded: ' + route.path);
      return load();

    } else {
      return Observable.of(null);
    }
  }
}
```

En este ejemplo, solo se cargarán los módulos que tengan una propiedad preload con valor true.

Ahora cambiamos el preloadingStrategy del módulo de routing por el nuestro.

```typescript
@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{
    enableTracing: false,
    preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule { }
```

¡¡No hay que olvidarse de proveer el servicio!!



https://angular.io/guide/router#preloading-background-loading-of-feature-areas

https://angular.io/guide/router#custom-preloading

[Índice](index.md)
