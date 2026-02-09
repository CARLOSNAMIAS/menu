document.addEventListener('DOMContentLoaded', function () {
  const chatContent = document.querySelector('.chat-content');
  const chatInput = document.getElementById('userInput');
  const chatSendBtn = document.getElementById('sendMessage');
  const emojiPanel = document.querySelectorAll('.emoji');

  // Crear un objeto de audio para el sonido de notificación
  const notificationSound = new Audio('/notificacion/confirmacion.mp3');
  notificationSound.volume = 0.5; // Volumen al 50%

  // Función para reproducir el sonido
  function playNotificationSound() {
    // Intentar reproducir el sonido, pero no mostrar error si falla
    notificationSound
      .play()
      .catch(() => {
        // Silenciar el error - el sonido es opcional
      });
  }

  // CAMBIAR ESTA FUNCIÓN (líneas 14-20):
  function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = message;
    chatContent.appendChild(messageDiv);

    // Desplazar al final del chat con efecto suave
    chatContent.scrollTo({
      top: chatContent.scrollHeight,
      behavior: 'smooth'
    });

    // SOLO reproducir sonido si es del bot Y NO es el mensaje de bienvenida inicial
    if (
      sender === 'bot' &&
      !message.includes('¡Hola! 👋 Soy tu asistente virtual')
    ) {
      playNotificationSound();
    }
  }

  // Mensaje de bienvenida automático mejorado
  addMessage(
    `¡Hola! 👋 Soy tu asistente virtual 🤖<br><br>
    <strong>¿En qué puedo ayudarte hoy?</strong><br><br>
    📋 <strong>Opciones principales:</strong><br>
    1️⃣ Soporte técnico<br>
    2️⃣ Hacer un pedido<br>
    3️⃣ Ver menú completo<br>
    4️⃣ Estado de pedido<br>
    5️⃣ Horarios y ubicación<br><br>
    💬 También puedes escribir directamente lo que necesitas.`,
    'bot'
  );

  // Función mejorada para obtener la respuesta del bot
  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Saludos y bienvenida
    if (
      lowerMessage.includes('hola') ||
      lowerMessage.includes('buenos') ||
      lowerMessage.includes('buenas') ||
      lowerMessage.includes('hey') ||
      lowerMessage.includes('holi')
    ) {
      return `¡Hola! 👋 Bienvenido/a. ¿En qué puedo ayudarte hoy?<br><br>
      📋 <strong>Opciones principales:</strong><br>
      1️⃣ Soporte técnico<br>
      2️⃣ Hacer un pedido<br>
      3️⃣ Ver menú completo<br>
      4️⃣ Estado de pedido<br>
      5️⃣ Horarios y ubicación<br><br>
      💬 También puedes escribir directamente lo que necesitas.`;
    }

    // Opciones principales expandidas
    if (
      lowerMessage === '1' ||
      lowerMessage.includes('soporte') ||
      lowerMessage.includes('técnico')
    ) {
      return `🛠️ <strong>Soporte Técnico</strong><br><br>
      ¿Qué problema tienes?<br><br>
      🔧 <strong>Opciones comunes:</strong><br>
      • Problemas con la app<br>
      • Error en el pago<br>
      • Pedido incorrecto<br>
      • Problemas de entrega<br>
      • Cuenta bloqueada<br><br>
      📝 Describe tu problema o escribe una de las opciones anteriores.`;
    }

    if (
      lowerMessage === '2' ||
      lowerMessage.includes('pedido') ||
      lowerMessage.includes('pedir')
    ) {
      return `🍔 <strong>¡Perfecto! Hagamos tu pedido</strong><br><br>
      📋 <strong>¿Qué te gustaría?</strong><br>
      • Hamburguesas 🍔<br>
      • Combos 🍟🥤<br>
      • Bebidas 🧊<br>
      • Postres 🍰<br>
      • Ensaladas 🥗<br><br>
      💡 <strong>Tip:</strong> Puedes escribir el nombre del producto o usar nuestros combos especiales.`;
    }

    if (
      lowerMessage === '3' ||
      lowerMessage.includes('menú') ||
      lowerMessage.includes('menu')
    ) {
      return `📋 <strong>MENÚ COMPLETO</strong><br><br>
      🍔 <strong>HAMBURGUESAS</strong><br>
      • Clásica - $15.000<br>
      • Doble carne - $22.000<br>
      • Pollo crispy - $18.000<br>
      • Vegetariana - $16.000<br><br>
      🍟 <strong>COMBOS</strong><br>
      • Combo clásico - $25.000<br>
      • Combo familiar - $45.000<br>
      • Combo kids - $18.000<br><br>
      🥤 <strong>BEBIDAS</strong><br>
      • Gaseosas - $5.000<br>
      • Jugos naturales - $7.000<br>
      • Malteadas - $10.000<br><br>
      🍰 <strong>POSTRES</strong><br>
      • Helado - $8.000<br>
      • Brownie - $9.000<br><br>
      💬 Escribe el nombre de cualquier producto para más detalles.`;
    }

    if (
      lowerMessage === '4' ||
      lowerMessage.includes('estado') ||
      lowerMessage.includes('seguimiento')
    ) {
      return `📦 <strong>Estado de Pedido</strong><br><br>
      Para consultar tu pedido necesito:<br>
      • Número de orden<br>
      • Teléfono registrado<br>
      • Nombre del pedido<br><br>
      📱 También puedes revisar en la app en la sección 'Mis pedidos'.<br><br>
      ¿Cuál es tu número de orden?`;
    }

    if (
      lowerMessage === '5' ||
      lowerMessage.includes('horario') ||
      lowerMessage.includes('ubicación') ||
      lowerMessage.includes('dirección')
    ) {
      return `📍 <strong>Horarios y Ubicación</strong><br><br>
      🕐 <strong>HORARIOS:</strong><br>
      • Lunes a Jueves: 11:00 AM - 10:00 PM<br>
      • Viernes a Sábado: 11:00 AM - 11:00 PM<br>
      • Domingo: 12:00 PM - 9:00 PM<br><br>
      📍 <strong>UBICACIONES:</strong><br>
      • Centro: Calle 12 #34-56<br>
      • Norte: Av. Libertadores #78-90<br>
      • Sur: Centro Comercial Plaza<br><br>
      🚚 <strong>Domicilios disponibles</strong> en toda la ciudad<br><br>
      ¿Necesitas la dirección específica de alguna sede?`;
    }

    // Productos específicos con más detalle
    if (
      lowerMessage.includes('hamburguesa') &&
      !lowerMessage.includes('combo')
    ) {
      return `🍔 <strong>HAMBURGUESAS DISPONIBLES</strong><br><br>
      🥩 <strong>Clásica</strong> - $15.000<br>
      Carne 100% res, lechuga, tomate, cebolla, salsa especial<br><br>
      🥩🥩 <strong>Doble Carne</strong> - $22.000<br>
      Doble carne, queso cheddar, tocino, salsa BBQ<br><br>
      🐔 <strong>Pollo Crispy</strong> - $18.000<br>
      Pollo empanizado, lechuga, tomate, salsa ranch<br><br>
      🥬 <strong>Vegetariana</strong> - $16.000<br>
      Hamburguesa de lentejas, aguacate, vegetales frescos<br><br>
      ➕ <strong>¿Quieres agregar algo más?</strong><br>
      • Papas (+$5.000)<br>
      • Bebida (+$5.000)<br>
      • Extra queso (+$2.000)<br><br>
      💬 Escribe el nombre de la hamburguesa que prefieres.`;
    }

    if (lowerMessage.includes('combo')) {
      return `🍟🥤 <strong>COMBOS ESPECIALES</strong><br><br>
      👑 <strong>Combo Clásico</strong> - $25.000<br>
      Hamburguesa clásica + papas medianas + bebida<br><br>
      👨‍👩‍👧‍👦 <strong>Combo Familiar</strong> - $45.000<br>
      3 hamburguesas + papas grandes + 3 bebidas<br><br>
      🧒 <strong>Combo Kids</strong> - $18.000<br>
      Hamburguesa pequeña + papas + jugo + juguete<br><br>
      ⭐ <strong>Combo Premium</strong> - $35.000<br>
      Hamburguesa doble + papas grandes + bebida + postre<br><br>
      🎯 <strong>¡Ahorra hasta $8.000 con nuestros combos!</strong><br><br>
      ¿Cuál combo te interesa?`;
    }

    if (lowerMessage.includes('bebida') && !lowerMessage.includes('combo')) {
      return `🥤 <strong>BEBIDAS DISPONIBLES</strong><br><br>
      ❄️ <strong>Gaseosas</strong> - $5.000<br>
      • Coca Cola, Pepsi, Sprite, Fanta<br>
      • Tamaños: Personal, Mediana, Grande<br><br>
      🍊 <strong>Jugos Naturales</strong> - $7.000<br>
      • Naranja, Mango, Lulo, Mora<br>
      • 100% naturales, sin preservantes<br><br>
      🍓 <strong>Malteadas</strong> - $10.000<br>
      • Fresa, Chocolate, Vainilla, Oreo<br>
      • Con crema chantilly<br><br>
      ☕ <strong>Bebidas Calientes</strong> - $6.000<br>
      • Café, Chocolate, Té chai<br><br>
      💧 <strong>Agua</strong> - $3.000<br>
      • Natural o con gas<br><br>
      ¿Cuál bebida prefieres?`;
    }

    // Problemas técnicos específicos
    if (lowerMessage.includes('error') || lowerMessage.includes('problema')) {
      return `⚠️ <strong>Soporte Técnico</strong><br><br>
      🔍 <strong>Problemas más comunes:</strong><br><br>
      💳 <strong>Errores de pago</strong><br>
      • Tarjeta rechazada<br>
      • Doble cobro<br>
      • Problema con PSE<br><br>
      📱 <strong>Problemas de app</strong><br>
      • No carga<br>
      • Cierre inesperado<br>
      • No recibe notificaciones<br><br>
      🚚 <strong>Problemas de entrega</strong><br>
      • Pedido no llegó<br>
      • Dirección incorrecta<br>
      • Demora en entrega<br><br>
      🍔 <strong>Pedido incorrecto</strong><br>
      • Falta producto<br>
      • Producto equivocado<br>
      • Problema de calidad<br><br>
      📝 <strong>Describe tu problema específico</strong> para ayudarte mejor.`;
    }

    // Quejas y reclamos
    if (
      lowerMessage.includes('😠') ||
      lowerMessage.includes('🤬') ||
      lowerMessage.includes('queja') ||
      lowerMessage.includes('reclamo')
    ) {
      return `😟 <strong>Lamento que tengas una mala experiencia</strong><br><br>
      🙏 Queremos solucionarlo inmediatamente.<br><br>
      📋 <strong>Para ayudarte mejor, necesito:</strong><br>
      • ¿Qué pasó exactamente?<br>
      • Número de orden (si aplica)<br>
      • Fecha y hora del incidente<br>
      • Sede donde ocurrió<br><br>
      ⚡ <strong>Soluciones inmediatas:</strong><br>
      • Reembolso completo<br>
      • Nuevo pedido sin costo<br>
      • Descuento para próxima compra<br><br>
      📞 <strong>Contacto directo:</strong> WhatsApp +57 300 123 4567<br><br>
      💬 Cuéntame qué ocurrió y lo solucionamos YA.`;
    }

    // Preguntas sobre precios
    if (
      lowerMessage.includes('precio') ||
      lowerMessage.includes('costo') ||
      lowerMessage.includes('vale')
    ) {
      return `💰 <strong>PRECIOS ACTUALIZADOS</strong><br><br>
      🍔 <strong>Hamburguesas:</strong> $15.000 - $22.000<br>
      🍟 <strong>Combos:</strong> $18.000 - $45.000<br>
      🥤 <strong>Bebidas:</strong> $3.000 - $10.000<br>
      🍰 <strong>Postres:</strong> $8.000 - $9.000<br><br>
      🚚 <strong>Domicilio:</strong> GRATIS pedidos +$30.000<br>
      🚚 <strong>Domicilio:</strong> $4.000 pedidos menores<br><br>
      💳 <strong>Métodos de pago:</strong><br>
      • Efectivo<br>
      • Tarjetas débito/crédito<br>
      • PSE<br>
      • Nequi, Daviplata<br><br>
      🎯 <strong>Descuentos disponibles:</strong><br>
      • 10% estudiantes (con carné)<br>
      • 15% adultos mayores<br>
      • 20% cumpleañeros<br><br>
      ¿Qué producto específico te interesa?`;
    }

    // Ayuda general expandida
    if (lowerMessage.includes('ayuda') || lowerMessage === '?') {
      return `🆘 <strong>¿EN QUÉ PUEDO AYUDARTE?</strong><br><br>
      🔥 <strong>Acciones rápidas:</strong><br>
      • Hacer pedido → Escribe '2' o 'pedido'<br>
      • Ver menú → Escribe '3' o 'menú'<br>
      • Soporte → Escribe '1' o 'ayuda técnica'<br>
      • Precios → Escribe 'precios'<br>
      • Horarios → Escribe 'horarios'<br><br>
      ❓ <strong>Preguntas frecuentes:</strong><br>
      • ¿Cuánto demora el domicilio?<br>
      • ¿Qué métodos de pago aceptan?<br>
      • ¿Hacen domicilios los domingos?<br>
      • ¿Tienen opciones vegetarianas?<br>
      • ¿Cómo cancelo un pedido?<br><br>
      💬 <strong>Escribe tu pregunta</strong> y te ayudo inmediatamente.<br><br>
      📞 <strong>¿Prefieres hablar con un humano?</strong><br>
      Llámanos: +57 (1) 234-5678`;
    }

    // Cancelaciones
    if (lowerMessage.includes('cancelar') || lowerMessage.includes('anular')) {
      return `❌ <strong>CANCELACIÓN DE PEDIDOS</strong><br><br>
      ⏰ <strong>Puedes cancelar SI:</strong><br>
      • Han pasado menos de 5 minutos desde el pedido<br>
      • El pedido aún no está en preparación<br>
      • No ha salido para entrega<br><br>
      💰 <strong>Reembolsos:</strong><br>
      • Efectivo: Inmediato<br>
      • Tarjeta: 3-5 días hábiles<br>
      • PSE: 1-2 días hábiles<br><br>
      📋 <strong>Para cancelar necesito:</strong><br>
      • Número de orden<br>
      • Motivo de cancelación<br>
      • Método de pago usado<br><br>
      ⚡ <strong>Proceso rápido:</strong><br>
      1. Dame tu número de orden<br>
      2. Verifico el estado<br>
      3. Cancelo si es posible<br>
      4. Proceso reembolso<br><br>
      📞 <strong>¿Urgente?</strong> Llama: +57 (1) 234-5678<br><br>
      ¿Cuál es tu número de orden?`;
    }

    // Fallback mejorado con sugerencias inteligentes
    return `🤔 <strong>No entendí completamente tu mensaje</strong><br><br>
    💡 <strong>¿Quisiste decir?</strong><br>
    • "Hacer un pedido" → Escribe 'pedido'<br>
    • "Ver el menú" → Escribe 'menú'<br>
    • "Hablar con soporte" → Escribe 'ayuda'<br>
    • "Conocer precios" → Escribe 'precios'<br>
    • "Ver horarios" → Escribe 'horarios'<br><br>
    🔍 <strong>O escribe directamente:</strong><br>
    • Nombre de un producto<br>
    • Tu pregunta completa<br>
    • El número de una opción<br><br>
    💬 <strong>Mensaje recibido:</strong> "${userMessage}"<br><br>
    🚀 <strong>¡Estoy aquí para ayudarte! Inténtalo de nuevo.</strong> 😊`;
  }

  // Evento para enviar texto
  chatSendBtn.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      addMessage(userMessage, 'user');
      chatInput.value = '';

      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse, 'bot');
      }, 1000);
    }
  });

  // Evento para detectar Enter en el input
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      chatSendBtn.click();
    }
  });

  // Evento para enviar emojis
  emojiPanel.forEach((emoji) => {
    emoji.addEventListener('click', function () {
      const emojiMessage = emoji.innerText;
      addMessage(emojiMessage, 'user');

      // Ocultar el panel después de seleccionar uno
      const panel = document.getElementById('emojiPanel');
      panel.classList.add('hidden');

      setTimeout(() => {
        const botResponse = getBotResponse(emojiMessage);
        addMessage(botResponse, 'bot');
      }, 1000);
    });
  });

  // Cerrar el panel de emojis al hacer clic fuera de él
  document.addEventListener('click', function (event) {
    const panel = document.getElementById('emojiPanel');
    const trigger = document.getElementById('toggleEmojiPanel');

    if (!panel.contains(event.target) && !trigger.contains(event.target)) {
      panel.classList.add('hidden');
    }
  });
});

// Panel de emoji (el evento toggle ya está cubierto arriba o se puede mantener simplificado)
document.getElementById('toggleEmojiPanel').addEventListener('click', function (e) {
  e.stopPropagation(); // Evitar que el evento de cierre global lo oculte inmediatamente
  const emojiPanel = document.getElementById('emojiPanel');
  emojiPanel.classList.toggle('hidden');
});

// Funcionalidad de arrastre del modal
document.addEventListener('DOMContentLoaded', function () {
  const modalContent = document.getElementById('chatbotModalContent');
  const modalHeader = document.getElementById('chatbotModalHeader');

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  modalHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - modalContent.offsetLeft;
    offsetY = e.clientY - modalContent.offsetTop;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  const onMouseMove = (e) => {
    if (!isDragging) return;

    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;

    modalContent.style.left = `${left}px`;
    modalContent.style.top = `${top}px`;
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
});
