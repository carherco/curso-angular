export class QuestionBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  controlType: string;
  type: string;
  price?: number
  options?: any;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      price?: number,
      controlType?: string
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.price = options.price || null;
    this.controlType = options.controlType || '';
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/