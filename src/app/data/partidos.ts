import { EQUIPOS } from './equipos';
import { Partido } from 'app/model/partido';

export const PARTIDOS: Partido[] = [
  { id: 1, equipo_local: EQUIPOS[0].nombre, equipo_visitante: EQUIPOS[1].nombre },
  { id: 2, equipo_local: EQUIPOS[2].nombre, equipo_visitante: EQUIPOS[3].nombre },
  { id: 3, equipo_local: EQUIPOS[4].nombre, equipo_visitante: EQUIPOS[5].nombre },
  { id: 4, equipo_local: EQUIPOS[6].nombre, equipo_visitante: EQUIPOS[7].nombre },
];
