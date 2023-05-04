import './style.css';

//Puntuación
let scoreValue: number = 0;
type States =
  | 'LESS_THAN_FOUR'
  | 'BETWEEN_FOUR_AND_SIX'
  | 'BETWEEN_SIX_AND_SEVEN'
  | 'SEVEN_AND_A_HALF'
  | 'GAME_OVER'
  | 'IMPOSIBLE';

//Contador
const showScore = (scoreNumber: number): void => {
  const score = document.getElementById('score');
  score && score instanceof HTMLElement
    ? (score.innerHTML = scoreNumber.toString())
    : console.error('showScore: no ha encontrado el elemento con id score');
};

//Numero aleatorio
const randomNumber = (min: number, max: number): number =>
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
const newUrlImgCard = (num: number): string => {
  let img = '';

  num > 7 ? (img = urlCard(num + 2)) : (img = urlCard(num));

  return img;
};

//Actualizo la url de la img
const showTransitionCard = (img: string): void => {
  const imgCard = document.getElementById('card-new');

  imgCard && imgCard instanceof HTMLImageElement
    ? (imgCard.src = img)
    : console.error('No se ha encontrado la imagen con id card-new');
};

//Devuelvo el stado del mensaje
const getState = (numero: number): States => {
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
const generateMessage = (state: States): string => {
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

// muestraMensajeDeComprobacion
const showMessage = (menssage: string): void => {
  const solution = document.getElementById('solution');

  if (solution && solution instanceof HTMLElement) {
    solution.classList.add('display__solution--show');
    solution.innerHTML = menssage;
  } else {
    console.error('showMessage: no encuentra el elemento con id solution');
  }
};

//Miro si lleva 7.5 o si se ha pasado
const checkHand = (num: number): void => {
  if (num === 7.5 || num > 7.5) {
    const state: States = getState(scoreValue);
    const menssage: string = generateMessage(state);
    showMessage(menssage);
    btnShow('new-game');
    btnHiden('add-card');
    btnHiden('stand');
  }
};

//Crear la transición
const transitionAdd = (): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement
    ? transitionElement.classList.add('card__transition--move')
    : console.error('No se encuentra el elemento con id card-transition');
};

//eliminar la transición
const transitionReset = (): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement
    ? transitionElement.classList.remove('card__transition--move')
    : console.error('No se encuentra el elemento con id card-transition');
};

//mostrar carta de abajo
const showTableCard = (img: string): void => {
  const imgCardRes = document.getElementById('card-prev');

  if (imgCardRes && imgCardRes instanceof HTMLImageElement) {
    imgCardRes.src = img;
    imgCardRes.classList.remove('card--opacity');
  } else {
    console.error('No se encuentra el elemento con id card-new o card-prev');
  }
};

// Termina la transición
const transitionEnd = (img: string): void => {
  //reseteo la transición
  transitionReset();

  //Muestro la carta nueva, la carta de abajo
  showTableCard(img);

  btnEnabled('add-card');
  btnEnabled('new-game');
};

//Creo evento transitionoEnd
const transitionEvent = (img: string): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.addEventListener('transitionend', () =>
        transitionEnd(img)
      )
    : console.error('No se encuentra el elemento con id card-transition');
};

//mio apagar boton por la transición
const btnDisabled = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? (btn.disabled = true)
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//mio encender boton por la transición
const btnEnabled = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? (btn.disabled = false)
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//mostrar Boton
const btnShow = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? btn.classList.remove('btn--hiden')
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//Ocultar Boton
const btnHiden = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? btn.classList.add('btn--hiden')
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//SolutionShow
const solutionShow = (): void => {
  const solution = document.getElementById('solution');
  solution && solution instanceof HTMLElement
    ? solution.classList.remove('display__solution--show')
    : console.error('No se ha encontrado el elemento con id solution');
};

//Ocultar img
const imgHide = (): void => {
  const imgCardRes = document.getElementById('card-prev');
  imgCardRes && imgCardRes instanceof HTMLElement
    ? imgCardRes.classList.add('card--opacity')
    : console.error('No se ha encontrado el elemento con id card-prev');
};

//Dar carta
const giveMeCard = (): void => {
  // creo numero random;
  let newNumber: number = randomNumber(1, 10);

  //recibo mi URL de la img de la carta
  let img = newUrlImgCard(newNumber);

  //Veo la carta
  showTransitionCard(img);

  //Hago la transición
  transitionAdd();

  //desabilito botones durante la transición
  btnDisabled('add-card');
  btnDisabled('new-game');

  //Actualizo puntuación
  newNumber > 7
    ? (scoreValue = scoreValue + 0.5)
    : (scoreValue = scoreValue + newNumber);

  //mostrar puntos
  showScore(scoreValue);

  //compruebo la mano
  checkHand(scoreValue);

  //compruebo que termina la transición para poder interactuar
  transitionEvent(img);
};

// Me planto
const stand = (): void => {
  const state: States = getState(scoreValue);
  const menssage: string = generateMessage(state);
  showMessage(menssage);

  btnShow('new-game');
  btnShow('next-move');
  btnHiden('add-card');
  btnHiden('stand');
};

//Nueva partida
const newGame = (): void => {
  btnHiden('new-game');
  btnHiden('next-move');
  btnShow('add-card');
  btnShow('stand');
  btnEnabled('next-move');

  scoreValue = 0;
  showScore(scoreValue);

  solutionShow();
  imgHide();
};

document.addEventListener('DOMContentLoaded', () => {
  showScore(scoreValue);
});

const addCard = document.getElementById('add-card');
const standBtn = document.getElementById('stand');
const newGameBtn = document.getElementById('new-game');
const nextMoveBtn = document.getElementById('next-move');

if (addCard && addCard instanceof HTMLButtonElement) {
  addCard.addEventListener('click', giveMeCard);
}

if (standBtn && standBtn instanceof HTMLButtonElement) {
  standBtn.addEventListener('click', stand);
}

if (newGameBtn && newGameBtn instanceof HTMLButtonElement) {
  newGameBtn.addEventListener('click', newGame);
}

if (nextMoveBtn && nextMoveBtn instanceof HTMLButtonElement) {
  nextMoveBtn.addEventListener('click', () => {
    giveMeCard();

    //Sólo permito ver un movimiento más
    btnDisabled('next-move');
  });
}
