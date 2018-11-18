import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { QuestionService } from './question.service';
import { QuestionControlService } from './question-control.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  providers: [
    QuestionService,
    QuestionControlService
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
