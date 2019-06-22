import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PovidersListComponent } from './components/providers/poviders-list/poviders-list.component';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers/list', component: CustomersListComponent },
  { path: 'providers/list', component: PovidersListComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
