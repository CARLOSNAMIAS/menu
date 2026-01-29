// Variable global para que los botones del modal puedan acceder a las funciones del carrito.
/* eslint-disable */

let carrito;

document.addEventListener('DOMContentLoaded', function () {
  // Esta línea crea una nueva instancia de la clase CarritoCompras (que estará en carrito.js)
  // y pone en marcha toda la funcionalidad del carrito.
  carrito = new CarritoCompras();
});
