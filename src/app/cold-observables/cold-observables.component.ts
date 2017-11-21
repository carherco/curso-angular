import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Creación de observable básico
    const Obs1 = Observable.create(function (emmiter) {
      emmiter.next('Hello');
      emmiter.next('World');
      emmiter.complete();
    });

    Obs1.subscribe(
      function (x) { console.log('Emisión:', x); },
      function (e) { console.log('Error:', e); },
      function () { console.log('Fin'); }
    );

    //Creación de observable "infinito"
    // const Obs2 = Observable.create(function(emmiter) {
    //   let value = 0;
    //   const interval = setInterval(() => {
    //     if (value % 2 === 0) {
    //       emmiter.next(value);
    //     }
    //     value++;
    //   }, 1000);

    //    return () => clearInterval(interval);
    //  });

    // const subs2 = Obs2.subscribe(x => console.log('subs2:',x));

    // unsubscribe after 10 seconds
    // setTimeout(() => {
    //   subs2.unsubscribe();
    // }, 10000);

    // setTimeout(() => {
    //   const subs3 = Obs2.subscribe(x => console.log('subs3:',x));
    // }, 5000);

    // Son Observables fríos:
    // - Una instancia por cada subscripción
    // - El observable empieza en el momento de la subscripción
    // - Desuscribirse del observable para liberar memoria


    //Introducción a los operadores
    // Obs1.map((x)=>x.toUpperCase())
    //     .subscribe(
    //   function (x) { console.log('Emisión:', x); },
    //   function (e) { console.log('Error:', e); },
    //   function () { console.log('Fin'); }
    // );

    //  Obs1.map((x)=>x.toUpperCase())
    //     .map((x)=>x.split("").reverse().join(""))
    //     .subscribe(
    //   function (x) { console.log('Emisión:', x); },
    //   function (e) { console.log('Error:', e); },
    //   function () { console.log('Fin'); }
    // );

  }

}
