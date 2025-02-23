import {createTransporter} from "../config/nodemailer.js";

export async function sendEmailNewAppointment({date, time}) {
    const transporter = createTransporter(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    );

    // Enviar email
    const info = await transporter.sendMail({
        from: 'AppSalon <no-reply@appsalon.com>',
        to: 'admin@appsalon.cl',
        subject: 'Nueva Cita',
        text: `Nueva cita agendada para el día ${date} a las ${time}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">¡Hola Admin!</h2>
                <p>Se ha agendado una nueva cita para el día <strong>${date}</strong> a las <strong>${time}</strong>.</p>
                <p>Gracias,</p>
                <p><strong>El equipo de AppSalon</strong></p>
                
            </div>
        `
    });

    console.log('Mensaje enviado', info.messageId);
}

export async function sendEmailUpdateAppointment({date, time}) {
    const transporter = createTransporter(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    );

    // Enviar email
    const info = await transporter.sendMail({
        from: 'AppSalon <no-reply@appsalon.com>',
        to: 'admin@appsalon.cl',
        subject: 'Cita actualizada',
        text: `Cita actualizada para el día ${date} a las ${time}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">¡Hola Admin!</h2>
                <p>Se ha actualizado una cita para el día <strong>${date}</strong> a las <strong>${time}</strong>.</p>
                <p>Gracias,</p>
                <p><strong>El equipo de AppSalon</strong></p>
                
            </div>
        `
    });

    console.log('Mensaje enviado', info.messageId);
}

export async function sendEmailCancelAppointment({date, time, email, name, services}) {
    const transporter = createTransporter(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    );

    // Enviar email
    const info = await transporter.sendMail({
        from: 'AppSalon <no-reply@appsalon.com>',
        to: 'admin@appsalon.cl',
        subject: 'Cita cancelada',
        text: `Cita cancelada para el día ${date} a las ${time}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">¡Hola Admin!</h2>
                <p>El/la desgraciado/a de <strong>${name}</strong> ha cancelado la cita para el día <strong>${date}</strong> a las <strong>${time}</strong>.</p>
                <p>Correo: ${email}</p>
                <p>Servicios:</p>
                <ul>
                    ${services.map(service => `<li>${service.name}</li>`).join('')}
                </ul>             
                <p>Gracias,</p>
                <p><strong>El equipo de AppSalon</strong></p>
                
            </div>
        `
    });

    console.log('Mensaje enviado', info.messageId);
}
