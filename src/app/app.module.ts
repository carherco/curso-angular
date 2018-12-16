import { DeteccionCambiosModule } from './deteccion-cambios/deteccion-cambios.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { ReduxEffectsModule } from './redux-effects/redux-effects.module';
import { ReduxNgRxModule } from './redux-ng-rx/redux-ng-rx.module';
import { ReduxModule } from './redux/redux.module';
import { FractalModule } from './fractal/fractal.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'app/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { DynamicComponentsModule } from './dynamic-components/dynamic-components.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ChildCompComponent } from './components/child-comp/child-comp.component';
import { ClickMeComponent } from './components/click-me/click-me.component';
import { ColdObservablesComponent } from './components/cold-observables/cold-observables.component';
import { CrudBasicoComponent } from './components/crud-basico/crud-basico.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeComponent } from './components/home/home.component';
import { KeyUpComponent } from './components/key-up/key-up.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { LoginComponent } from './components/login/login.component';
import { ParentCompComponent } from './components/parent-comp/parent-comp.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { RotateComponent } from './components/rotate/rotate.component';
import { CronoComponent } from './components/crono/crono.component';
import { AnimationComponent } from './components/animation/animation.component';
import { AnimationQueryStagerComponent } from './components/animation-query-stager/animation-query-stager.component';
import { AnimationSearchComponent } from './components/animation-search/animation-search.component';
import { DynamicFormExampleComponent } from './components/dynamic-form-example/dynamic-form-example.component';
import { DynamicComponentsExampleComponent } from './components/dynamic-components-example/dynamic-components-example.component';

import { HighlightDirective } from './directives/highlight.directive';
import { RotateDirective } from './directives/rotate.directive';

import { FilterAgePipe } from './pipes/filter-age.pipe';

import { AuthGuard } from './guards/auth.guard';
import { ConfimarGuard } from './guards/confimar.guard';
import { PruebaGuard } from './guards/prueba.guard';

import { AuthService } from './services/auth.service';
import { HeroService } from './services/hero.service';
import { HeroeService } from './services/heroe.service';
import { MockHeroeService } from './services/mock-heroe.service';
import { UserService } from './services/user.service';
import { UsuarioService } from './services/usuario.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormReactiveComponent } from './components/user-form-reactive/user-form-reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickMeComponent,
    PipesComponent,
    CalculadoraComponent,
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
    HighlightComponent,
    NavComponent,
    RotateDirective,
    RotateComponent,
    CronoComponent,
    AnimationComponent,
    AnimationQueryStagerComponent,
    AnimationSearchComponent,
    DynamicFormExampleComponent,
    DynamicComponentsExampleComponent,
    FilterAgePipe,
    UserFormComponent,
    UserFormReactiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FractalModule,
    ReduxModule,
    ReduxNgRxModule,
    ReduxEffectsModule,
    DynamicFormModule,
    DynamicComponentsModule,
    DeteccionCambiosModule
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
