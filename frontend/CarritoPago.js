/* eslint-disable */

// CarritoPago.js - Sistema de pagos y pedidos
class CarritoPago {
  static crearModalPago() {
    if (!document.getElementById('pagoModal')) {
      const modalPago = document.createElement('div');
      modalPago.innerHTML = `
        <div class="modal fade" id="pagoModal" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title">
                  <i class="bi bi-credit-card me-2"></i>
                  Proceder al Pago
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <!-- Resumen del pedido -->
                  <div class="col-md-6">
                    <h6><i class="bi bi-receipt me-2"></i>Resumen del Pedido</h6>
                    <div id="resumen-pedido" class="border rounded p-3 mb-3"></div>
                    <div class="total-pago bg-light p-3 rounded">
                      <h5>Total a Pagar: <span id="total-pago" class="text-success">$0</span></h5>
                    </div>
                  </div>
                  
                  <!-- Formulario de pago -->
                  <div class="col-md-6">
                    <h6><i class="bi bi-person me-2"></i>Información de Entrega</h6>
                    <form id="formPago">
                      <div class="mb-3">
                        <label class="form-label">Nombre Completo</label>
                        <input type="text" class="form-control" id="nombreCliente" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Teléfono</label>
                        <input type="tel" class="form-control" id="telefonoCliente" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Dirección de Entrega</label>
                        <textarea class="form-control" id="direccionCliente" rows="3" required></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="emailCliente" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Método de Pago</label>
                        <select class="form-select" id="metodoPago" required>
                          <option value="">Seleccionar método</option>
                          <option value="efectivo">Efectivo</option>
                          <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                          <option value="transferencia">Transferencia Bancaria</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Comentarios Adicionales</label>
                        <textarea class="form-control" id="comentarios" rows="2" placeholder="Instrucciones especiales, referencias, etc."></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success" onclick="carrito.confirmarPedido()">
                  <i class="bi bi-check-circle me-2"></i>Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalPago);
    }
  }

  static actualizarResumenPedido(items, total, formatearPrecio) {
    const resumenElement = document.getElementById('resumen-pedido');
    const totalPagoElement = document.getElementById('total-pago');

    if (resumenElement) {
      resumenElement.innerHTML = items
        .map(
          (item) => `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>${item.nombre}</strong>
              <br>
              <small class="text-muted">Cantidad: ${item.cantidad}</small>
            </div>
            <div class="text-end">
              <strong>${formatearPrecio(item.precio * item.cantidad)}</strong>
            </div>
          </div>
          <hr class="my-2">
        `
        )
        .join('');
    }

    if (totalPagoElement) {
      totalPagoElement.textContent = formatearPrecio(total);
    }
  }

  static obtenerDatosFormulario() {
    return {
      nombre: document.getElementById('nombreCliente').value,
      telefono: document.getElementById('telefonoCliente').value,
      direccion: document.getElementById('direccionCliente').value,
      email: document.getElementById('emailCliente').value,
      metodoPago: document.getElementById('metodoPago').value,
      comentarios: document.getElementById('comentarios').value,
    };
  }

  static limpiarFormulario() {
    const form = document.getElementById('formPago');
    if (form) {
      form.reset();
    }
  }

  static mostrarConfirmacionPedido(pedido, formatearPrecio) {
    const confirmacion = document.createElement('div');
    confirmacion.innerHTML = `
      <div class="modal fade" id="confirmacionModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title">
                <i class="bi bi-check-circle me-2"></i>
                ¡Pedido Confirmado!
              </h5>
            </div>
            <div class="modal-body text-center">
              <div class="mb-3">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
              </div>
              <h4>¡Gracias por tu pedido!</h4>
              <p><strong>Número de pedido:</strong> ${pedido.id}</p>
              <p><strong>Total:</strong> ${formatearPrecio(pedido.total)}</p>
              <p>Tu pedido será entregado en aproximadamente <strong>30-45 minutos</strong></p>
              <p class="text-muted">Recibirás una llamada de confirmación en breve</p>
            </div>
            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">Entendido</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(confirmacion);

    const confirmacionModal = new bootstrap.Modal(
      document.getElementById('confirmacionModal')
    );
    confirmacionModal.show();

    // Remover el modal después de cerrarlo
    document
      .getElementById('confirmacionModal')
      .addEventListener('hidden.bs.modal', function () {
        document.body.removeChild(confirmacion);
      });
  }
}

// Agregar métodos de pago a la clase principal
Object.assign(CarritoCompras.prototype, {
  crearModalPago: CarritoPago.crearModalPago,
  mostrarConfirmacionPedido: CarritoPago.mostrarConfirmacionPedido,

  procederPago() {
    if (this.items.length === 0) {
      this.mostrarNotificacion('Tu carrito está vacío', 'warning');
      return;
    }

    // 👉 Crear el modal si aún no existe
    this.crearModalPago();

    // Actualizar el resumen del pedido en el modal
    this.actualizarResumenPedido();

    // Cerrar el modal del carrito
    const carritoModal = document.getElementById('carritoModal');
    const modalInstance = bootstrap.Modal.getInstance(carritoModal);
    if (modalInstance) {
      modalInstance.hide();
    }

    // Mostrar el modal de pago

    setTimeout(() => {
      const pagoModal = new bootstrap.Modal(
        document.getElementById('pagoModal')
      );
      pagoModal.show();
    }, 300);
  },

  actualizarResumenPedido() {
    CarritoPago.actualizarResumenPedido(
      this.items,
      this.total,
      this.formatearPrecio
    );
  },

  confirmarPedido() {
    const form = document.getElementById('formPago');

    // Validar formulario
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Obtener datos del formulario
    const datosCliente = CarritoPago.obtenerDatosFormulario();

    // Crear objeto del pedido
    const pedido = {
      id: this.generarIdPedido(),
      fecha: new Date().toLocaleString('es-CO'),
      cliente: datosCliente,
      items: this.items,
      total: this.total,
      estado: 'Confirmado',
    };

    // Enviar la factura por correo electrónico
    this.enviarFacturaPorCorreo(pedido);

    // Mostrar confirmación en la UI
    this.mostrarConfirmacionPedido(pedido, this.formatearPrecio);

    // Limpiar carrito y cerrar modal
    this.limpiarCarrito();
    const pagoModal = document.getElementById('pagoModal');
    const modalInstance = bootstrap.Modal.getInstance(pagoModal);
    if (modalInstance) {
      modalInstance.hide();
    }

    // Limpiar formulario
    CarritoPago.limpiarFormulario();
  },
});
