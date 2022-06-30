import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/model/partido';
import { CronoService } from 'src/app/services/crono.service';
import { PARTIDOS } from 'src/app/data/partidos';
import { Equipo } from 'src/app/model/equipo';

@Component({
  selector: 'app-crono',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.css']
})
export class CronoComponent implements OnInit {

    partido: Partido;
    inicio!: Date;
    tiempoactual!: Date;
    minuto: any;

    navCtrl: any;
    navParams: any;
    alertCtrl: any;
    partidosProvider: any;
    session: any;
    user: any;

    constructor(public cronoService: CronoService) {
        this.partido = PARTIDOS[0];
        this.partido.marcador_local = 0;
        this.partido.marcador_visitante = 0;
        this.cronoService.setDuracion(this.partido.duracion!);
    }

    ngOnInit() {

    }


    openAnotarGol(equipo: Equipo, equiporival: Equipo) {

            this.navCtrl.push('AnotarGolPage', {
                partido: this.partido,
                equipo: equipo,
                equiporival: equiporival
            });
    }

    openAnotarTarjetaAmarilla(equipo: Equipo) {

            this.navCtrl.push('AnotarTarjetaAmarillaPage', {
                partido: this.partido,
                equipo: equipo
            });
    }

    openAnotarTarjetaRoja(equipo: Equipo) {

            this.navCtrl.push('AnotarTarjetaRojaPage', {
                partido: this.partido,
                equipo: equipo
            });
    }

    detenercrono() {
        this.cronoService.pausar();
    }

    reanudarcrono() {
        this.cronoService.reanudar();
    }

    iniciarcrono() {
        this.cronoService.iniciar();
    }

}
