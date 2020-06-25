import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-huge-form',
  templateUrl: './huge-form.component.html',
  styleUrls: ['./huge-form.component.css']
})
export class HugeFormComponent implements OnInit {

  registerForm: FormGroup;
  mapForm: Map<string, number>;
  page: number;

  constructor(private formService: FormService) {
    this.formService.createForm();
    this.registerForm = this.formService.getForm();
    this.mapForm = this.formService.getMap();
    this.page = 1;
  }

  ngOnInit(): void {
    const obj1 = {
      a: 3,
      b: 7,
      c: 23
    };

    const obj2 = {
      d: 34,
      e: 72,
      f: 213
    };

    const obj3 = {
      g: 63,
      h: 37,
      i: 923
    };

    const allValues = {...obj1, ...obj2, ...obj3};
    console.log(allValues);
  }

  show(formControlName: string): boolean {
    return this.mapForm.get(formControlName) === this.page;
  }

  nextPage() {
    this.formService.save(this.registerForm.value);
    this.page = this.page + 1;
  }

  submit() {
    const allValues = this.registerForm.value;

    // Si estuvieran en grupos el mapeo para aplanar es fácil:
    // const allValues = {
    //   ...this.registerForm.get('nombreGrupo1'),
    //   ...this.registerForm.get('nombreGrupo2'),
    //   ...this.registerForm.get('nombreGrupo3')
    // }
  }

}
