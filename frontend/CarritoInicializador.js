/* eslint-disable */

// CarritoInicializador.js - Script principal de inicialización
class CarritoInicializador {
  static inicializar() {
    // Verificar que todas las dependencias estén cargadas
    if (typeof CarritoCompras === 'undefined') {
      console.error(
        'CarritoCompras no está definido. Asegúrate de cargar CarritoCompras.js primero.'
      );
      return;
    }

    if (typeof CarritoUtilidades === 'undefined') {
      console.error(
        'CarritoUtilidades no está definido. Asegúrate de cargar CarritoUtilidades.js.'
      );
      return;
    }

    if (typeof CarritoVista === 'undefined') {
      console.error(
        'CarritoVista no está definido. Asegúrate de cargar CarritoVista.js.'
      );
      return;
    }

    if (typeof CarritoPago === 'undefined') {
      console.error(
        'CarritoPago no está definido. Asegúrate de cargar CarritoPago.js.'
      );
      return;
    }

    if (typeof CarritoEmail === 'undefined') {
      console.error(
        'CarritoEmail no está definido. Asegúrate de cargar CarritoEmail.js.'
      );
      return;
    }

    // Crear la instancia global del carrito
    window.carrito = new CarritoCompras();

    console.log('✅ Carrito de compras inicializado correctamente');
    return window.carrito;
  }

  static verificarDependencias() {
    const dependencias = [
      'bootstrap', // Verificar que Bootstrap esté disponible
    ];

    const faltantes = dependencias.filter(
      (dep) => typeof window[dep] === 'undefined'
    );

    if (faltantes.length > 0) {
      console.warn('Dependencias faltantes:', faltantes);
      console.warn(
        'Asegúrate de que Bootstrap esté cargado antes del carrito.'
      );
    }

    return faltantes.length === 0;
  }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Verificar dependencias
  CarritoInicializador.verificarDependencias();

  // Inicializar el carrito
  CarritoInicializador.inicializar();
});

// También exportar para uso manual si es necesario
window.CarritoInicializador = CarritoInicializador;
