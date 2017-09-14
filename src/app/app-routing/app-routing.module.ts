import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClickMeComponent } from "app/click-me/click-me.component";
import { ChildCompComponent } from "app/child-comp/child-comp.component";
import { ParentCompComponent } from "app/parent-comp/parent-comp.component";
import { GaleriaComponent } from "app/galeria/galeria.component";

const appRoutes: Routes = [
      { path: 'click-me', component: ClickMeComponent },
      { path: 'galeria', component: GaleriaComponent },
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
