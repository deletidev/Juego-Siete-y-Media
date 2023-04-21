import './style.css';

/* 1. Mostrar puntuación*/
/* 2. Pedir carta*/
const scoreValue: number = 0;

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

const giveMeCard = () => {
  const newNumber: number = randomNumber(1, 10);
  console.log(newNumber);
  if (newNumber > 7) {
    showCard(newNumber + 2);
  } else {
    showCard(newNumber);
  }

  //mio
  document.getElementById('card-transition')?.classList.add('active');
  const addCard = document.getElementById('add-card');
  if (addCard && addCard instanceof HTMLButtonElement) {
    addCard.disabled = true;
  }
};

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
  }
  const addCard = document.getElementById('add-card');
  if (addCard && addCard instanceof HTMLButtonElement) {
    addCard.disabled = false;
  }
};

document.addEventListener('DOMContentLoaded', showScore);

//mio

const addCard = document.getElementById('add-card');

addCard?.addEventListener('click', () => {
  giveMeCard();
  const cardTransition = document.getElementById('card-transition');
  cardTransition?.addEventListener('transitionend', transitionEnd);
});
