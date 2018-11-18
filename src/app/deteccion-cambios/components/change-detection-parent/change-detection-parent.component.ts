import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-change-detection-parent',
  templateUrl: './change-detection-parent.component.html',
  styleUrls: ['./change-detection-parent.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionParentComponent implements OnInit {

  objectp = {name: 'parent'}
  objectc1 = {name: 'child1'}
  objectc2 = {name: 'child2'}
  objectc3 = {name: 'child3'}
  constructor() {
    // setTimeout(() => {
    //   console.log('timeout - parent');
    //   this.objectp.name = 'parent modified by timeout';
    //   this.objectc1.name = 'child1 modified by timeout';
    //   this.objectc2.name = 'child2 modified by timeout';
    //   this.objectc3 = {...this.objectc3, name: 'child3 modified by timeout'};
    // },5000);

    // of(true).pipe( delay(15000) ).subscribe(
    //   x => {
    //     console.log('observable - parent');
    //     this.objectp.name = 'parent modified by observable in parent';
    //     this.objectc1.name = 'child1 modified by observable in parent';
    //     this.objectc2.name = 'child2 modified by observable in parent';
    //     this.objectc3 = {...this.objectc3, name: 'child3 modified by observable in parent'};
    //   }
    // );
  }

  onClick() {
    console.log('parent (click)');
    this.objectp.name = 'parent modified by click in parent';
    this.objectc1.name = 'child1 modified by click in parent';
    this.objectc2.name = 'child2 modified by click in parent';
    this.objectc3 = {...this.objectc3, name: 'child3 modified by click in parent'};
  }

  ngOnInit() {
    console.log('parent ngOnInit');
  }

  ngOnChanges() {
    console.log('parent ngOnChanges');
  }

  ngDoCheck() {
    console.log('parent ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('parent ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('parent ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('parent ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('parent ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('parent ngOnDestroy');
  }

}
