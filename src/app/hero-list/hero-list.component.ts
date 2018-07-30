import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/hero';
import { HeroService } from 'app/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  errorMessage: string;
  heroes: Hero[];

  constructor (private heroService: HeroService) {
    this.getHeroes();
  }

  ngOnInit() {

   }

  getHeroes() {
    this.heroService.getHeroes()
                    .subscribe(
                       x => this.heroes = x,
                       error =>  this.errorMessage = <any>error);
  }

}
