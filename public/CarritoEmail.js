/* eslint-disable */
/**
 * CarritoEmail.js - Sistema de envío de emails para facturas
 * 
 * Este archivo contiene la funcionalidad para generar facturas en formato HTML
 * y enviarlas por correo electrónico a los clientes de El Corral.
 * 
 * @author Carlos Namias
 * @version 1.0
 * @date 2025
 */

/**
 * Clase estática que maneja la generación de HTML para facturas
 * y el envío de correos electrónicos
 */
class CarritoEmail {

  /**
   * Genera el contenido HTML completo de una factura
   * 
   * @param {Object} pedido - Objeto que contiene toda la información del pedido
   * @param {Array} pedido.items - Lista de productos en el pedido
   * @param {string} pedido.items[].nombre - Nombre del producto
   * @param {number} pedido.items[].cantidad - Cantidad del producto
   * @param {number} pedido.items[].precio - Precio unitario del producto
   * @param {string|number} pedido.id - Identificador único del pedido
   * @param {string} pedido.fecha - Fecha del pedido
   * @param {number} pedido.total - Total del pedido
   * @param {Object} pedido.cliente - Información del cliente
   * @param {string} pedido.cliente.nombre - Nombre del cliente
   * @param {string} pedido.cliente.direccion - Dirección de entrega
   * @param {string} pedido.cliente.telefono - Teléfono del cliente
   * @param {string} pedido.cliente.metodoPago - Método de pago utilizado
   * @param {string} [pedido.cliente.comentarios] - Comentarios adicionales (opcional)
   * @param {Function} formatearPrecio - Función para formatear los precios
   * @returns {string} HTML completo de la factura con estilos inline
   */
  static generarHtmlFactura(pedido, formatearPrecio) {
    // Genera las filas HTML de la tabla de productos
    const itemsHtml = pedido.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px;">${item.nombre}</td>
        <td style="padding: 10px; text-align: center;">${item.cantidad}</td>
        <td style="padding: 10px; text-align: right;">${formatearPrecio(item.precio)}</td>
        <td style="padding: 10px; text-align: right;">${formatearPrecio(item.precio * item.cantidad)}</td>
      </tr>
    `
      )
      .join(''); // Une todas las filas en un solo string

    // Retorna el HTML completo de la factura con estilos inline para compatibilidad con clientes de email
    return `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; background-color: #f9f9f9;">
        <!-- Header con logo de la empresa -->
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
          <img src="https://raw.githubusercontent.com/CarlosNamias/menu/main/img/logo_old.png" alt="Logo El Corral" style="max-width: 150px;">
        </div>
        
        <!-- Contenido principal de la factura -->
        <div style="padding: 20px 0;">
          <!-- Título y saludo personalizado -->
          <h1 style="color: #48110d; text-align: center; margin: 0;">Confirmación de tu Pedido</h1>
          <p style="text-align: center; font-size: 1.1em;">¡Hola <strong>${pedido.cliente.nombre}</strong>!</p>
          <p>Gracias por tu compra en El Corral. Hemos recibido tu pedido y ya lo estamos preparando con mucho gusto.</p>
          
          <hr>
          
          <!-- Detalles básicos del pedido -->
          <h2>Detalles del Pedido</h2>
          <p><strong>Número de Pedido:</strong> ${pedido.id}</p>
          <p><strong>Fecha:</strong> ${pedido.fecha}</p>
          <p><strong>Total Pagado:</strong> <strong style="color: #48110d; font-size: 1.2em;">${formatearPrecio(pedido.total)}</strong></p>
          
          <!-- Tabla de productos -->
          <h3>Productos</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <!-- Cabecera de la tabla -->
            <thead>
              <tr style="background-color: #48110d; color: white;">
                <th style="padding: 12px; text-align: left;">Producto</th>
                <th style="padding: 12px; text-align: center;">Cantidad</th>
                <th style="padding: 12px; text-align: right;">Precio Unit.</th>
                <th style="padding: 12px; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <!-- Cuerpo de la tabla con los productos -->
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Información de entrega y pago -->
          <h3 style="margin-top: 20px; color: #48110d;">Información de Entrega</h3>
          <div style="background-color: #fff; padding: 15px; border-radius: 5px;">
              <p><strong>Dirección:</strong> ${pedido.cliente.direccion}</p>
              <p><strong>Teléfono:</strong> ${pedido.cliente.telefono}</p>
              <p><strong>Método de Pago:</strong> ${pedido.cliente.metodoPago}</p>
              ${pedido.cliente.comentarios ? `<p><strong>Comentarios:</strong> ${pedido.cliente.comentarios}</p>` : ''}
          </div>
          
          <!-- Separador y disclaimer -->
          <hr style="margin-top: 20px;">
          <!-- Nota aclaratoria sobre el propósito educativo del proyecto -->
          <p style="font-size: 0.9em; color: #777; text-align: center;">Este no es un documento de factura real. Se trata de un proyecto tipo Clone Corral con fines exclusivamente educativos.
¡Gracias por visitar y probar mi página!</p>
        </div>
      </div>
    `;
  }

  /**
   * Envía un correo electrónico utilizando el servidor backend
   * 
   * @param {Object} emailData - Datos del email a enviar
   * @param {string} emailData.to - Dirección de correo del destinatario
   * @param {string} emailData.subject - Asunto del correo
   * @param {string} emailData.html - Contenido HTML del correo
   * @returns {Promise<Object>} Promesa que resuelve con el resultado del envío
   * @returns {boolean} returns.success - Indica si el envío fue exitoso
   * @returns {string} [returns.error] - Mensaje de error si el envío falló
   */
  static async enviarEmail(emailData) {
    try {
      // Detectar si estamos en local o en producción (Vercel)
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const backendUrl = isLocal ? 'http://localhost:3000' : '';
      const endpoint = isLocal ? '/enviar-factura' : '/api/enviar-factura';

      // Realiza petición POST al servidor backend
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      // Verifica si la respuesta del servidor indica error
      if (!response.ok) {
        // Intenta leer el mensaje de error del servidor
        const errorData = await response.text();
        throw new Error(errorData || 'El servidor no pudo enviar el correo.');
      }

      // Retorna objeto indicando éxito
      return { success: true };
    } catch (error) {
      // Log del error para debugging
      console.error('Error al enviar la factura:', error);
      // Retorna objeto con información del error
      return { success: false, error: error.message };
    }
  }
}

/**
 * Extensión de la clase CarritoCompras con métodos de email
 * Agrega nuevos métodos al prototype de CarritoCompras para integrar
 * las funcionalidades de email directamente en el carrito
 */
Object.assign(CarritoCompras.prototype, {

  /**
   * Método de instancia que genera HTML de factura
   * Actúa como wrapper del método estático, utilizando el formateo de precios de la instancia
   * 
   * @param {Object} pedido - Objeto del pedido (mismo formato que el método estático)
   * @returns {string} HTML de la factura
   */
  generarHtmlFactura: function (pedido) {
    // Llama al método estático pasando la función de formateo de la instancia actual
    return CarritoEmail.generarHtmlFactura(pedido, this.formatearPrecio);
  },

  /**
   * Envía la factura del pedido por correo electrónico
   * Orquesta todo el proceso: generación del HTML, configuración del email y envío
   * 
   * @param {Object} pedido - Objeto del pedido completo
   * @param {string} pedido.cliente.email - Email del cliente (requerido)
   * @param {string|number} pedido.id - ID del pedido para el asunto
   * @returns {Promise<void>} Promesa que se resuelve cuando se completa el proceso
   */
  async enviarFacturaPorCorreo(pedido) {
    // Genera el contenido HTML de la factura
    const facturaHtml = this.generarHtmlFactura(pedido);

    // Configura los datos del email
    const emailData = {
      to: pedido.cliente.email, // Destinatario
      subject: `Confirmación de tu pedido en El Corralazo #${pedido.id}`, // Asunto personalizado
      html: facturaHtml, // Contenido HTML generado
    };

    // Intenta enviar el email
    const resultado = await CarritoEmail.enviarEmail(emailData);

    // Muestra notificación al usuario según el resultado
    if (resultado.success) {
      // Notificación de éxito
      this.mostrarNotificacion('Factura enviada a tu correo.', 'success');
    } else {
      // Notificación de error
      this.mostrarNotificacion(
        'No se pudo enviar la factura por correo.',
        'error'
      );
    }
  },
});