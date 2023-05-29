//Puntuación
interface Partida {
  scoreValue: number;
  state: States;
  message: string;
}
interface PuntosPartida {
  MIN_SCORE: number;
  SEIS_COPAS: number;
  SIETE_COPAS: number;
  DIEZ_COPAS: number;
  MAX_TOTAL_SCORE: number;
}

export const partida: Partida = {
  scoreValue: 0,
  state: 'LESS_THAN_FOUR',
  message: ''
};

export type States =
  | 'LESS_THAN_FOUR'
  | 'BETWEEN_FOUR_AND_SIX'
  | 'BETWEEN_SIX_AND_SEVEN'
  | 'SEVEN_AND_A_HALF'
  | 'GAME_OVER'
  | 'IMPOSIBLE';

export const puntosPartida: PuntosPartida = {
  MIN_SCORE: 4,
  SEIS_COPAS: 6,
  SIETE_COPAS: 7,
  DIEZ_COPAS: 10,
  MAX_TOTAL_SCORE: 7.5
};

// Cambio el estado del objeto partida
export const setState = (newState: States): States =>
  (partida.state = newState);

// Cambio el mensaje del objeto partida
export const setMessage = (newMessage: string): string =>
  (partida.message = newMessage);

// Cambio el scorVlue del objeto partida
export const setScore = (newScore: number): number =>
  (partida.scoreValue = newScore);
