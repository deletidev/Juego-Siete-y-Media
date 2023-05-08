//Puntuación
interface Partida {
  scoreValue: number;
}

export const partida: Partida = {
  scoreValue: 0
};

export type States =
  | 'LESS_THAN_FOUR'
  | 'BETWEEN_FOUR_AND_SIX'
  | 'BETWEEN_SIX_AND_SEVEN'
  | 'SEVEN_AND_A_HALF'
  | 'GAME_OVER'
  | 'IMPOSIBLE';
