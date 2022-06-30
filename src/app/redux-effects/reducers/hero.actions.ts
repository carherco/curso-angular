import { Hero } from "src/app/model/Hero";

// export enum HeroActionTypes {
//   LoadHeroes = '[HERO]_Load',
//   AddHero = '[HERO]_Add',
//   DeleteHero = '[HERO]_Delete'
// }

export interface HeroAction {
  readonly type: string;
  readonly payload?: any;
}

export class LoadHeroes implements HeroAction {
  readonly type = '[HERO]_Load';
  constructor() {}
}

export class LoadHeroesOk implements HeroAction {
  readonly type = '[HERO]_Load_OK';
  constructor(public readonly payload: Hero[]) {}
}

export class LoadHeroesERROR implements HeroAction {
  readonly type = '[HERO]_Load_ERROR';
  constructor(public readonly payload: string) {}
}

export class AddHero implements HeroAction {
  readonly type = '[HERO]_Add';
  constructor(public readonly payload: Hero) {}
}

export class DeleteHero implements HeroAction {
  readonly type = '[HERO]_Delete';
  constructor(public readonly payload: Hero) {}
}

export type HeroActions = LoadHeroes | LoadHeroesOk | LoadHeroesERROR | AddHero | DeleteHero;
