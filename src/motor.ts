import { States, puntosPartida } from './modelo';

//Número aleatorio
export const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Número mayor que 7
export const cardNumber = (number: number): number => {
  return number > puntosPartida.SIETE_COPAS ? number + 2 : number;
};

//Devuelvo el stado del mensaje
export const getState = (numero: number): States => {
  if (numero < puntosPartida.MIN_SCORE) {
    return 'LESS_THAN_FOUR';
  }
  if (numero >= puntosPartida.MIN_SCORE && numero < puntosPartida.SEIS_COPAS) {
    return 'BETWEEN_FOUR_AND_SIX';
  }
  if (
    numero >= puntosPartida.SEIS_COPAS &&
    numero <= puntosPartida.SIETE_COPAS
  ) {
    return 'BETWEEN_SIX_AND_SEVEN';
  }
  if (numero === puntosPartida.MAX_TOTAL_SCORE) {
    return 'SEVEN_AND_A_HALF';
  }
  if (numero > puntosPartida.MAX_TOTAL_SCORE) {
    return 'GAME_OVER';
  }
  return 'IMPOSIBLE';
};

// genero el mensaje
export const generateMessage = (state: States): string => {
  let mensaje: string = '';

  switch (state) {
    case 'LESS_THAN_FOUR':
      mensaje = 'Has sido muy conservador';
      break;
    case 'BETWEEN_FOUR_AND_SIX':
      mensaje = 'Te ha entrado el canguelo eh?';
      break;
    case 'BETWEEN_SIX_AND_SEVEN':
      mensaje = 'Casi casí...';
      break;
    case 'SEVEN_AND_A_HALF':
      mensaje = '¡Lo has clavado! ¡Enhorabuena!🎉🎉';
      break;
    case 'GAME_OVER':
      mensaje = 'Te has pasado.</br> Game Over';
      break;
    case 'IMPOSIBLE':
      mensaje = `¿No hay numero?`;
      break;
    default:
      mensaje = `No sé cómo has llegado aquí`;
      break;
  }

  return mensaje;
};

// Valor de la carta para la puntuación
export const cardValue = (newNumber: number): number =>
  newNumber > puntosPartida.SIETE_COPAS ? 0.5 : newNumber;
