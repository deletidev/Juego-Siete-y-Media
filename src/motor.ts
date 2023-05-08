import { States } from './modelo';

//Numero aleatorio
export const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

//CartaUrl
const urlCard = (num: number): string => {
  let urlName: string = '';
  switch (num) {
    case 1:
      urlName = '1_as-copas.jpg ';
      break;
    case 2:
      urlName = '2_dos-copas.jpg ';
      break;
    case 3:
      urlName = '3_tres-copas.jpg ';
      break;
    case 4:
      urlName = '4_cuatro-copas.jpg ';
      break;
    case 5:
      urlName = '5_cinco-copas.jpg ';
      break;
    case 6:
      urlName = '6_seis-copas.jpg ';
      break;
    case 7:
      urlName = '7_siete-copas.jpg ';
      break;
    case 10:
      urlName = '10_sota-copas.jpg ';
      break;
    case 11:
      urlName = '11_caballo-copas.jpg ';
      break;
    case 12:
      urlName = '12_rey-copas.jpg ';
      break;
    default:
      break;
  }

  let url: string = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${urlName}`;
  return url;
};

//creo la url de la img
export const newUrlImgCard = (num: number): string => {
  let img = '';

  num > 7 ? (img = urlCard(num + 2)) : (img = urlCard(num));

  return img;
};

//Devuelvo el stado del mensaje
export const getState = (numero: number): States => {
  if (numero < 4) {
    return 'LESS_THAN_FOUR';
  }
  if (numero >= 4 && numero < 6) {
    return 'BETWEEN_FOUR_AND_SIX';
  }
  if (numero >= 6 && numero <= 7) {
    return 'BETWEEN_SIX_AND_SEVEN';
  }
  if (numero === 7.5) {
    return 'SEVEN_AND_A_HALF';
  }
  if (numero > 7.5) {
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
