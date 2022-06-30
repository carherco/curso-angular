import { EQUIPOS } from './equipos';
import { Partido } from 'src/app/model/partido';

export const PARTIDOS: Partido[] = [
  { id: 1, equipo_local: EQUIPOS[0], equipo_visitante: EQUIPOS[1] },
  { id: 2, equipo_local: EQUIPOS[2], equipo_visitante: EQUIPOS[3] },
  { id: 3, equipo_local: EQUIPOS[4], equipo_visitante: EQUIPOS[5] },
  { id: 4, equipo_local: EQUIPOS[6], equipo_visitante: EQUIPOS[7] },
];
