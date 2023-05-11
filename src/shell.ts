import { partida } from './modelo';
import { giveMeCard, stand, newGame, btnDisabled, showScore } from './ui';

const initBtns = () => {
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
};

export const initGame = () => {
  //Pongo el 0
  showScore(partida.scoreValue);

  //Me aseguro de que estén los botones
  initBtns();
};

document.addEventListener('DOMContentLoaded', initGame);
