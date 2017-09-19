import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
