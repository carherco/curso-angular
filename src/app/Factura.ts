export class Factura {
  
  constructor(
    public id: number,
    public fecha: Date,
    public cliente: Cliente,
    public pedidos: Pedido[],
    public pedidosPapel: PedidosPapel[],
    public totalFactura: number
  ) { }
}

export class Cliente {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: string
  ) {}
}

export class Pedido {
  constructor(
    public id: number,
    public articulos: Articulo[]
  ) {}
}

export class Articulo {
  constructor(
    public id: number,
    public nombre: string,
    public precio: number,
    public seleccionado: boolean,
  ) {}
}

export class PedidosPapel {
  constructor(
    public id: number,
    public nombre: string,
    public precio: number,
    public seleccionado: boolean
  ) {}
}

export const factura: Factura = {
  id: 1,
  fecha: new Date(),
  cliente: {
    id: 1,
    nombre: "Carlos Herrera",
    direccion: "calle dfasdads"
  },
  pedidosPapel: [
    { id: 1, nombre: 'ABC', precio: 200, seleccionado: true },
    { id: 2, nombre: 'Marca', precio: 200, seleccionado: true },
  ],
  pedidos: [
    { 
      id: 1,
      articulos: [
        {id: 1, nombre: 'bicicleta', precio: 230, seleccionado: true},
        {id: 2, nombre: 'monopatín', precio: 40, seleccionado: true},
        {id: 3, nombre: 'balón', precio: 20, seleccionado: true},
      ]
    },
    { 
      id: 2,
      articulos: [
        {id: 4, nombre: 'raqueta tenis', precio: 40, seleccionado: true},
        {id: 5, nombre: 'raqueta pádel', precio: 40, seleccionado: true},
        {id: 6, nombre: 'raqueta frontón', precio: 40, seleccionado: true},
        {id: 7, nombre: 'raqueta squash', precio: 40, seleccionado: true},
        {id: 8, nombre: 'raqueta bádminton', precio: 40, seleccionado: true},
      ]
    },
    { 
      id: 3,
      articulos: [
        {id: 9, nombre: 'pelotas pádel', precio: 15, seleccionado: true},
        {id: 10, nombre: 'pelotas tenis', precio: 15, seleccionado: true},
        {id: 11, nombre: 'pelotas frontón', precio: 15, seleccionado: true},
      ]
    }
  ],
  totalFactura: 0
}
