import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { CheckboxQuestion } from './question-checkbox';


@Injectable()
export class QuestionService {

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {

    const questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid', price: 50},
          {key: 'great',  value: 'Great', price: 60},
          {key: 'good',   value: 'Good', price: 70},
          {key: 'unproven', value: 'Unproven', price: 80}
        ]
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        price: 47
      }),

      new CheckboxQuestion({
        key: 'registroUsuarios',
        label: 'Registro de usuarios',
        value: false,
        required: false,
        price: 155
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        price: 50
      })
    ];

    console.log(questions);

    return questions;
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
