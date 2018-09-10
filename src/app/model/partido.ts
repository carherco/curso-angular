export class Partido {

    constructor(
        public id: number,
        public equipo_local: string,
        public equipo_visitante: string,
        public marcador_local?: number,
        public marcador_visitante?: number,
        public duracion?: number,
        public hora?: string,
        public terminado?: string,
        public color_local?: string,
        public color_visitante?:string,
        public infocrono?: any,
    ) {

    }
}
