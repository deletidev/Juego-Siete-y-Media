import { partida, States } from './modelo';
import {
  randomNumber,
  newUrlImgCard,
  getState,
  generateMessage
} from './motor';

//Ver contador
export const showScore = (scoreNumber: number): void => {
  const score = document.getElementById('score');
  score && score instanceof HTMLElement
    ? (score.innerHTML = scoreNumber.toString())
    : console.error('showScore: no ha encontrado el elemento con id score');
};

//Actualizo la url de la img
const showTransitionCard = (img: string): void => {
  const imgCard = document.getElementById('card-new');

  imgCard && imgCard instanceof HTMLImageElement
    ? (imgCard.src = img)
    : console.error('No se ha encontrado la imagen con id card-new');
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
    const state: States = getState(partida.scoreValue);
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

//Creo evento transitionEnd
const transitionEvent = (img: string): void => {
  const transitionElement = document.getElementById('card-transition');
  transitionElement && transitionElement instanceof HTMLElement
    ? transitionElement.addEventListener('transitionend', () =>
        transitionEnd(img)
      )
    : console.error('No se encuentra el elemento con id card-transition');
};

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

//Muestro mensaje
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
export const giveMeCard = (): void => {
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
    ? (partida.scoreValue = partida.scoreValue + 0.5)
    : (partida.scoreValue = partida.scoreValue + newNumber);

  //mostrar puntos
  showScore(partida.scoreValue);

  //compruebo la mano
  checkHand(partida.scoreValue);

  //compruebo que termina la transición para poder interactuar
  transitionEvent(img);
};

// Me planto
export const stand = (): void => {
  const state: States = getState(partida.scoreValue);
  const menssage: string = generateMessage(state);
  showMessage(menssage);

  btnShow('new-game');
  btnShow('next-move');
  btnHiden('add-card');
  btnHiden('stand');
};

//Nueva partida
export const newGame = (): void => {
  //los meto en nuevaPartidaBotones
  btnHiden('new-game');
  btnHiden('next-move');
  btnShow('add-card');
  btnShow('stand');
  btnEnabled('next-move');

  //tendría que separar esto new game motor?
  partida.scoreValue = 0;

  showScore(partida.scoreValue);

  solutionShow();
  imgHide();
};
