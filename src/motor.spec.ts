import { getState, cardNumber, cardValue } from './motor';
import { States } from './modelo';

describe('getState', () => {
  it('Debería devolver SEVEN_AND_A_HALF si los puntos son 7.5', () => {
    //Arrange
    const score: number = 7.5;
    const expected: States = 'SEVEN_AND_A_HALF';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('Debería devolver GAME_OVER si los puntos son 8', () => {
    //Arrange
    const score: number = 8;
    const expected: States = 'GAME_OVER';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('Debería devolver LESS_THAN_FOUR si los puntos son 3.5', () => {
    //Arrange
    const score: number = 3.5;
    const expected: States = 'LESS_THAN_FOUR';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('Debería devolver BETWEEN_FOUR_AND_SIX si los puntos son 5', () => {
    //Arrange
    const score: number = 5;
    const expected: States = 'BETWEEN_FOUR_AND_SIX';
    //Act
    const result = getState(score);
    //Asssert
    expect(result).toBe(expected);
  });

  it('Debería devolver BETWEEN_SIX_AND_SEVEN si los puntos son 6.5', () => {
    //Arrange
    const score: number = 6.5;
    const expected: States = 'BETWEEN_SIX_AND_SEVEN';

    //Act
    const result = getState(score);

    //Asssert
    expect(result).toBe(expected);
  });
});

describe('cardNumber', () => {
  it('Debería devolver 10 si el número es 8', () => {
    //Arrange
    const number = 8;
    const esperado = 10;
    //Act
    const result = cardNumber(number);
    //Assert
    expect(result).toBe(esperado);
  });

  it('Debería devolver 12 si el número es 10', () => {
    //Arrange
    const number = 10;
    const esperado = 12;
    //Act
    const result = cardNumber(number);
    //Assert
    expect(result).toBe(esperado);
  });

  it('Debería devolver 6 si el número es 6', () => {
    //Arrange
    const number = 6;
    const esperado = 6;
    //Act
    const result = cardNumber(number);
    //Assert
    expect(result).toBe(esperado);
  });

  it('Debería devolver 1 si el número es 1', () => {
    //Arrange
    const number = 1;
    const esperado = 1;
    //Act
    const result = cardNumber(number);
    //Assert
    expect(result).toBe(esperado);
  });
});

describe('cardValue', () => {
  it('Debería devolver 0.5 si el número es 12', () => {
    //Arrange
    const number = 12;
    const esperado = 0.5;
    //Act
    const result = cardValue(number);
    //Assert
    expect(result).toBe(esperado);
  });

  it('Debería devolver 0.5 si el número es 10', () => {
    //Arrange
    const number = 10;
    const esperado = 0.5;
    //Act
    const result = cardValue(number);
    //Assert
    expect(result).toBe(esperado);
  });

  it('Debería devolver 7 si el número es 7', () => {
    //Arrange
    const number = 7;
    const esperado = 7;
    //Act
    const result = cardValue(number);
    //Assert
    expect(result).toBe(esperado);
  });

  it('Debería devolver 1 si el número es 1', () => {
    //Arrange
    const number = 1;
    const esperado = 1;
    //Act
    const result = cardValue(number);
    //Assert
    expect(result).toBe(esperado);
  });
});
