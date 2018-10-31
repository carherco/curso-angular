import { HeroEffects } from './reducers/hero.effects';
import { HeroService } from './services/hero.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReduxHeroesEditPresenterComponent } from './components/redux-heroes-edit-presenter/redux-heroes-edit-presenter.component';
import { ReduxHeroesListPresenterComponent } from './components/redux-heroes-list-presenter/redux-heroes-list-presenter.component';
import { ReduxHeroesAddPresenterComponent } from './components/redux-heroes-add-presenter/redux-heroes-add-presenter.component';
import { FormsModule } from '@angular/forms';
import { ReduxEffectsHeroesContainerComponent } from './components/redux-heroes-container/redux-heroes-container.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//import { StoreDevtoolsModule } from '@ngrx/store‐devtools';
import { metaReducers, reducers } from './reducers';
import { environment } from 'environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([HeroEffects]),
    //EffectsModule.forFeature([HeroEffects])
    //StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    //!environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [
    ReduxEffectsHeroesContainerComponent,
    ReduxHeroesEditPresenterComponent,
    ReduxHeroesListPresenterComponent,
    ReduxHeroesAddPresenterComponent,
  ],
  exports: [
    ReduxEffectsHeroesContainerComponent
  ],
  providers: [
    HeroService
  ]
})
export class ReduxEffectsModule { }
