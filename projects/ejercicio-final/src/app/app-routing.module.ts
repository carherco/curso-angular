import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { DashboardComponent } from './components/private/dashboard/dashboard.component';
import { CustomersListComponent } from './components/private/customers/customers-list/customers-list.component';
import { ProvidersListComponent } from './components/private/providers/providers-list/providers-list.component';
import { ProfileEditComponent } from './components/private/profile/profile-edit/profile-edit.component';
import { AboutComponent } from './components/public/about/about.component';
import { UserCrudBasicComponent } from './components/private/user-crud-basic/user-crud-basic.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/list', component: UserCrudBasicComponent },
  { path: 'customers/list', component: CustomersListComponent },
  { path: 'providers/list', component: ProvidersListComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
