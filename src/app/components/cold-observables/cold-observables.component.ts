import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const Obs1$: Observable<string> = new Observable( (observer: Observer<string>) => {
      observer.next('Hello');
      observer.next('World');
      observer.complete();
    });

    // const Obs1$ = from(['Hello', 'World']);

    Obs1$.subscribe({
      next: (x:string) => { console.log('Emisión:', x) },
      error: (e: string) => { console.log('Error:', e); },
      complete: () => { console.log('Fin'); }
    });

    //Creación de observable "infinito"
    const Obs2$ = new Observable((observer: Observer<number>) => {
      let value = 0;
      const interval = setInterval(() => {
        if (value % 2 === 0) {
          observer.next(value);
        }
        value++;
      }, 1000);

      return () => {
        clearInterval(interval);
        console.log('Me he quedado sin observador');
       }
     });

    const subs2 = Obs2$.subscribe(x => console.log('subs2:',x));

    // unsubscribe after 10 seconds
    setTimeout(() => {
      subs2.unsubscribe();
    }, 10000);

    setTimeout(() => {
      Obs2$.subscribe(x => console.log('subs3:',x));
    }, 5000);

    // Son Observables fríos:
    // - Una instancia por cada subscripción
    // - El observable empieza en el momento de la subscripción
    // - Desuscribirse del observable para liberar memoria


    // Introducción a los operadores
    Obs1$.pipe(
      map( (x:string) => x.toUpperCase() )
    )
    .subscribe({
      next: (x:string) => { console.log('Emisión:', x) },
      error: (e: string) => { console.log('Error:', e); },
      complete: () => { console.log('Fin'); }
    });

     Obs1$.pipe(
      map( (x:string) => x.toUpperCase() ),
      map( (x:string) => x.split("").reverse().join("") )
     )
    .subscribe({
      next: (x:string) => { console.log('Emisión:', x) },
      error: (e: string) => { console.log('Error:', e); },
      complete: () => { console.log('Fin'); }
    });

  }

}
