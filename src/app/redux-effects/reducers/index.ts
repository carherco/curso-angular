import { Hero } from 'src/app/model/Hero';
import { globalreducer, heroreducer } from './hero.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface State {
  global: GlobalState,
  hero: HeroState
}

export interface GlobalState {
  username: string,
  isLogged: boolean
}

export interface HeroState {
  items: Hero[],
  lastId: number
}

export const reducers: ActionReducerMap<State> = {
  global: globalreducer,
  hero: heroreducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
