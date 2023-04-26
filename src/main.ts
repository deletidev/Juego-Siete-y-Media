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
const showScore = (): void => {
  const score = document.getElementById('score');
  if (score) {
    score.innerHTML = scoreValue.toString();
  } else {
    console.error('showScore: no ha encontrado el elemento con id score');
  }
};

//Numero aleatorio
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

  const imgCard = document.getElementById('card-new');

  if (imgCard && imgCard instanceof HTMLImageElement) {
    imgCard.src = url;
  } else {
    console.error('No se ha encontrado la imagen con id card-new');
  }
};

//Mensaje
//comprobar el numero
const checkNumber = (numero: number): States => {
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

// muestraMensajeDeComprobacion
const showMessage = (state: States): void => {
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

  const solution = document.getElementById('solution');

  if (solution) {
    solution.classList.add('display--opacity');
    solution.innerHTML = mensaje;
  } else {
    console.error('showMessage: no encuentra el elemento con id solution');
  }
};

//GameOVER
const gameOver = (num: number) => {
  if (num > 7.5) {
    const state: States = checkNumber(scoreValue);
    showMessage(state);
    btnShow('new-game');
    btnHiden('add-card');
    btnHiden('stand');
  }
};

//Dar carta
const giveMeCard = () => {
  //número aleatorio
  let newNumber: number = randomNumber(1, 10);

  //mostrar carta
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

  // mio
  const transitionElement = document.getElementById('card-transition');

  if (transitionElement) {
    transitionElement.classList.add('card__transition--move');
  } else {
    console.error('No se encuentra el elemento con id card-transition');
  }

  btnDisabled('add-card');
  btnDisabled('new-game');
};

//mio- Termina la transición
const transitionEnd = () => {
  const transitionElement = document.getElementById('card-transition');

  if (transitionElement) {
    transitionElement.classList.remove('card__transition--move');
  } else {
    console.error('No se encuentra el elemento con id card-transition');
  }

  const imgCard = document.getElementById('card-new');
  const imgCardRes = document.getElementById('card-prev');

  if (
    imgCard &&
    imgCard instanceof HTMLImageElement &&
    imgCardRes &&
    imgCardRes instanceof HTMLImageElement
  ) {
    imgCardRes.src = imgCard.src;

    imgCardRes.classList.remove('card--opacity');
  } else {
    console.error('No se encuentra el elemento con id card-new o card-prev');
  }

  btnEnabled('add-card');
  btnEnabled('new-game');
};

//mio apagar boton por la transición
const btnDisabled = (id: string): void => {
  const btn = document.getElementById(id);
  if (btn && btn instanceof HTMLButtonElement) {
    btn.disabled = true;
  } else {
    console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
  }
};

//mio encender boton por la transición
const btnEnabled = (id: string): void => {
  const btn = document.getElementById(id);
  if (btn && btn instanceof HTMLButtonElement) {
    btn.disabled = false;
  } else {
    console.error(`btnEnabled: No encuentra el <button> con id ${id}`);
  }
};

//mostrar Boton
const btnShow = (id: string): void => {
  const btn = document.getElementById(id);
  if (btn && btn instanceof HTMLButtonElement) {
    btn.classList.remove('btn--hiden');
  } else {
    console.error(`btnShow: No encuentra el <button> con id ${id}`);
  }
};

//Ocultar Boton
const btnHiden = (id: string): void => {
  const btn = document.getElementById(id);
  if (btn && btn instanceof HTMLButtonElement) {
    btn.classList.add('btn--hiden');
  } else {
    console.error(`btnHiden: No encuentra el <button> con id ${id}`);
  }
};

// Me planto
const stand = () => {
  const state: States = checkNumber(scoreValue);
  showMessage(state);

  btnShow('new-game');
  btnShow('next-move');
  btnHiden('add-card');
  btnHiden('stand');

  if (scoreValue === 7.5) {
    btnHiden('next-move');
  }
};

//Nueva partida
const newGame = () => {
  btnHiden('new-game');
  btnHiden('next-move');
  btnShow('add-card');
  btnShow('stand');
  btnEnabled('next-move');

  scoreValue = 0;
  showScore();

  const solution = document.getElementById('solution');
  if (solution) {
    solution.classList.remove('display--opacity');
  } else {
    console.error('No se ha encontrado el elemento con id solution');
  }
  const imgCardRes = document.getElementById('card-prev');
  if (imgCardRes) {
    imgCardRes.classList.add('card--opacity');
  } else {
    console.error('No se ha encontrado el elemento con id card-prev');
  }
};

document.addEventListener('DOMContentLoaded', showScore);

const addCard = document.getElementById('add-card');
const standBtn = document.getElementById('stand');
const newGameBtn = document.getElementById('new-game');
const nextMoveBtn = document.getElementById('next-move');

if (addCard && addCard instanceof HTMLButtonElement) {
  addCard.addEventListener('click', () => {
    giveMeCard();

    //mio
    const transitionElement = document.getElementById('card-transition');
    if (transitionElement) {
      transitionElement.addEventListener('transitionend', transitionEnd);
    } else {
      console.error('No se encuentra el elemento con id card-transition');
    }
  });
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
