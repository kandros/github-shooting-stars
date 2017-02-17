const firebase = require('firebase')
const config = require('../config')

firebase.initializeApp({
    apiKey: process.env.firebase_api_key,
    authDomain: process.env.firebase_auth_domain,
    databaseURL: process.env.firebase_database_url,
})

const consumedIdsRef = firebase.database().ref(config.consumedReposIdsPath)

module.exports.getConsumedIds = async() => {
    const consumedIdsSnapshot = await consumedIdsRef.once('value')
    return consumedIdsSnapshot.val() || []
}

module.exports.setConsumedIds = (newVal) => {
    consumedIdsRef.set(newVal)
}



