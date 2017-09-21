import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from 'app/admin-home/admin-home.component';
import { UserListComponent } from 'app/user-list/user-list.component';
import { UserEditComponent } from 'app/user-edit/user-edit.component';
import { UserAddComponent } from 'app/user-add/user-add.component';

const routes: Routes = [
  {path: 'home', component: AdminHomeComponent},
  {path: 'users/list', component: UserListComponent},
  {path: 'users/edit/:id', component: UserEditComponent},
  {path: 'users/new', component: UserAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
