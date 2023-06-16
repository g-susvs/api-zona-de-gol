const { response, json } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleverify } = require('../helpers/google-verify');
const emailer = require('../email/emailer');

const googleSingIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleverify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                img
            };

            usuario = new Usuario(data);
            await usuario.save();
            emailer.sendMail(usuario);
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Todo bien',
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    googleSingIn
}