import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HeroState } from '../reducers/hero.store';
import { initialHeroState, reducer } from '../reducers/hero.reducer';
import { HeroAction } from '../reducers/hero.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ReduxHeroStateService {

    private state;
    private state$ = new Subject<any>();
    //private state$ = new BehaviorSubject<any>(this.state);

    constructor() {}

    public dispatch = (action) => {
      this.state = reducer(this.state, action);
      this.state$.next(this.getSnapshot());
    };

    public getSnapshot = () => {
      return { ...this.state };
    };

    public select$ = () => this.state$.asObservable();
}

