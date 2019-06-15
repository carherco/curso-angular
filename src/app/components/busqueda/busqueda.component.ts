import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";
import { tap, filter, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { map } from "rxjs/internal/operators/map";
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'exce-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  usuarios: {id: number, name: string, email: string}[] = [];
  errorMessage: string;

  @ViewChild('email', {static: true}) email: ElementRef;


  constructor(private usuarioService: UsuarioService) {
    this.getUsuarios().subscribe( (respuesta) => this.usuarios = respuesta );;
  }

  ngOnInit() {

    fromEvent(this.email.nativeElement, 'keyup')
    .pipe(
        tap(x => console.log('Elemento original:', x)),
        map((x: any) => x.target.value),
        tap(x => console.log('Después de .map((x: any) => x.target.value):', x)),
        filter( (x:string) => x.length > 3),
        tap(x => console.log('Después de .filter(x => x.length > 3)', x)),
        debounceTime(500),
        tap(x => console.log('Después de .debounceTime(500)', x)),
        distinctUntilChanged(),
        tap(x => console.log('Después de .distinctUntilChanged()', x)),
        switchMap((x:string) =>  this.getUsuarios(x)),
        tap(x => console.log('Después de .switchMap((x) => this.getHeroes(x))', x))

        ).subscribe( (respuesta: any) => this.usuarios = respuesta );

    // ).subscribe( (valor:any) => {
    //   this.getUsuarios(valor).subscribe( (respuesta) => this.usuarios = respuesta );
    // } );
      // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap

  }

  getUsuarios(email: string = '') {

    let filtro = '';
    if(email !== ''){
      filtro = 'email='+email;
    }
    return this.usuarioService.get(filtro);

  }

}
