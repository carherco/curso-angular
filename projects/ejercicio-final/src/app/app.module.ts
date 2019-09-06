import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/public/login/login.component';
import { DashboardComponent } from './components/private/dashboard/dashboard.component';
import { UserCrudBasicComponent } from './components/private/user-crud-basic/user-crud-basic.component';
import { ProfileEditComponent } from './components/private/profile/profile-edit/profile-edit.component';
import { CustomersListComponent } from './components/private/customers/customers-list/customers-list.component';
import { ProvidersListComponent } from './components/private/providers/providers-list/providers-list.component';
import { AboutComponent } from './components/public/about/about.component';
import { HomeComponent } from './components/public/home/home.component';
import { PrivateMenuComponent } from './components/layout/private-menu/private-menu.component';
import { PublicMenuComponent } from './components/layout/public-menu/public-menu.component';
import { PublicHeaderComponent } from './components/layout/public-header/public-header.component';
import { PrivateHeaderComponent } from './components/layout/private-header/private-header.component';

@NgModule({
  declarations: [
    AppComponent,
    PrivateHeaderComponent,
    PublicHeaderComponent,
    PublicMenuComponent,
    PrivateMenuComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    DashboardComponent,
    UserCrudBasicComponent,
    ProvidersListComponent,
    CustomersListComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
