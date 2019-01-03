const API = require('./lib/call')

module.exports = config => {
  const api = API({
    baseURL: 'https://oauth.opskins.com/v1/',
    token: ''
  })

  return {
    
  }
}