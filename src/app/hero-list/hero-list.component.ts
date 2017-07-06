import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/hero';
import { HeroService } from 'app/hero.service';
import 'rxjs/add/operator/filter';

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

  ngOnInit() {  }

  getHeroes() {
    this.heroService.getHeroes()
                    .subscribe(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
  }

}
