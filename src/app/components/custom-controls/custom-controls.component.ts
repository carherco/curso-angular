import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'custom-controls',
  templateUrl: './custom-controls.component.html',
  styleUrls: ['./custom-controls.component.css']
})
export class CustomControlsComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tri_state: 0,
      rating: 3,
      title: 'custom-controls'
    });
  }

  ngOnInit() {

  }

}
