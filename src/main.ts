import './style.css';

/* 1. Mostrar puntuación*/
/* 2. Pedir carta*/
/* 3. Sumar puntuación */
/* 4. Game over */
/* 5. Mensaje */
// Game over
// Si el usuario se pasa de 7,5 puntos, el juego termina y se muestra un mensaje de Game Over, además el usuario no puede seguir pidiendo cartas.
let scoreValue: number = 0;

//Contador
const showScore = (): void => {
  const score = document.getElementById('score');
  if (score) {
    score.innerHTML = scoreValue.toString();
  } else {
    console.error('showScore: no ha encontrado el elemento con id score');
  }
};

const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

//Carta
const showCard = (num: number) => {
  let url: string = '';
  switch (num) {
    case 1:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg ';
      break;
    case 2:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg ';
      break;
    case 3:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg ';
      break;
    case 4:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg ';
      break;
    case 5:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg ';
      break;
    case 6:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg ';
      break;
    case 7:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg ';
      break;
    case 10:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg ';
      break;
    case 11:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg ';
      break;
    case 12:
      url =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg ';
      break;
    default:
      break;
  }

  const imgCard = document.getElementById('prueba');

  if (imgCard && imgCard instanceof HTMLImageElement) {
    imgCard.src = url;
  }
};
//Mensaje
const mensaje = (numero: number) => {
  let mensaje: string = '';
  switch (true) {
    case numero < 5:
      mensaje = 'Has sido muy conservador';
      break;
    case numero >= 5 && numero < 6:
      mensaje = 'Te ha entrado el canguelo eh?';
      break;
    case numero >= 6 && numero <= 7:
      mensaje = 'Casi casí...';
      break;
    case numero === 7.5:
      mensaje = '¡Lo has clavado! ¡Enhorabuena!🎉🎉';
      break;
    case numero > 7.5:
      mensaje = 'Te has pasado. Game Over';
      break;
  }
  const solution = document.getElementById('solution');
  if (solution) {
    solution.classList.remove('game__display--oculto');
    solution.innerHTML = mensaje;
  }
};
//GameOVER
const gameOver = (num: number) => {
  if (num > 7.5) {
    mensaje(num);
    // btnHiden();
    // const addCard = document.getElementById('add-card');
    // const standBtn = document.getElementById('stand');
    btnToggle(document.getElementById('add-card'));
    btnToggle(document.getElementById('stand'));
    btnToggle(document.getElementById('new-game'));
    const nextMoveBtn = document.getElementById('next-move');
    if (nextMoveBtn && !nextMoveBtn.classList.contains('btn--hiden')) {
      btnToggle(document.getElementById('next-move'));
    }
  }
};

//Dar carta
const giveMeCard = () => {
  let newNumber: number = randomNumber(1, 10);
  console.log(newNumber);
  if (newNumber > 7) {
    showCard(newNumber + 2);
    newNumber = 0.5;
  } else {
    showCard(newNumber);
  }
  scoreValue = scoreValue + newNumber;
  showScore();

  //gameover
  gameOver(scoreValue);

  //mio
  document.getElementById('card-transition')?.classList.add('active');

  btnDisabled(document.getElementById('add-card'));
};

//mio- Termina la transición
const transitionEnd = () => {
  document.getElementById('card-transition')?.classList.remove('active');
  const imgCard = document.getElementById('prueba');
  const imgCardRes = document.getElementById('card-prev');

  if (
    imgCard &&
    imgCard instanceof HTMLImageElement &&
    imgCardRes &&
    imgCardRes instanceof HTMLImageElement
  ) {
    imgCardRes.src = imgCard.src;

    imgCardRes.classList.remove('game__display--oculto');
  }

  btnEnabled(document.getElementById('add-card'));
};

//mio apagar boton
const btnDisabled = (btn: HTMLElement | null): void => {
  if (btn && btn instanceof HTMLButtonElement) {
    btn.disabled = true;
  } else {
    console.error(`btnDisabled: no encuentra el <button> con id ${btn?.id} `);
  }
};

//mio encender boton
const btnEnabled = (btn: HTMLElement | null): void => {
  if (btn && btn instanceof HTMLButtonElement) {
    btn.disabled = false;
  } else {
    console.error(`btnEnabled: no encuentra el <button> con id ${btn?.id} `);
  }
};

//mostrar u ocultar botones
const btnToggle = (btn: HTMLElement | null): void => {
  if (btn) {
    btn.classList.toggle('btn--hiden');
  } else {
    //error
    console.error(`btnHiden: no encuentra el <button> con id ${btn} `);
  }
};

//Me planto
const stand = () => {
  mensaje(scoreValue);

  //Esto se repite en game over
  btnToggle(document.getElementById('add-card'));
  btnToggle(document.getElementById('stand'));
  btnToggle(document.getElementById('new-game'));
  if (scoreValue !== 7.5) {
    btnToggle(document.getElementById('next-move'));
  }
};

//Nueva partida
const newGame = () => {
  btnToggle(document.getElementById('add-card'));
  btnToggle(document.getElementById('stand'));
  btnToggle(document.getElementById('new-game'));
  const nextMoveBtn = document.getElementById('next-move');
  if (nextMoveBtn && !nextMoveBtn.classList.contains('btn--hiden')) {
    btnToggle(document.getElementById('next-move'));
  }
  scoreValue = 0;
  showScore();
  const solution = document.getElementById('solution');
  if (solution) {
    solution.classList.add('game__display--oculto');
  }
  const imgCardRes = document.getElementById('card-prev');
  imgCardRes?.classList.add('game__display--oculto');
};

document.addEventListener('DOMContentLoaded', showScore);

const addCard = document.getElementById('add-card');
const standBtn = document.getElementById('stand');
const newGameBtn = document.getElementById('new-game');
const nextMoveBtn = document.getElementById('next-move');

addCard?.addEventListener('click', () => {
  giveMeCard();
  //mio
  document
    .getElementById('card-transition')
    ?.addEventListener('transitionend', transitionEnd);
});

standBtn?.addEventListener('click', stand);

//depende de la transicion, tema carta que vuelve
newGameBtn?.addEventListener('click', newGame);

//
nextMoveBtn?.addEventListener('click', () => {
  giveMeCard();
  //mio
  document
    .getElementById('card-transition')
    ?.addEventListener('transitionend', transitionEnd);
  mensaje(scoreValue);
  gameOver(scoreValue);
});

// if (addCard) {
//   addCard.addEventListener('click', () => {
//     giveMeCard();
//     const cardTransition = document.getElementById('card-transition');
//     if (cardTransition) {
//       cardTransition.addEventListener('transitionend', transitionEnd);
//     } else {
//       console.error('no se encuentra el elemento con id card-transition');
//     }
//   });
// } else {
//   console.error('no se encuentra el elemento con id add-card');
// }
