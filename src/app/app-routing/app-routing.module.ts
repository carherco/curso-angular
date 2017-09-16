import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClickMeComponent } from 'app/click-me/click-me.component';
import { ChildCompComponent } from 'app/child-comp/child-comp.component';
import { ParentCompComponent } from 'app/parent-comp/parent-comp.component';
import { GaleriaComponent } from 'app/galeria/galeria.component';
import { KeyUpComponent } from 'app/key-up/key-up.component';
import { HeroFormComponent } from 'app/hero-form/hero-form.component';

const appRoutes: Routes = [
      { path: 'click-me', component: ClickMeComponent },
      { path: 'galeria', component: GaleriaComponent },
      { path: 'key-up', component: KeyUpComponent },
      { path: 'forms/template-driven', component: HeroFormComponent },
      { path: 'hero/:id',      component: ChildCompComponent },
      {
        path: 'heroes',
        component: ParentCompComponent,
        data: { title: 'Heroes List' }
      },
      { path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
      },
      //{ path: '**', component: PageNotFoundComponent }
    ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
