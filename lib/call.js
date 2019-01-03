const Axios = require('axios')
const assert = require('assert')

module.exports = function({ baseURL, token }) {
  assert(baseURL, 'api baseURL required')
  assert(token, 'api token required')

  const request = Axios.create({
    baseURL: config.baseURL,
    headers: {
      Authorization: `Basic ${token}`,
    },
  })

  function request(method, endpoint, params) {
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

  return {
    _request: request,
    post(endpoint, params) {
      return request('post', endpoint, params)
    },
    get(endpoint, params) {
      return request('get', endpoint, params)
    },
  }
}
