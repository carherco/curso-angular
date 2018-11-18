import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'app/dynamic-form/question.service';
import { QuestionBase } from 'app/dynamic-form/question-base';

@Component({
  selector: 'dynamic-form-example',
  templateUrl: './dynamic-form-example.component.html',
  styleUrls: ['./dynamic-form-example.component.css']
})
export class DynamicFormExampleComponent implements OnInit {

  questions: QuestionBase<any>[];
  constructor(private qs: QuestionService) {
    this.questions = qs.getQuestions();
   }

  ngOnInit() {
  }

}
