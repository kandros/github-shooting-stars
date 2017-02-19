const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')
const axios = require('axios')

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

function getHtml(repos) {
    return axios.post(process.env.email_template_rendenderer_url, {
        templateName: 'github-shooting-stars',
        data: {
            repos
        }
    }).catch(err => {
        console.log(err)
    })
}

module.exports.sendEmail = async function(repos) {
    const mailOptions = Object.assign({}, defaultOptions)
    
    mailOptions.text = JSON.stringify(repos, null, 2)
    mailOptions.html = await getHtml(repos)
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
    })
}

