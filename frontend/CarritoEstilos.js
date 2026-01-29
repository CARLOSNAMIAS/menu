// CarritoEstilos.js - Estilos y animaciones CSS
class CarritoEstilos {
  static aplicarEstilos() {
    // Verificar si los estilos ya fueron aplicados
    if (document.getElementById('carrito-estilos')) {
      return;
    }

    const estilosToast = document.createElement('style');
    estilosToast.id = 'carrito-estilos';
    estilosToast.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      .carrito-flotante {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }

      .carrito-btn {
        border-radius: 50px;
        padding: 15px 20px;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        position: relative;
      }

      .carrito-contador {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #dc3545;
        color: white;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: bold;
      }

      .contador-animado {
        animation: pulse 0.3s ease-in-out;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      .toast-notification {
        max-width: 350px;
      }

      .toast-content {
        margin-bottom: 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .carrito-item-img {
        border-radius: 8px;
        border: 1px solid #dee2e6;
      }

      .cantidad-controls {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .cantidad-controls button {
        width: 30px;
        height: 30px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Mejoras para el modal de pago */
      #pagoModal .modal-body {
        padding: 2rem;
      }

      #pagoModal .form-control {
        border-radius: 8px;
        border: 1px solid #ced4da;
        padding: 0.75rem;
      }

      #pagoModal .form-control:focus {
        border-color: #28a745;
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .carrito-flotante {
          bottom: 15px;
          right: 15px;
        }
        
        .carrito-btn {
          padding: 12px 16px;
          font-size: 1rem;
        }
        
        .toast-notification {
          right: 15px;
          max-width: calc(100vw - 30px);
        }
      }
    `;

    document.head.appendChild(estilosToast);
  }

  static inicializar() {
    // Aplicar estilos cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener(
        'DOMContentLoaded',
        CarritoEstilos.aplicarEstilos
      );
    } else {
      CarritoEstilos.aplicarEstilos();
    }
  }
}

// Auto-inicializar los estilos
CarritoEstilos.inicializar();
