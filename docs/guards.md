# Guards

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
            {path: "projects", component: ProjectsComponent, canActivate: [AdminGuard]}
        ]
    },
    {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuard]}
];
```




## Tipos de guards

Hay 4 tips de Guards diferentes que se pueden utilizar para proteger nuestras rutas:

- **CanActivate:** Decide si una ruta puede ser activada.
- **CanActivateChild:** Decide si las rutas hijas de una ruta pueden ser activadas.
- **CanDeactivate:** Decide si una ruta puede ser desactivada.
- **CanLoad:** Decide si un módulo puede ser cargado de forma lazy.

## CanActivate

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

The CanDeactivate guard also has access to the instance of the active component.

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
