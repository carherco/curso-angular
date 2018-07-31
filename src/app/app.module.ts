import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfimarGuard } from './guards/confimar.guard';
import { PruebaGuard } from './guards/prueba.guard';
import { AuthService } from './services/auth.service';
import { HeroeService } from './services/heroe.service';
import { MockHeroeService } from './services/mock-heroe.service';
import { UsuarioService } from './services/usuario.service';
import { HeroService } from './services/hero.service';
import { ClickMeComponent } from './components/click-me/click-me.component';
import { KeyUpComponent } from './components/key-up/key-up.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { ColdObservablesComponent } from './components/cold-observables/cold-observables.component';
import { CrudBasicoComponent } from './components/crud-basico/crud-basico.component';
import { ChildCompComponent } from './components/child-comp/child-comp.component';
import { ParentCompComponent } from './components/parent-comp/parent-comp.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { HighlightDirective } from './directives/highlight.directive';

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
    HighlightDirective,
    HighlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MockHeroeService,
    HeroeService,
    HeroService,
    UsuarioService,
    UserService,
    AuthService,
    PruebaGuard,
    ConfimarGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
