const Axios = require('axios')
const assert = require('assert')

module.exports = function(config) {
  assert(config.baseURL, 'api baseURL required')
  assert(config.token, 'api token required')

  const { token } = config

  const request = Axios.create({
    baseURL: config.baseURL,
    headers: {
      Authorization: `Basic ${token}`,
    },
  })

  return function(method, endpoint, params) {
    if (!params) params = {}

    if (method === 'get') {
      params = {
        params,
      }
    }

    return request[method](endpoint, params)
      .then(res => {
        assert(res.status === 200, 'request status not ok')
        res.data
      })
      .catch(err => {
        throw new Error(err.response.data.message)
      })
  }
}
