import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { ClickMeComponent } from './click-me/click-me.component';
import { KeyUpComponent } from './key-up/key-up.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { ColdObservablesComponent } from './cold-observables/cold-observables.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { CrudBasicoComponent } from './crud-basico/crud-basico.component';
import { ChildCompComponent } from './child-comp/child-comp.component';
import { ParentCompComponent } from './parent-comp/parent-comp.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { MockHeroService } from 'app/mock-hero.service';
import { HeroService } from 'app/hero.service';
import { AuthenticationService } from 'app/authentication.service';
import { UserService } from 'app/user.service';
import { AuthGuard } from 'app/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { AuthService } from "app/auth.service";
import { AdminModule } from "app/admin/admin.module";


@NgModule({
  declarations: [
    AppComponent,
    ClickMeComponent,
    KeyUpComponent,
    HeroFormComponent,
    HeroListComponent,
    ColdObservablesComponent,
    HeroSearchComponent,
    ReactiveFormComponent,
    CrudBasicoComponent,
    ChildCompComponent,
    ParentCompComponent,
    GaleriaComponent,
    LoginComponent,
    HomeComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    MockHeroService,
    HeroService,
    AuthenticationService,
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
