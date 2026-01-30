/* eslint-disable */

// ========================================
// IMPORTACIÓN DE DEPENDENCIAS
// ========================================
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Cargar variables de entorno

// ========================================
// CONFIGURACIÓN INICIAL DEL SERVIDOR
// ========================================
const app = express();
const port = process.env.PORT || 3000;

// ========================================
// CONFIGURACIÓN DE CORS
// ========================================
app.use(
  cors({
    origin: '*', // Permitir cualquier origen en el despliegue
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// ========================================
// MIDDLEWARES
// ========================================
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public' (subiendo un nivel desde 'backend')
app.use(express.static(path.join(__dirname, '../public')));

// ========================================
// CONFIGURACIÓN DEL TRANSPORTADOR DE EMAIL
// ========================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Desde .env
    pass: process.env.EMAIL_PASS, // Desde .env
  },
});

// ========================================
// RUTAS Y ENDPOINTS
// ========================================
app.post(['/enviar-factura', '/api/enviar-factura'], (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).send('Faltan datos para enviar el correo.');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error al enviar el correo:', error);
      return res.status(500).send('Error al enviar el correo.');
    }
    console.log('✅ Correo enviado con éxito:', info.response);
    res.status(200).send('Correo enviado con éxito.');
  });
});

// ========================================
// INICIALIZACIÓN DEL SERVIDOR
// ========================================
// Solo ejecutar .listen() si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
  });
}

// Exportar la aplicación para que Vercel pueda manejarla como una función serverless
module.exports = app;
