'use strict'

const shuffle = require('lodash/shuffle')
const handleStatus = require('./utils/handle-status')
const compose = require('./utils/compose')
const getRepos = require('./utils/get-repos')
const { sendEmail } = require('./utils/email-utils')
const { getConsumedIds, setConsumedIds } = require('./utils/firebase-utils')
const jwtAuth = require('micro-jwt-auth')


const handle = async({ url }) => {
    if (url === '/send') {
        
        const allRepos = await getRepos()
        const consumedIds = await getConsumedIds()
        
        const availableRepos = shuffle(allRepos).filter(repo => !consumedIds.includes(repo.id))
        
        const repos = [
            availableRepos.pop(),
            availableRepos.pop(),
            availableRepos.pop(),
        ]
        
        if (availableRepos.length <= 3) {
            setConsumedIds([])
        } else {
            const idsToConsume = repos.map(repo => repo.id)
            setConsumedIds([...consumedIds, ...idsToConsume])
        }
        
        const shootingStars = repos.map(repo => (
            {
                name: repo.full_name,
                description: repo.description || '',
                url: repo.html_url,
            }
        ))
        
        sendEmail(shootingStars)
        
        return 'sending...'
        
    } else {
        return 'no action'
    }
}

module.exports = compose(
    jwtAuth(process.env.JWT_SECRET),
    handleStatus
)(handle)
