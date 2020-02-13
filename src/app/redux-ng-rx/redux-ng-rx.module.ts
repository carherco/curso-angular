import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReduxHeroesEditPresenterComponent } from './components/redux-heroes-edit-presenter/redux-heroes-edit-presenter.component';
import { ReduxHeroesListPresenterComponent } from './components/redux-heroes-list-presenter/redux-heroes-list-presenter.component';
import { ReduxHeroesAddPresenterComponent } from './components/redux-heroes-add-presenter/redux-heroes-add-presenter.component';
import { FormsModule } from '@angular/forms';
import { ReduxNgrxHeroesContainerComponent } from './components/redux-heroes-container/redux-heroes-container.component';
import { StoreModule } from '@ngrx/store';
//import { StoreDevtoolsModule } from '@ngrx/store‐devtools';
import { metaReducers, reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    //StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    //!environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [
    ReduxNgrxHeroesContainerComponent,
    ReduxHeroesEditPresenterComponent,
    ReduxHeroesListPresenterComponent,
    ReduxHeroesAddPresenterComponent,
  ],
  exports: [
    ReduxNgrxHeroesContainerComponent
  ]
})
export class ReduxNgRxModule { }
