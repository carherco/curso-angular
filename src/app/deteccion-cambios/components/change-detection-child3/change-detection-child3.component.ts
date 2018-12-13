import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-change-detection-child3',
  templateUrl: './change-detection-child3.component.html',
  styleUrls: ['./change-detection-child3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionChild3Component implements OnInit {

  @Input() object;
  constructor() {
    console.log('child3 constructor');
  }

  onClick() {
    console.log('child3 (click)');
    this.object.name = 'child3 modified by click in child3';
  }

  ngOnInit() {
    console.log('child3 ngOnInit');
  }

  ngOnChanges() {
    console.log('child3 ngOnChanges');
  }

  ngDoCheck() {
    console.log('child3 ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('child3 ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('child3 ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('child3 ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('child3 ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('child3 ngOnDestroy');
  }

}
