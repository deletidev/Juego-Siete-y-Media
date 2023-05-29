import {
  partida,
  puntosPartida,
  setState,
  setScore,
  setMessage
} from './modelo';

import {
  randomNumber,
  cardNumber,
  getState,
  generateMessage,
  cardValue
} from './motor';

//apagar boton
export const btnDisabled = (id: string): void => {
  const btn = document.getElementById(id);
  btn && btn instanceof HTMLButtonElement
    ? (btn.disabled = true)
    : console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
};

//encender boton
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

//Ver contador
export const showScore = (scoreNumber: number): void => {
  const score = document.getElementById('score');
  score && score instanceof HTMLElement
    ? (score.innerHTML = scoreNumber.toString())
    : console.error('showScore: no ha encontrado el elemento con id score');
};

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

//Actualizo la url de la img de la transicion
const urlTransitionCard = (img: string): void => {
  const imgCard = document.getElementById('card-new');

  imgCard && imgCard instanceof HTMLImageElement
    ? (imgCard.src = img)
    : console.error('No se ha encontrado la imagen con id card-new');
};

// Actualizo el mensaje
const solutionMessage = (menssage: string): void => {
  const solution = document.getElementById('solution');

  solution && solution instanceof HTMLElement
    ? (solution.innerHTML = menssage)
    : console.error('showMessage: no encuentra el elemento con id solution');
};

// muestraMensajeDeComprobacion
const showMessage = (): void => {
  const solution = document.getElementById('solution');

  solution && solution instanceof HTMLElement
    ? solution.classList.add('display__solution--show')
    : console.error('showMessage: no encuentra el elemento con id solution');
};

//Botones tras comprobar la mano
const checkHandBtns = () => {
  btnShow('new-game');
  btnHiden('add-card');
  btnHiden('stand');
};

//Miro si lleva 7.5 o si se ha pasado
const checkHand = (num: number): void => {
  if (
    num === puntosPartida.MAX_TOTAL_SCORE ||
    num > puntosPartida.MAX_TOTAL_SCORE
  ) {
    setState(getState(partida.scoreValue));
    setMessage(generateMessage(partida.state));
    solutionMessage(partida.message);
    showMessage();
    checkHandBtns();
  }
};

//Crear la transición
const transitionAdd = (): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.classList.add('card__transition--move')
    : console.error('No se encuentra el elemento con id card-transition');
};

//eliminar la transición
const transitionReset = (): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.classList.remove('card__transition--move')
    : console.error('No se encuentra el elemento con id card-transition');
};

//Actualizo url de la carta de abajo
const urlTableCard = (img: string): void => {
  const imgCardRes = document.getElementById('card-prev');

  imgCardRes && imgCardRes instanceof HTMLImageElement
    ? (imgCardRes.src = img)
    : console.error('No se encuentra el elemento con id card-new o card-prev');
};

//mostrar carta de abajo
const showTableCard = (): void => {
  const imgCardRes = document.getElementById('card-prev');

  imgCardRes && imgCardRes instanceof HTMLImageElement
    ? imgCardRes.classList.remove('card--opacity')
    : console.error('No se encuentra el elemento con id card-new o card-prev');
};

// botones al terminar la transición
const transitionEndBtns = () => {
  btnEnabled('add-card');
  btnEnabled('new-game');
};

// Termina la transición
const transitionEnd = (img: string): void => {
  //reseteo la transición
  transitionReset();

  //Actualizo url de la carta de abajo
  urlTableCard(img);

  //Muestro la carta nueva, la carta de abajo
  showTableCard();

  //Habilito botones
  transitionEndBtns();
};

//Creo evento transitionEnd
const transitionEvent = (img: string): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.addEventListener('transitionend', () =>
        transitionEnd(img)
      )
    : console.error('No se encuentra el elemento con id card-transition');
};

//oculto el mensaje
const solutionHide = (): void => {
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

const transitionBtns = () => {
  btnDisabled('add-card');
  btnDisabled('new-game');
};

//Dar carta
export const giveMeCard = (): void => {
  // creo numero random;
  let newNumber: number = cardNumber(randomNumber(1, 10));

  //recibo mi URL de la img de la carta
  let img = urlCard(newNumber);

  //Veo la carta
  urlTransitionCard(img);

  //Hago la transición
  transitionAdd();

  //deshabilito botones durante la transición
  transitionBtns();

  //Le doy valor a la carta
  const newValue = cardValue(newNumber);

  //Actualizo puntuación
  setScore(partida.scoreValue + newValue);

  //mostrar puntos
  showScore(partida.scoreValue);

  //compruebo la mano
  checkHand(partida.scoreValue);

  //compruebo que termina la transición para poder interactuar
  transitionEvent(img);
};

const newGameBtns = () => {
  btnHiden('new-game');
  btnHiden('next-move');
  btnShow('add-card');
  btnShow('stand');
  btnEnabled('next-move');
};

const stateBtns = () => {
  btnShow('new-game');
  btnShow('next-move');
  btnHiden('add-card');
  btnHiden('stand');
};

// Me planto
export const stand = (): void => {
  setState(getState(partida.scoreValue));
  setMessage(generateMessage(partida.state));
  solutionMessage(partida.message);
  showMessage();
  stateBtns();
};

//Nueva partida
export const newGame = (): void => {
  //Botones inicio partida
  newGameBtns();

  //reseteo objeto partida
  setScore(0);
  setState(getState(partida.scoreValue));
  setMessage(generateMessage(partida.state));

  //muestro nueva puntuación
  showScore(partida.scoreValue);
  //Oculto el mensaje
  solutionHide();

  //limpio el mensaje
  solutionMessage('');

  //Oculto la img
  imgHide();

  //Reseteo las url de las img
  urlTransitionCard('');
  urlTableCard('');
};
