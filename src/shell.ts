import { partida } from './modelo';

import { showScore, giveMeCard, stand, newGame, btnDisabled } from './ui';

document.addEventListener('DOMContentLoaded', () => {
  //o new game
  showScore(partida.scoreValue);
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
