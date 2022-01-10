const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'forja.tiendaweb@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN
    },
    tls: {
        rejectUnauthorized: false
    }
});
/* Hay que renovar el access token para que funcione (creo) */
module.exports = transporter
