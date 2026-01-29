const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Configurar CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Manejar solo método POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { to, subject, html } = req.body;

        // Validar datos del request
        if (!to || !subject || !html) {
            console.error('❌ Faltan datos en el request:', { to: !!to, subject: !!subject, html: !!html });
            return res.status(400).json({ error: 'Faltan datos para enviar el correo.' });
        }

        // Validar variables de entorno
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (!emailUser || !emailPass) {
            console.error('❌ Variables de entorno no configuradas');
            return res.status(500).json({
                error: 'Configuración del servidor incompleta. Por favor contacta al administrador.',
                details: 'EMAIL_USER o EMAIL_PASS no están configurados en Vercel'
            });
        }

        console.log('📧 Intentando enviar email a:', to);

        // Configuración del transportador
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        // Verificar la conexión antes de enviar
        await transporter.verify();
        console.log('✅ Conexión SMTP verificada');

        const mailOptions = {
            from: emailUser,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Correo enviado con éxito:', info.response);

        return res.status(200).json({
            success: true,
            message: 'Correo enviado con éxito.',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('❌ Error al enviar el correo:', error);

        // Determinar el tipo de error
        let errorMessage = 'Error al enviar el correo.';
        let statusCode = 500;

        if (error.code === 'EAUTH') {
            errorMessage = 'Error de autenticación con el servidor de email.';
            console.error('❌ Verifica las credenciales de Gmail');
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'No se pudo conectar al servidor de email.';
        }

        return res.status(statusCode).json({
            error: errorMessage,
            details: error.message,
            code: error.code
        });
    }
};
