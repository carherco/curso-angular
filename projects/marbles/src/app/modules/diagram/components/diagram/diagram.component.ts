import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

  @Input() circleRadius = 25;

  @Input() data = [
    '+--A-B--C--|',
    '+--(478)-{5,9,8}--(P3)--#',
    'switchMap',
    '+-12345678>'
  ];

  offset_y = 30;
  step_y = this.circleRadius * 2 + 10;
  step_x = this.circleRadius * 2;
  colors = [
    '#ffcc00',
    '#48b3cd',
    '#ffaacc',
    '#a0c800',
    '#ff3a3a',
    '#ececec',
    '#a4ecff',
    '#ff6600'
  ];

  constructor() { }

  ngOnInit() {
  }

}
