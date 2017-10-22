const axios = require('axios')
const md5 = require('md5')

const __emit__ = function({ url, username, appname, createdAt, uuid, request, response, labels = [] }) {
  return axios.post(url, {
    username, appname, createdAt, uuid, request, response, labels
  })
}

// 自动创建 createdAt
const _emit = function({url, username, appname, uuid, labels = []}) {
  return function({request, response}) {
    const createdAt = new Date()
    return __emit__({ url, username, appname, createdAt, uuid, request, response, labels })
  }
}

// 传递 url username appname labels
// 自动创建 uuid
const watcher = function({watcherServerUrl, username, appname, labels = []}) {
  const uuid = md5(new Date().toString() + Math.random())
  return {
    emitReq: function(request) {
      let {url, headers, params, method, queries} = request
      request = {url, headers, params, method, queries}
      return _emit({url: watcherServerUrl, username, appname, uuid, labels})({request})
    },
    emitRes: function(response) {
      let {status, data, headers} = response
      response = {status, data, headers}
      return _emit({url: watcherServerUrl, username, appname, uuid, labels})({response})
    }
  }
}

module.exports = watcher