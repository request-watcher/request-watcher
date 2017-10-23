const axios = require('axios')
const md5 = require('md5')

const __emit__ = function({ path, username, appname, createdAt, uuid, request, response, labels = [] }) {
  return axios.post(path, {
    username, appname, createdAt, uuid, request, response, labels
  })
}

// 自动创建 createdAt
const _emit = function({path, username, appname, uuid, labels = []}) {
  return function({request, response}) {
    const createdAt = new Date()
    return __emit__({ path, username, appname, createdAt, uuid, request, response, labels })
  }
}

// 传递 path username appname labels
// 自动创建 uuid
const watcher = function({path, origin, username, appname, labels = []}) {
  const uuid = md5(new Date().toString() + Math.random())
  path = path || origin + '/receiver'
  return {
    emitReq: function(request) {
      let {url, headers, params, method, queries} = request
      request = {url, headers, params, method, queries}
      return _emit({path, origin, username, appname, uuid, labels})({request})
    },
    emitRes: function(response) {
      let {status, data, headers} = response
      response = {status, data, headers}
      return _emit({path, username, appname, uuid, labels})({response})
    }
  }
}

module.exports = watcher