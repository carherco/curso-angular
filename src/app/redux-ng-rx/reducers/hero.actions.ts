import { Hero } from "app/model/hero";

// export enum HeroActionTypes {
//   LoadHeroes = '[HERO]_Load',
//   AddHero = '[HERO]_Add',
// }

export interface HeroAction {
  readonly type: string;
  readonly payload?: any;
}

export class LoadHeroes implements HeroAction {
  readonly type = '[HERO]_Load';
  constructor(public readonly payload: Hero[]) {}
}

export class AddHero implements HeroAction {
  readonly type = '[HERO]_Add';
  constructor(public readonly payload: Hero) {}
}

export class DeleteHero implements HeroAction {
  readonly type = '[HERO]_Delete';
  constructor(public readonly payload: Hero) {}
}

export type HeroActions = LoadHeroes | AddHero | DeleteHero;


