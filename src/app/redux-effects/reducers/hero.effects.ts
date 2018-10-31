import { Hero } from 'app/model/hero';
import { HeroActions, LoadHeroes, LoadHeroesOk, LoadHeroesERROR } from './hero.actions';
import { HeroService } from './../services/hero.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class HeroEffects {
  constructor(
    private actions$: Actions,
    private heroService: HeroService
  ) {}

  @Effect()
  public loadHeroesEffect$: Observable<HeroActions> = this.actions$.pipe(
    tap( x => console.log(x) ),
    ofType('[HERO]_Load'),
    tap( x => console.log('Efecto') ),
    mergeMap(() =>
      //Aquí es donde se programa la operación asíncrona, en nuestro caso his.heroService.getHeroes()
      this.heroService.getHeroes().pipe(
        map((heroes: Hero[]) => new LoadHeroesOk(heroes)),
        catchError(err => of(new LoadHeroesERROR('Error loading cars')))
      )
    )
  );
}
