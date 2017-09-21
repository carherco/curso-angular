import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from 'app/admin-home/admin-home.component';
import { UserListComponent } from 'app/user-list/user-list.component';
import { UserEditComponent } from 'app/user-edit/user-edit.component';
import { UserAddComponent } from 'app/user-add/user-add.component';
import { AuthGuard } from 'app/auth.guard';

const routes: Routes = [
  { path: '', component: AdminHomeComponent},
  { path: 'user', component: UserListComponent },
  { path: 'user/add', component: UserAddComponent },
  { path: 'user/:id', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
