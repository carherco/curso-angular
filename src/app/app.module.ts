import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing/app-routing.module';
import { AdminModule } from 'app/admin/admin.module';

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
import { HomePageComponent } from './home-page/home-page.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { HighlightComponent } from './highlight/highlight.component';

import { MockHeroService } from 'app/mock-hero.service';
import { HeroService } from 'app/hero.service';
import { AuthenticationService } from 'app/authentication.service';
import { UserService } from 'app/user.service';
import { AuthGuard } from 'app/auth.guard';
import { AuthService } from 'app/auth.service';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { HighlightDirective } from './highlight.directive';
import { PipesComponent } from './pipes/pipes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ImagePipe } from './image.pipe';
import { FacturasComponent } from './facturas/facturas.component';
import { TareasComponent } from './tareas/tareas.component';



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
    HomePageComponent,
    LifecycleComponent,
    CalculadoraComponent,
    HighlightDirective,
    HighlightComponent,
    PipesComponent,
    ImagePipe,
    FacturasComponent,
    TareasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
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
