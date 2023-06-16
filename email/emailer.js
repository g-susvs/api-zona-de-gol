const nodemailer = require('nodemailer');


const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d4e56cacf6ac44",
            pass: "0557f49ec6029f"
        }
    });
    return transport;
}

const sendMail = async (user) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Andrew" <foo@example.com>',
        to: `${user.correo}`,
        subject: `Hola ${user.nombre} Bienvenido a Zona de Gol!`,
        html: "<b>Hola Mundo</b>",
    });
    console.log("Mensaje enviado a :", info.messageId);
    return
}


exports.sendMail = (user) => sendMail(user)