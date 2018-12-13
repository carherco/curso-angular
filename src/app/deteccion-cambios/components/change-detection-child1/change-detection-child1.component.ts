import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-change-detection-child1',
  templateUrl: './change-detection-child1.component.html',
  styleUrls: ['./change-detection-child1.component.css']
})
export class ChangeDetectionChild1Component implements OnInit {

  @Input() object;
  constructor() {
    console.log('child1 constructor');
  }

  onClick() {
    console.log('child1 (click)');
    this.object.name = 'child1 modified by click in child1';
  }

  ngOnInit() {
    console.log('child1 ngOnInit');
  }

  ngOnChanges() {
    console.log('child1 ngOnChanges');
  }

  ngDoCheck() {
    console.log('child1 ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('child1 ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('child1 ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('child1 ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('child1 ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('child1 ngOnDestroy');
  }

}
