import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ParamMap } from "@angular/router";
import { Hero } from '../../model/hero';

@Component({
  selector: 'exce-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
              'Super Hot', 'Weather Changer'];

  hero: Hero;
  id: number;

  constructor(private route: ActivatedRoute) {
    this.hero = new Hero(10,'');
    this.id = 0;

    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this.id = +param.get('id');
        this.hero = new Hero(this.id, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
      }
    );

  }

  ngOnInit() {

  }

  onSubmit() {

  }

  tieneCambiosSinGuardar(): boolean {
    return true;
  }

}
