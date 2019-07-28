import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-operator-block',
  templateUrl: './operator-block.component.html',
  styleUrls: ['./operator-block.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OperatorBlockComponent implements OnInit {

  @Input() y;
  constructor() { }

  ngOnInit() {
  }

}
