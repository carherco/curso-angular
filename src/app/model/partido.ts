import { ThemePalette } from '@angular/material/core';
import { Equipo } from './equipo';

export class Partido {

    constructor(
        public id: number,
        public equipo_local: Equipo,
        public equipo_visitante: Equipo,
        public marcador_local?: number,
        public marcador_visitante?: number,
        public duracion?: number,
        public hora?: string,
        public terminado?: string,
        public color_local?: ThemePalette,
        public color_visitante?: ThemePalette,
        public infocrono?: any,
    ) {

    }
}
