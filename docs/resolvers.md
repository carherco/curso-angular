# Resolvers

Los resolvers son servicios pensados para ser proveedores de datos.

> ng g resolver user

```ts
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<any> {
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    // TODO: Implement code
  }
}
```

Esta clase debe implementar el interfaz Resolve

```ts
interface Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T
}
```

El propósito de un resolver es conseguir información ANTES de que la ruta sea activada.

El router llamará al método resolve() y esperará a que los datos hayan sido resueltos/provistos antes de proceder a activar la ruta.

```ts
const routes: Routes = [
  // ...
  { path: 'form-template/:userId', component: FormTemplateComponent, resolve: {user: UserResolver, otherData: AnotherResolver} },
  // ...
```

```diff
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  
+  constructor(private service: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {
+    return this.service.getOne(route.paramMap.get('userId'));
  }
}
```

Ahora nuestro componente puede coger los datos directamente del ActivatedRoute.

```diff
constructor(private route: ActivatedRoute){
+  this.user = this.route.snapshot.data['user'];
-  const id = this.route.snapshot.paramMap.get('userId');
-  this.userService.getOne(+id!).subscribe(
-    user => this.user = user
-  );
}
````


Si un resolver devuelve null, el router cancelará la navegación.

Si se produce un error, el router también cancelará la navegación.

Si una ruta tiene resolvers y tiene guards, primero se ejecutan los guards.
