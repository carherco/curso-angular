import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReduxHeroesContainerComponent } from './components/redux-heroes-container/redux-heroes-container.component';
import { ReduxHeroesEditPresenterComponent } from './components/redux-heroes-edit-presenter/redux-heroes-edit-presenter.component';
import { ReduxHeroesListPresenterComponent } from './components/redux-heroes-list-presenter/redux-heroes-list-presenter.component';
import { ReduxHeroesAddPresenterComponent } from './components/redux-heroes-add-presenter/redux-heroes-add-presenter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ReduxHeroesContainerComponent,
    ReduxHeroesEditPresenterComponent,
    ReduxHeroesListPresenterComponent,
    ReduxHeroesAddPresenterComponent,
  ],
  exports: [
    ReduxHeroesContainerComponent
  ]
})
export class ReduxModule { }
