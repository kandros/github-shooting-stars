const baseUrl = 'https://api.github.com/users/kandros/starred?per_page=100'
const axios = require('axios')


module.exports = function getRepos(url = baseUrl, repos = []) {
    return axios.get(url).then(res => res.data)
}