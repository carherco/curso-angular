import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ClientesComponent {
  

}


export class ProveedoresComponent {
  tiposVia: TiposVia[];

  constructor(private dataService: DataService) {

    this.dataService.datos$.subscribe(
      datos => {
        this.provincias = datos.provincias;
        this.paises = datos.paises;
      }
    );
    this.dataService.load(['Provincias', 'Paises' ]);
  }
}


let sharedData = {
  tiposVia: [...],
  paises: [
    {id: 1, nombre: 'España', provincias: null },
    {id: 1, nombre: 'Francia', provincias: null },
    {id: 1, nombre: 'Alemania', provincias: null },
  ]
}