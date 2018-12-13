import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredTextComponent } from './controls/required-text/required-text.component';
import { RequiredTextValidator } from './validators/required-text-validator/required-text-validator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RequiredTextComponent,
    RequiredTextValidator
  ],
  exports: [
    RequiredTextComponent
  ]
})
export class CustomControlsModule { }
