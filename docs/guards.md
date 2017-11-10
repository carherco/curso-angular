# Guards

Cuando vimos el routing introdujimos los Guards. Eran los elementos que iban a decidir si podíamos o no entrar en una ruta o salir de ella.

## Tipos de guards

Hay 4 tipos de Guards diferentes que se pueden utilizar para proteger nuestras rutas:

- **CanActivate:** Decide si una ruta puede ser activada.
- **CanActivateChild:** Decide si las rutas hijas de una ruta pueden ser activadas.
- **CanDeactivate:** Decide si una ruta puede ser desactivada.
- **CanLoad:** Decide si un módulo puede ser cargado de forma lazy.

Vamos a ver un ejemplo de una configuración de rutas con Guards:

```typescript
const appRoutes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", redirectTo: "auth", pathMatch: "full"},
    {path: "expired", component: TrialExpiredComponent, canActivate: [AuthenticatedGuard]},
    {path: "auth/invite", component: InviteComponent, canActivate: [AuthenticatedGuard, AdminGuard]},
    {path: "company", component: CompanyPickerComponent, canActivate: [AuthenticatedGuard, CompanyPickerGuard]},
    {path: "auth", component: AuthComponent, canActivate: [AuthenticatedGuard, AuthComponentGuard], 
    canActivateChild: [AlwaysAuthChildrenGuard],
        children: [
            {path: "", redirectTo: "ts", pathMatch: "full"},
            {path: "ts", component: TimesheetComponent, canActivate: [TimesheetAccessGuard]},
            {path: "projects", component: ProjectsComponent, canActivate: [AdminGuard], canDeactivate: [ConfirmDeactivateGuard]}
        ]
    },
    {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuard]}
];
```

Un guard debe devolver un booleano o un Observable/Promesa que se resuelva con un booleano.

## CanActivate

```typescript
  import { Injectable } from '@angular/core';
  import { CanActivate } from '@angular/router';
  import { AuthService } from './auth.service';

  @Injectable()
  export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    canActivate() {
      return this.authService.isLoggedIn();
    }
  }
```

```typescript
  @NgModule({
    ...
    providers: [
      AuthService,
      CanActivateViaAuthGuard
    ]
  })
  export class AppModule {}
```

```typescript
  { 
    path: '',
    component: SomeComponent,
    canActivate: [
      CanActivateViaAuthGuard,
      OtroGuard
    ]
  }
```

## CanDeactivate

CanDeactivate nos da la oportunidad de decidir si queremos navegar **fuera** de la ruta.

CanDeactivate tiene acceso a la instancia del componente activo.

```typescript
  import { CanDeactivate } from '@angular/router';
  import { CanDeactivateComponent } from './app/can-deactivate';

  export class ConfirmDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {

    canDeactivate(target: CanDeactivateComponent) {
      if(target.hasChanges()){
          return window.confirm('Do you really want to cancel?');
      }
      return true;
    }
  }
```

```typescript
  @NgModule({
    ...
    providers: [
      ...
      ConfirmDeactivateGuard
    ]
  })
  export class AppModule {}
```

```typescript
  { 
    path: '',
    component: SomeComponent,
    canDeactivate: ['ConfirmDeactivateGuard']
  }
```

## CanActivateChild

```typescript
  class CanActivateChildGuard implements CanActivateChild {
    canActivateChild() {
      ...
    }
  }
```

## CanLoad

```typescript
  class CanLoadGuard implements CanLoad {
    canLoad() {
      ...
    }
  }
```
