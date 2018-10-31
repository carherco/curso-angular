import { Hero } from "app/model/hero";

export interface HeroState {
  items: Hero[],
  lastId: number
}

