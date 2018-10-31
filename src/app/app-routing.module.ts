import { AnimationQueryStagerComponent } from './components/animation-query-stager/animation-query-stager.component';
import { CrudBasicoComponent } from './components/crud-basico/crud-basico.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ClickMeComponent } from './components/click-me/click-me.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { KeyUpComponent } from './components/key-up/key-up.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { ChildCompComponent } from './components/child-comp/child-comp.component';
import { ParentCompComponent } from './components/parent-comp/parent-comp.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ColdObservablesComponent } from './components/cold-observables/cold-observables.component';
import { RotateComponent } from './components/rotate/rotate.component';
import { CronoComponent } from './components/crono/crono.component';
import { AnimationComponent } from 'app/components/animation/animation.component';
import { AnimationSearchComponent } from 'app/components/animation-search/animation-search.component';
import { ReduxHeroesContainerComponent } from './redux/components/redux-heroes-container/redux-heroes-container.component';


const appRoutes: Routes = [
      { path: 'click-me', component: ClickMeComponent },
      { path: 'calculadora', component: CalculadoraComponent },
      { path: 'highlight', component: HighlightComponent },
      { path: 'pipes', component: PipesComponent },
      { path: 'galeria', component: GaleriaComponent },
      { path: 'crud-basico', component: CrudBasicoComponent },
      { path: 'parent-child', component: ParentCompComponent },
      { path: 'key-up', component: KeyUpComponent },
      { path: 'forms/template-driven', component: HeroFormComponent },
      { path: 'observables', component: ColdObservablesComponent },
      { path: 'forms/model-driven', component: ReactiveFormComponent },
      { path: 'heroes-api', component: HeroListComponent },
      { path: 'lifecycle', component: LifecycleComponent },
      { path: 'search', component: HeroSearchComponent },
      { path: 'hero/:id',      component: ChildCompComponent },
      {
        path: 'heroes',
        component: ParentCompComponent,
        data: { title: 'Heroes List' }
      },
      { path: 'login', component: LoginComponent },
      { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
      { path: 'fractal', loadChildren: 'app/fractal/fractal.module#FractalModule'},
      { path: 'rotate', component: RotateComponent },
      { path: 'crono', component: CronoComponent },
      { path: 'animation', component: AnimationComponent },
      { path: 'animation2', component: AnimationQueryStagerComponent },
      { path: 'animation-search', component: AnimationSearchComponent },
      { path: 'lazy1', loadChildren: 'app/lazy1/lazy1.module#Lazy1Module'},
      { path: 'lazy2', loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'},
     // { path: 'lazy3', loadChildren: 'app/lazy3/lazy3.module#Lazy3Module', data: {preload: true}},
      { path: 'lazy4', loadChildren: 'app/lazy4/lazy4.module#Lazy4Module'},
      { path: 'lazy5', loadChildren: 'app/lazy5/lazy5.module#Lazy5Module'},
      { path: 'redux', component: ReduxHeroesContainerComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ];

const appRoutes2: Routes = [
      { path: 'login', component: LoginComponent },
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{
    enableTracing: false, // <-- debugging purposes only
    preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule { }
