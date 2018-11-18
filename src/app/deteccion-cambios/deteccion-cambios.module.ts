import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionParentComponent } from './components/change-detection-parent/change-detection-parent.component';
import { ChangeDetectionChild1Component } from './components/change-detection-child1/change-detection-child1.component';
import { ChangeDetectionChild2Component } from './components/change-detection-child2/change-detection-child2.component';
import { ChangeDetectionChild3Component } from './components/change-detection-child3/change-detection-child3.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChangeDetectionParentComponent,
    ChangeDetectionChild1Component,
    ChangeDetectionChild2Component,
    ChangeDetectionChild3Component
  ],
  exports: [
    ChangeDetectionParentComponent
  ]
})
export class DeteccionCambiosModule { }
