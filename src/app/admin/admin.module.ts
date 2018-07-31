import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';

const routes: Routes = [
  { path: 'home', component: AdminHomeComponent},
  { path: 'user', component: UserListComponent },
  { path: 'user/add', component: UserAddComponent },
  { path: 'user/:id', component: UserEditComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminHomeComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    ClientesComponent,
    ProveedoresComponent
  ]
})
export class AdminModule { }
