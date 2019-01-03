const API = require('./lib/call')
const assert = require('assert')

module.exports = token => {
  const api = API({
    baseURL: 'https://oauth.opskins.com/v1/',
    token
  })

  return {
    // authorize({client_id, response_type, state}, duration, mobile, scope) {
    //   assert(client_id, 'client id required')
    //   assert(response_type, 'resposne type required')
    //   assert(state, 'state required')

    //   const {response} = await api.get('authorize', {
    //     client_id, response_type, state, duration, mobile, scope
    //   })
    //   return response
    // },
    accessToken(code) {
      assert(code, 'code required')

      const {response} = await api.post('access_token', {
        grant_type: 'authorization_code', code
      })
      return response
    },
    refreshToken (refresh_token) {
      assert(refresh_token, 'token required')

      const {response} = await api.post('revoke_token', {
        grant_type: 'refresh_token', refresh_token
      })
      return response
    },
    revokeToken(token) {
      assert(token, 'token required')

      const {response} = await api.post('revoke_token', {
        token_type: 'refresh', token
      })
      return response
    }
  }
}
