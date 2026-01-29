// CarritoCompras.js - Clase principal del carrito

/* eslint-disable */
class CarritoCompras {
  constructor() {
    this.items = [];
    this.total = 0;
    this.inicializar();
  }

  inicializar() {
    // Cargar carrito desde localStorage si existe
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items = JSON.parse(carritoGuardado);
      this.calcularTotal();
    }

    // Agregar event listeners a todos los botones "Personalizar"
    this.agregarEventListeners();

    // Crear el HTML del carrito si no existe
    this.crearElementosCarrito();

    // Actualizar la vista inicial
    this.actualizarVista();
  }

  agregarEventListeners() {
    // Seleccionar todos los botones "Personalizar"
    const botonesPersonalizar = document.querySelectorAll('.btn-custom');

    botonesPersonalizar.forEach((boton) => {
      boton.addEventListener('click', (e) => {
        e.preventDefault();
        this.agregarProducto(e.target);
      });
    });
  }

  agregarProducto(boton) {
    // Obtener el contenedor del producto
    const menuItem = boton.closest('.menu-item');

    // Extraer información del producto
    const nombre = menuItem.querySelector('h5').textContent.trim();
    const descripcion = menuItem.querySelector('p').textContent.trim();
    const precioTexto = menuItem.querySelector('.price').textContent.trim();
    const precio = this.extraerPrecio(precioTexto);
    const imagen = menuItem.querySelector('img').src;

    // Crear objeto producto
    const producto = {
      id: this.generarId(nombre),
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen,
      cantidad: 1,
    };

    // Verificar si el producto ya existe en el carrito
    const productoExistente = this.items.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      this.items.push(producto);
    }

    // Actualizar total y vista
    this.calcularTotal();
    this.actualizarVista();
    this.guardarCarrito();

    // Mostrar mensaje de confirmación
    this.mostrarMensajeAgregado(producto.nombre);
  }

  eliminarProducto(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.calcularTotal();
    this.actualizarVista();
    this.guardarCarrito();
  }

  actualizarCantidad(id, nuevaCantidad) {
    const producto = this.items.find((item) => item.id === id);
    if (producto) {
      if (nuevaCantidad <= 0) {
        this.eliminarProducto(id);
      } else {
        producto.cantidad = nuevaCantidad;
        this.calcularTotal();
        this.actualizarVista();
        this.guardarCarrito();
      }
    }
  }

  limpiarCarrito() {
    this.items = [];
    this.total = 0;
    this.actualizarVista();
    this.guardarCarrito();
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }
}
