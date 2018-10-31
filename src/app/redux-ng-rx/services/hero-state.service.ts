import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HeroState } from '../reducers/hero.store';
import { initialHeroState, reducer } from '../reducers/hero.reducer';
import { HeroAction } from '../reducers/hero.actions';

@Injectable({
  providedIn: 'root'
})
export class ReduxHeroStateService {

    private state: HeroState = initialHeroState;
    private state$ = new Subject<any>();
    //private state$ = new BehaviorSubject<any>([]);

    constructor() {}

    public dispatch = (action: HeroAction) => {
      this.state = reducer(this.state, action);
      this.state$.next(this.getSnapshot());
    };

    public getSnapshot = () => {
      return { ...this.state };
    };

    public select$ = () => this.state$.asObservable();
}

