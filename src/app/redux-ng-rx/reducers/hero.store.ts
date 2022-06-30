import { Hero } from "src/app/model/Hero";

export interface HeroState {
  items: Hero[],
  lastId: number
}

