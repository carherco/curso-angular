import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

import { RequiredTextControl } from './controls/required-text/required-text.component';
import { RatingStarsControl } from './controls/rating-stars/rating-stars.component';
import { TriStateControl } from './controls/tri-state/tri-state.component';
import { RequiredTextValidator } from './validators/required-text-validator/required-text-validator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule
  ],
  declarations: [
    RequiredTextControl,
    RequiredTextValidator,
    TriStateControl,
    RatingStarsControl
  ],
  exports: [
    RequiredTextControl,
    RatingStarsControl,
    TriStateControl,
  ]
})
export class CustomControlsModule { }
