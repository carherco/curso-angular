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

```typescript
<li><a class="nav-link" routerLink="/admin/home" routerLinkActive="active">Admin Home</a></li>
```

Y en el routing padre

```typescript
{
    path: 'admin',
    component: AdminHomeComponent
    loadChildren: 'app/admin/admin.module#AdminModule'
},
```
