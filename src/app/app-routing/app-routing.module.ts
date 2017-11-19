import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClickMeComponent } from 'app/click-me/click-me.component';
import { ChildCompComponent } from 'app/child-comp/child-comp.component';
import { ParentCompComponent } from 'app/parent-comp/parent-comp.component';
import { GaleriaComponent } from 'app/galeria/galeria.component';
import { KeyUpComponent } from 'app/key-up/key-up.component';
import { HeroFormComponent } from 'app/hero-form/hero-form.component';
import { ReactiveFormComponent } from 'app/reactive-form/reactive-form.component';
import { HeroListComponent } from 'app/hero-list/hero-list.component';
import { HeroSearchComponent } from 'app/hero-search/hero-search.component';
import { LoginComponent } from 'app/login/login.component';
import { HomeComponent } from 'app/home/home.component';
import { AuthGuard } from 'app/auth.guard';
import { AdminHomeComponent } from "app/admin-home/admin-home.component";
import { UserListComponent } from "app/user-list/user-list.component";
import { UserEditComponent } from "app/user-edit/user-edit.component";
import { UserAddComponent } from "app/user-add/user-add.component";
import { HomePageComponent } from "app/home-page/home-page.component";
import { LifecycleComponent } from "app/lifecycle/lifecycle.component";


const appRoutes: Routes = [
      { path: 'click-me', component: ClickMeComponent },
      { path: 'galeria', component: GaleriaComponent },
      { path: 'key-up', component: KeyUpComponent },
      { path: 'forms/template-driven', component: HeroFormComponent },
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
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ];

const appRoutes2: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminHomeComponent, canActivateChild: [AuthGuard],
          loadChildren: 'app/admin/admin.module#AdminModule'
      },
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
