import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[marble]',
  templateUrl: './marble.component.html',
  styleUrls: ['./marble.component.css']
})
export class MarbleComponent implements OnInit {

  @Input('marble') label;
  @Input() radius = 25;
  @Input() color = '#ffffff';
  @Input() y;
  @Input() x;

  circle = {
    radius: this.radius,
    cy: 0,
    cx: 0,
    color: this.color
  };

  text = {
    y: 0,
    x: 0,
    color: '#000000',
    size: 20,
    label: ''
  };
  constructor() { }

  ngOnInit() {
    this.circle = {...this.circle, radius: this.radius, cx: this.x, cy: this.y, color: this.color };
    this.text = {...this.text, x: this.x, y: this.y + 7, label: this.label };
  }

}
