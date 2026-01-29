/* eslint-disable */

// CarritoUtilidades.js - Funciones de utilidad y cálculos
class CarritoUtilidades {
  static extraerPrecio(precioTexto) {
    // Extraer solo los números del precio (ej: "$43.900" -> 43900)
    return parseInt(precioTexto.replace(/[^\d]/g, ''));
  }

  static generarId(nombre) {
    // Generar un ID único basado en el nombre
    return nombre
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

  static generarIdPedido() {
    return 'PED-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  static formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  }

  static calcularTotal(items) {
    return items.reduce((suma, item) => {
      return suma + item.precio * item.cantidad;
    }, 0);
  }

  static calcularTotalItems(items) {
    return items.reduce((suma, item) => suma + item.cantidad, 0);
  }
}

// Agregar métodos de utilidad a la clase principal
Object.assign(CarritoCompras.prototype, {
  extraerPrecio: CarritoUtilidades.extraerPrecio,
  generarId: CarritoUtilidades.generarId,
  generarIdPedido: CarritoUtilidades.generarIdPedido,
  formatearPrecio: CarritoUtilidades.formatearPrecio,

  calcularTotal() {
    this.total = CarritoUtilidades.calcularTotal(this.items);
  },
});
