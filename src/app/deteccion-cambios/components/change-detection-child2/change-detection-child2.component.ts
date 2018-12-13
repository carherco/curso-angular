import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-change-detection-child2',
  templateUrl: './change-detection-child2.component.html',
  styleUrls: ['./change-detection-child2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionChild2Component implements OnInit {

  @Input() object;
  constructor() {
    console.log('child2 constructor');
    setTimeout(() => {
      console.log('timeout - child2');
      this.object.name = 'child2 modified by timeout in child2';
    },10000);

    of(true).pipe( delay(20000) ).subscribe(
      x => {
        console.log('observable - child2');
        this.object.name = 'child2 modified by observable in child2';
      }
    );
  }

  onClick() {
    console.log('child2 (click)');
    this.object.name = 'child2 modified by click in child2';
  }

  ngOnInit() {
    console.log('child2 ngOnInit');
  }

  ngOnChanges() {
    console.log('child2 ngOnChanges');
  }

  ngDoCheck() {
    console.log('child2 ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('child2 ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('child2 ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('child2 ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('child2 ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('child2 ngOnDestroy');
  }

}
