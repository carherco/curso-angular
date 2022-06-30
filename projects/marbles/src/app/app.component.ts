import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marbles';
  data = `
    +--A-B--C--|
    +--(478)-{5,9,8}--(P3)--#
    switchMap
    +-12345678>
  `;

  form: FormGroup;
  dataCtrl: FormControl = new FormControl(this.data);
  data$: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'textarea': this.dataCtrl
    });

    this.data$ = this.dataCtrl.valueChanges.pipe(
      startWith(this.data),
      debounceTime(500),
      map( data => data.split("\n").map((line: string) => line.trim()) )
      //distinctUntilChanged(), // No funciona porque el .map de javascript crea un NUEVO array
      //tap (x => console.log(x))
    );

  }


}
