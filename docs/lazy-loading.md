# Lazy loading


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
  {path: 'home', component: AdminHomeComponent},
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

En app.component.html añadimos un enlace al componente exportado (AdminHomeComponent)


Para activar lazy loading en un path necesitamos:
- NO incluir el módulo lazy en el módulo raíz
- Cargar un módulo en el path, en vez de un componente
- Definir una ruta por defecto en el módulo hijo
- Configurar el routerModule (forChild)

```typescript
<li><a class="nav-link" routerLink="/admin/home" routerLinkActive="active">Admin Home</a></li>
```

Y en el routing padre

```typescript
{
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
},
```

Angular-cli integra los componentes las directivas y las pipes que genera en app.module.ts. Si queremos que estén integrados en otro módulo distinto, debemos ejecutar el comando de la siguiente manera:

> ng g component nombre-modulo/nombre-componente


[Índice](index.md)
