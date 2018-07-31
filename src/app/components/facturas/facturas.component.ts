import { Component, OnInit } from '@angular/core';
import { Factura } from "app/Factura";

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  factura: Factura;

  constructor() {
    this.factura = this.factura;
   }

  ngOnInit() {
  }

  ngDoCheck() {
    let total = 0;
    for (let p of this.factura.pedidosPapel) {
      if(p.seleccionado) {
        total += p.precio;
      }  
    }
    for (let p of this.factura.pedidos) {
      for (let a of p.articulos) {
        if(a.seleccionado) {
          total += a.precio;
        }  
      }
    }
    this.factura.totalFactura = total;
  }

  togglePedido(pedido, value) {
    for (let a of pedido.articulos) {
        //console.log(event);
        a.seleccionado = value;
      }  
  }

}
