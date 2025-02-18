import {createTransporter} from "../config/nodemailer.js";

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransporter(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    );

    const emailString = `${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}`

    // Enviar email
    const info = await transporter.sendMail({
        from: 'AppSalon <no-reply@appsalon.com>',
        to: email,
        subject: 'Confirma tu cuenta en AppSalon',
        text: `Hola ${name},\n\nPor favor, confirma tu cuenta en AppSalon haciendo clic en el siguiente enlace:\n\n${emailString}\n\nSi no creaste esta cuenta, puedes ignorar este mensaje.\n\nGracias,\nEl equipo de AppSalon`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">¡Hola ${name}!</h2>
                <p>Gracias por registrarte en <strong>AppSalon</strong>. Para completar tu registro, por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="${emailString}" style="background-color: #4A90E2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar cuenta</a>
                </p>
                <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
                <p>Gracias,</p>
                <p><strong>El equipo de AppSalon</strong></p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #777;">Si tienes problemas con el botón de arriba, copia y pega la siguiente URL en tu navegador:</p>
                <p style="font-size: 12px; color: #777;">${emailString}</p>
            </div>
        `
    });

    console.log('Mensaje enviado', info.messageId);
}