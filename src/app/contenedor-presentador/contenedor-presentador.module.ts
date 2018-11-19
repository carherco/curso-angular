import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesContainerComponent } from './components/heroes-container/heroes-container.component';
import { HeroesNewPresenterComponent } from './components/heroes-new-presenter/heroes-new-presenter.component';
import { HeroesListPresenterComponent } from './components/heroes-list-presenter/heroes-list-presenter.component';
import { HeroesEditPresenterComponent } from './components/heroes-edit-presenter/heroes-edit-presenter.component';

@NgModule({
  declarations: [
    HeroesContainerComponent,
    HeroesNewPresenterComponent,
    HeroesListPresenterComponent,
    HeroesEditPresenterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeroesContainerComponent
  ]
})
export class ContenedorPresentadorModule { }
