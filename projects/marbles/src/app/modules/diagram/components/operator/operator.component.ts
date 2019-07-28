import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[operator]',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  @Input() operator = '';
  constructor() { }

  ngOnInit() {
  }

}
