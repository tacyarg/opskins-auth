const API = require('./lib/call')
const assert = require('assert')

module.exports = token => {
  const api = API({
    baseURL: 'https://api.opskins.com/IUser/',
    token,
  })

  return {
    async getProfile() {
      const {response} = await api.post('GetProfile/v1/')
      return response
    }
  }
}
