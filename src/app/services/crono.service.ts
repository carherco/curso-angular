import { Injectable } from '@angular/core';
import { Crono } from '../model/crono';

@Injectable({
  providedIn: 'root'
})
export class CronoService {

  crono_id; // Identificador del cronómetro (podría ser el id del partido)
  duracion: number; //(en minutos) Este dato hay que configurarlo desde fuera
  precision: number = 100;  // Cada cuántos milisegundos se recalcula el crono

  crono: Crono

  iniciado: boolean; //Si el crono está iniciado
  pausado: boolean; //Si el crono está en pausa


  constructor() {
    this.iniciado = false;
    this.pausado = false;
    this.crono = {
      horas: 0,
      minutos: 0,
      segundos: 0,
      tiempototal: 0
    };

  }

  setDuracion(minutos) {
    this.duracion = minutos;
  }

  iniciar() {
    this.iniciado = true;
    this.pausado = false;
    this.crono_id = setInterval(this.calcTime.bind(this), this.precision);
  }

  pausar() {
    clearInterval(this.crono_id);
    this.pausado = true;
  }

  reanudar() {
    this.crono_id = setInterval(this.calcTime.bind(this), this.precision);
    this.pausado = false;
  }

  estaIniciado(): boolean {
    return this.iniciado;
  }

  estaPausado(): boolean {
    return this.pausado;
  }

  getCrono(): Crono {
      return this.crono;
  }


  calcTime(): any {
    //let tiempoactual = new Date();
    //let milisegundos = tiempoactual.getTime() - this.timestamps.inicioprimertiempo.getTime();

    this.crono.tiempototal = this.crono.tiempototal + this.precision;
    let segundos_aux = (this.crono.tiempototal / 1000);
    this.crono.segundos = Math.floor(segundos_aux) % 60;
    let minutos_aux = Math.floor(segundos_aux / 60);
    this.crono.minutos = Math.floor(minutos_aux % 60);
    this.crono.horas = Math.floor(minutos_aux / 60);
  }

}
