import { createTransporter } from "../config/nodemailer.js";

// Función genérica para enviar correos
async function sendEmail({ to, subject, text, html }) {
    const transporter = createTransporter(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    );

    const info = await transporter.sendMail({
        from: 'AppSalon <no-reply@appsalon.com>',
        to,
        subject,
        text,
        html,
    });

    console.log('Mensaje enviado', info.messageId);
}

// Función para generar el cuerpo del correo
function generateEmailBody({ name, actionUrl, purpose }) {
    const actionText = purpose === 'verification'
        ? 'confirma tu cuenta'
        : 'restablece tu contraseña';

    return {
        text: `Hola ${name},\n\nPor favor, ${actionText} en AppSalon haciendo clic en el siguiente enlace:\n\n${actionUrl}\n\nSi no solicitaste esta acción, puedes ignorar este mensaje.\n\nGracias,\nEl equipo de AppSalon`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">¡Hola ${name}!</h2>
                <p>Para completar tu solicitud, por favor ${actionText} haciendo clic en el siguiente enlace:</p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="${actionUrl}" style="background-color: #4A90E2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">${purpose === 'verification' ? 'Confirmar cuenta' : 'Restablecer contraseña'}</a>
                </p>
                <p>Si no solicitaste esta acción, puedes ignorar este mensaje.</p>
                <p>Gracias,</p>
                <p><strong>El equipo de AppSalon</strong></p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #777;">Si tienes problemas con el botón de arriba, copia y pega la siguiente URL en tu navegador:</p>
                <p style="font-size: 12px; color: #777;">${actionUrl}</p>
            </div>
        `,
    };
}

// Función para enviar correo de verificación
export async function sendEmailVerification({ name, email, token }) {
    const actionUrl = `${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}`;
    const { text, html } = generateEmailBody({ name, actionUrl, purpose: 'verification' });

    await sendEmail({
        to: email,
        subject: 'Confirma tu cuenta en AppSalon',
        text,
        html,
    });
}

// Función para enviar correo de restablecimiento de contraseña
export async function sendEmailPasswordReset({ name, email, token }) {
    const actionUrl = `${process.env.FRONTEND_URL}/auth/restablecer-contrasena/${token}`;
    const { text, html } = generateEmailBody({ name, actionUrl, purpose: 'reset' });

    await sendEmail({
        to: email,
        subject: 'Restablece tu contraseña en AppSalon',
        text,
        html,
    });
}