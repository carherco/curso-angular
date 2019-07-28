import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[source-block]',
  templateUrl: './source-block.component.html',
  styleUrls: ['./source-block.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SourceBlockComponent implements OnInit {

  @Input() y;
  @Input() data;
  @Input() step_x;
  offset_x = 10.0;
  constructor() { }

  ngOnInit() {
  }

}
