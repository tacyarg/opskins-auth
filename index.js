const IOAuth = require('./lib/IOAuth')
const Oauth = require('./lib/oauth')
const assert = require('assert')

module.exports = key => {
  assert(key, 'opskins api key required')

  return {
    ...IOAuth(key),
    ...Oauth(),
  }
}
