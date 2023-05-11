import { partida, puntosPartida } from './modelo';
import {
  randomNumber,
  newUrlImgCard,
  getState,
  generateMessage,
  sumCoins
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

  if (solution && solution instanceof HTMLElement) {
    solution.innerHTML = menssage;
  } else {
    console.error('showMessage: no encuentra el elemento con id solution');
  }
};

// muestraMensajeDeComprobacion
const showMessage = (): void => {
  const solution = document.getElementById('solution');

  if (solution && solution instanceof HTMLElement) {
    solution.classList.add('display__solution--show');
  } else {
    console.error('showMessage: no encuentra el elemento con id solution');
  }
};

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
    partida.state = getState(partida.scoreValue);
    partida.message = generateMessage(partida.state);
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

  if (imgCardRes && imgCardRes instanceof HTMLImageElement) {
    imgCardRes.src = img;
  } else {
    console.error('No se encuentra el elemento con id card-new o card-prev');
  }
};

//mostrar carta de abajo
const showTableCard = (): void => {
  const imgCardRes = document.getElementById('card-prev');

  if (imgCardRes && imgCardRes instanceof HTMLImageElement) {
    imgCardRes.classList.remove('card--opacity');
  } else {
    console.error('No se encuentra el elemento con id card-new o card-prev');
  }
};

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
  let newNumber: number = randomNumber(1, 10);

  //recibo mi URL de la img de la carta
  let img = newUrlImgCard(newNumber);

  //Veo la carta
  urlTransitionCard(img);

  //Hago la transición
  transitionAdd();

  //desabilito botones durante la transición
  transitionBtns();

  //Actualizo puntuación
  sumCoins(newNumber);

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
  partida.state = getState(partida.scoreValue);
  partida.message = generateMessage(partida.state);
  solutionMessage(partida.message);
  showMessage();
  stateBtns();
};

//Nueva partida
export const newGame = (): void => {
  newGameBtns();

  partida.scoreValue = 0;
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
