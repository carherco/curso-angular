import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  hero = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.hero.name = '';
    this.hero.power = this.powers[0];
    this.hero.alterEgo = '';
  }

  // TODO: Remove this when we're done
  diagnostic() {
    return this.hero;
  }

}
