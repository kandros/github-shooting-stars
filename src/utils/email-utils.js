const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

/**
 * How to find token/ids
 * https://medium.com/@pandeysoni/nodemailer-service-in-node-js-using-smtp-and-xoauth2-7c638a39a37e#.5lw07f2mu
 */

const defaultOptions = {
    from: 'github-shooting-stars <repos@github-shooting-stars.com>',
    to: process.env.email,
    subject: 'github-shooting-stars repos',
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.email,
        clientId: process.env.google_client_id,
        clientSecret: process.env.google_client_secret,
        refreshToken: process.env.google_refresh_token
    }
})

module.exports.sendEmail = function(shootingStars) {
    const mailOptions = Object.assign({}, defaultOptions)
    
    mailOptions.text = JSON.stringify(shootingStars, null, 2)
    mailOptions.html = JSON.stringify(shootingStars, null, 2)
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
    })
}

