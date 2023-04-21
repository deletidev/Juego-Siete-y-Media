#Módulo 5 - Condicionales - Laboratorio

##Juego de las siete media

Vamos a implementar el juego de cartas de las 7 1/2 en modo solitario.

Por si no conocéis las reglas del juego, os las explicamos brevemente:

El juego de las siete y media es un juego de cartas español que se juega tradicionalmente con varios jugadores, pero también se puede adaptar para un solo jugador.

Para jugar al juego de las siete y media en solitario, sigue estos pasos:

Baraja una baraja española de 40 cartas y coloca las cartas boca abajo sobre la mesa.

Gira la primera carta y colócala boca arriba en la mesa. Esta carta será la carta del jugador.

Decide si deseas tomar otra carta o quedarte con la que tienes. El objetivo del juego es tener una mano que sume 7 y media puntos o lo más cerca posible de este número sin pasarse.

Si decides tomar otra carta, gira la siguiente carta boca arriba. Añade el valor de esta carta a tu mano y decide si deseas tomar otra carta o quedarte con lo que tienes. Puedes tomar tantas cartas como desees, pero si la suma de los valores de las cartas de tu mano supera los 7,5 puntos, pierdes automáticamente la partida.

Si decides quedarte con la carta que tienes, tu turno termina. Anota tu puntuación y pasa al siguiente turno.

Continúa jugando hasta que hayas jugado todas las cartas de la baraja o decidas detenerte.

Si logras una mano con una puntuación de 7 y media, has ganado el juego. Si no, tu objetivo es obtener la mano con la puntuación más cercana a 7 y media.

Es importante recordar que las cartas numéricas valen su valor nominal, es decir, el As (uno de cada palo) vale 1 punto, las cartas del 2 al 7 valen su valor nominal y las figuras (sota, caballo y rey) valen medio punto cada una.

##Material
Para simplificar la implementación del juego sólo vamos a mostrar cartas del palo de copas:

Enlaces a las imágenes de la cartas:

Carta boca abajo:

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg

1 de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg

2 de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg

3 de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg

4 de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg

5 de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg

6 de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg

7 de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg

Sota de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg

Caballo de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg

Rey de copas

https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg

Apartados obligatorios
Te recomendamos que arranques la aplicación con el sandbox de TypeScript.

1. Mostrar puntuación
   Arranca por crear una variable que almacena la puntuación que lleve el usuario:

Crea una variable para almacenar la puntuación, inicialmente será 0.
Crea un div en el HTML en el que podamos mostrar la puntuación.
Crea una función que se llame muestraPuntuacion que muestre la puntuación actual en el div.
Invoca a la función en cuanto este disponible el DOM.
Más adelante invocaremos muestraPuntuación cada vez que el usuario pida carta nueva.

2. Pedir carta
   Implementa la funcionalidad de pedir carta, ¿En qué consiste?

Hay que generar una función que nos devuelva una carta aleatoria, la podemos llamar dameCarta.
Para ello exponemos un botón en el HTML que al pulsarlo llame a la función dameCarta.
Para probar este caso, de momento muestra la carta elegida por consola.
Pistas:
Las cartas tienen los siguientes valores: 1,2,3,4,5,6,7,10,11,12
Hasta ahora math.Random lo hemos usado para obtener números aleatores de un rango continuo (por ejemplo de 0 a 100), en este caso nos queremos saltar el 8 y el 9, SPOILER ALERT (piensa en una solución antes de leer la siguiente pista :))... ¿Cómo podemos hacerlo?
Puedes plantear generar un número aleatorio entre 1 y 10, si el número es mayor que 7, le sumas 2 y ya tienes los valores que necesitabas. 3. Mostrar carta
Crea una función que se llame muestraCarta que muestre la carta que le pasemos por parámetro, la firma podría ser tal que así:
const mostrarCarta = (carta: number) : void;
Pistas
Añade un img en el HTML en el que podamos mostrar la carta.

Ese img va a tener un src que va a ser la url de la imagen de la carta, de momento, utiliza la imagen de carta boca abajo: https://github.com/Lemoncode/fotos-ejemplos/blob/main/cartas/back.jpg

Crea una función mostrar carta, para mapear valor a imagen de carta puedes utilizar un switch para hacer la conversión, recuerda que más arriba tienes los enlaces a las imágenes de las cartas.

Cuando el usuario pulse en el bóton Pide Carta llama a pideCarta y con el resultado llama a mostrarCarta.

3. Sumar puntuación
   Una vez que le hemos dado la carta al usuario, tenemos que sumar la puntuación de la carta a la puntuación total.

Pistas
Tenemos un div donde mostramos la puntuación y tenemos una variable donde la almacenamos.
Suma el nuevo valor y llama a la función que creamos previamente para mostrar la información.
Apartados opcionales
Game over
Si el usuario se pasa de 7,5 puntos, el juego termina y se muestra un mensaje de Game Over, además el usuario no puede seguir pidiendo cartas.

Me planto
Añadir un botón para que el usuario pueda plantarse, si el usuario se planta, el juego termina, el usuario no puede pedir más cartas y:

Si su puntación es menor que 4, mostrar un mensaje que diga "Has sido muy conservador".

Si la puntuación ha sido 5, mostrar un mensaje que diga "Te ha entrado el canguelo eh?".

Si la puntuación ha sido 6 o 7, mostrar un mensaje que diga... "Casi casí...".

Si la puntuacion es 7.5, mostrar un mensaje que diga "¡ Lo has clavado! ¡Enohorabuena!"

Nueva partida
Una vez que el usuario ha terminado la partida (sea porque se ha plantado o porque ha perdido), se le muestra un botón para que pueda empezar una nueva partida.

Saber lo que habría pasado
Una vez que el usuario ya se ha plantado, se le muestra un botón para que pueda saber lo que habría pasado si hubiera seguido pidiendo cartas.

Estila la aplicación
Utilizando CSS, estila la aplicación (margenes, espacios, colores, etc...) para que tenga el mejor aspecto posible.
