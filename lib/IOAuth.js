const API = require('./lib/call')
const assert = require('assert')

module.exports = token => {
  const api = API({
    baseURL: 'https://api.opskins.com/IOAuth/',
    token,
  })

  return {
    async createClient({name, redirect_uri}, can_keep_secret) {
      assert(name, 'client name required')
      assert(redirect_uri, 'redirect url required')

      const {response} = await api.post('CreateClient/v1/', {
        name, redirect_uri, can_keep_secret
      })
      return response
    },
    async deleteClient(client_id) {
      assert(client_id, 'client id required')

      const {response} = await api.post('DeleteClient/v1/', {
        client_id
      })
      return response
    },
    async getOwnedClientList() {
      const {response} = await api.post('GetOwnedClientList/v1/')
      return response.clients
    },
    async resetClientSecret(client_id) {
      assert(client_id, 'client id required')

      const {response} = await api.post('ResetClientSecret/v1/', {
        client_id
      })
      return response
    },
    async updateClient(client_id, { name, redirect_uri}) {
      assert(client_id, 'client id required')

      const {response} = await api.post('UpdateClient/v1/', {
        client_id, name, redirect_uri
      })
      return response.client
    }
  }
}
