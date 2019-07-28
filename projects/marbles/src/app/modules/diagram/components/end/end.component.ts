import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[end]',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  @Input() x;
  constructor() { }

  ngOnInit() {
  }

}
