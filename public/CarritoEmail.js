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
      <tr style="border-bottom: 1px solid #eeeeee;">
        <td style="padding: 12px 10px; font-size: 14px; color: #333333;">
          <strong style="display: block;">${item.nombre}</strong>
          <span style="font-size: 12px; color: #777777;">Cantidad: ${item.cantidad}</span>
        </td>
        <td style="padding: 12px 10px; text-align: right; font-size: 14px; color: #333333;">${formatearPrecio(item.precio * item.cantidad)}</td>
      </tr>
    `
      )
      .join('');

    return `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          
          <!-- Encabezado con Color de Marca -->
          <div style="background-color: #48110d; padding: 30px; text-align: center;">
            <img src="https://raw.githubusercontent.com/CarlosNamias/menu/main/img/logooo.png" alt="El Corral" style="max-width: 180px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
          </div>

          <!-- Cuerpo del Mensaje -->
          <div style="padding: 40px 30px;">
            <h1 style="color: #48110d; margin-top: 0; font-size: 24px; text-align: center;">¡Gracias por tu pedido!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #555555; text-align: center;">
              Hola <strong>${pedido.cliente.nombre}</strong>, estamos preparando tu orden para que la disfrutes muy pronto.
            </p>

            <!-- Imagen Banner del Restaurante -->
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://raw.githubusercontent.com/CarlosNamias/menu/main/img/carrusel-1.jpg" alt="Hamburguesas El Corral" style="width: 100%; max-width: 500px; border-radius: 8px;">
            </div>

            <!-- Card de Info del Pedido -->
            <div style="background-color: #fff8f5; border: 1px dashed #f58b2d; border-radius: 8px; padding: 20px; margin: 30px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="font-size: 13px; color: #888888; text-transform: uppercase;">ID del Pedido</td>
                  <td style="font-size: 13px; color: #888888; text-transform: uppercase; text-align: right;">Fecha</td>
                </tr>
                <tr>
                  <td style="font-size: 15px; color: #333333; font-weight: bold;">#${pedido.id}</td>
                  <td style="font-size: 15px; color: #333333; font-weight: bold; text-align: right;">${pedido.fecha}</td>
                </tr>
              </table>
            </div>

            <!-- Lista de Productos -->
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #48110d;">
                  <th style="padding: 10px 0; text-align: left; color: #48110d; font-size: 14px;">Descripción</th>
                  <th style="padding: 10px 0; text-align: right; color: #48110d; font-size: 14px;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td style="padding: 20px 0 0 0; font-size: 18px; font-weight: bold; color: #333333;">Total del Pedido</td>
                  <td style="padding: 20px 0 0 0; font-size: 22px; font-weight: bold; color: #f58b2d; text-align: right;">${formatearPrecio(pedido.total)}</td>
                </tr>
              </tfoot>
            </table>

            <!-- Información de Entrega -->
            <div style="margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 30px;">
              <h3 style="color: #48110d; font-size: 16px; margin-bottom: 15px;">Dirección de Entrega</h3>
              <p style="font-size: 14px; color: #666666; margin: 0; line-height: 1.5;">
                ${pedido.cliente.direccion}<br>
                Tel: ${pedido.cliente.telefono}<br>
                Pago: ${pedido.cliente.metodoPago}
              </p>
              ${pedido.cliente.comentarios ? `<p style="margin-top: 10px; font-style: italic; font-size: 13px; color: #888888;">"${pedido.cliente.comentarios}"</p>` : ''}
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
            <p style="font-size: 12px; color: #999999; margin-bottom: 20px; line-height: 1.5;">
              Este es un proyecto académico de clon funcional.<br>
              <strong>Carlos Namias 🛸🧑🏽‍💻😎</strong>
            </p>
            <div style="display: inline-block;">
              <a href="https://carlosnamias.github.io/menu/" style="background-color: #f58b2d; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">Volver a la Tienda</a>
            </div>
          </div>

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

      console.log('📧 Enviando email a:', emailData.to);

      // Realiza petición POST al servidor backend
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      // Intentar parsear la respuesta como JSON
      let responseData;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = { message: await response.text() };
      }

      // Verifica si la respuesta del servidor indica error
      if (!response.ok) {
        const errorMsg = responseData.error || responseData.message || 'El servidor no pudo enviar el correo.';
        console.error('❌ Error del servidor:', responseData);
        throw new Error(errorMsg);
      }

      console.log('✅ Email enviado exitosamente:', responseData);
      // Retorna objeto indicando éxito
      return { success: true, data: responseData };
    } catch (error) {
      // Log del error para debugging
      console.error('❌ Error al enviar la factura:', error);

      // Retorna objeto con información del error
      return {
        success: false,
        error: error.message || 'Error desconocido al enviar el correo'
      };
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