/* eslint-disable */

// CarritoVista.js - Manejo de la interfaz de usuario
class CarritoVista {
  static crearElementosCarrito() {
    // Crear botón del carrito flotante si no existe
    if (!document.getElementById('carrito-flotante')) {
      const carritoFlotante = document.createElement('div');
      carritoFlotante.id = 'carrito-flotante';
      carritoFlotante.className = 'carrito-flotante';
      carritoFlotante.innerHTML = `
        <button class="btn btn-primary carrito-btn" data-bs-toggle="modal" data-bs-target="#carritoModal">
          <i class="bi bi-cart4"></i>
          <span class="carrito-contador">0</span>
        </button>
      `;
      document.body.appendChild(carritoFlotante);
    }

    // Crear modal del carrito si no existe
    if (!document.getElementById('carritoModal')) {
      const modalCarrito = document.createElement('div');
      modalCarrito.innerHTML = `
        <div class="modal fade" id="carritoModal" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  <i class="bi bi-cart4 me-2"></i>
                  Tu Carrito de Compras
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div id="carrito-items"></div>
                <div class="carrito-total mt-3">
                  <h4>Total: <span id="carrito-total">$0</span></h4>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir Comprando</button>
                <button type="button" class="btn btn-success" onclick="carrito.procederPago()">Proceder al Pago</button>
                <button type="button" class="btn btn-danger" onclick="carrito.limpiarCarrito()">Limpiar Carrito</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalCarrito);
    }
  }

  static actualizarContadores(totalItems) {
    const contadores = document.querySelectorAll(
      '.carrito-contador, #carrito-contador'
    );
    contadores.forEach((contador) => {
      contador.textContent = totalItems;
      // Efecto de animación visual (opcional)
      contador.classList.remove('contador-animado');
      void contador.offsetWidth; // Reinicia animación
      contador.classList.add('contador-animado');
    });
  }

  static actualizarContenidoCarrito(items, formatearPrecio) {
    const carritoItems = document.getElementById('carrito-items');
    if (carritoItems) {
      if (items.length === 0) {
        carritoItems.innerHTML =
          '<p class="text-center">Tu carrito está vacío</p>';
      } else {
        carritoItems.innerHTML = items
          .map(
            (item) => `
          <div class="carrito-item d-flex align-items-center mb-3 p-3 border rounded">
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img me-3" style="width: 80px; height: 80px; object-fit: cover;">
            <div class="flex-grow-1">
              <h6>${item.nombre}</h6>
              <p class="text-muted small mb-1">${item.descripcion.substring(0, 100)}...</p>
              <p class="mb-0"><strong>${formatearPrecio(item.precio)}</strong></p>
            </div>
            <div class="cantidad-controls">
              <button class="btn btn-sm btn-outline-secondary" onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad - 1})">-</button>
              <span class="mx-2">${item.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary" onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad + 1})">+</button>
            </div>
            <button class="btn btn-sm btn-danger ms-2" onclick="carrito.eliminarProducto('${item.id}')">🗑️</button>
          </div>
        `
          )
          .join('');
      }
    }
  }

  static actualizarTotal(total, formatearPrecio) {
    const totalElement = document.getElementById('carrito-total');
    if (totalElement) {
      totalElement.textContent = formatearPrecio(total);
    }
  }

  static mostrarMensajeAgregado(nombreProducto) {
    // Crear toast de notificación
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="alert alert-success toast-content">
        ✅ ${nombreProducto} agregado al carrito
      </div>
    `;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    // Remover después de 3 segundos
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  static mostrarNotificacion(mensaje, tipo = 'info') {
    const toast = document.createElement('div');
    const iconos = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️',
    };

    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="alert alert-${tipo} toast-content">
        ${iconos[tipo]} ${mensaje}
      </div>
    `;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }
}

// Agregar métodos de vista a la clase principal
Object.assign(CarritoCompras.prototype, {
  crearElementosCarrito: CarritoVista.crearElementosCarrito,
  mostrarMensajeAgregado: CarritoVista.mostrarMensajeAgregado,
  mostrarNotificacion: CarritoVista.mostrarNotificacion,

  actualizarVista() {
    // Calcular total de ítems
    const totalItems = CarritoUtilidades.calcularTotalItems(this.items);

    // Actualizar todos los contadores de carrito
    CarritoVista.actualizarContadores(totalItems);

    // Mostrar contenido del carrito
    CarritoVista.actualizarContenidoCarrito(this.items, this.formatearPrecio);

    // Actualizar total
    CarritoVista.actualizarTotal(this.total, this.formatearPrecio);
  },
});
