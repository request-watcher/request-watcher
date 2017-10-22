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
const watcher = function({url, username, appname, labels = []}) {
  const uuid = md5(new Date().toString() + Math.random())
  return {
    emitReq: function(request) {
      let {url, headers, params, method, queries} = request
      return _emit({url, username, appname, uuid, labels})({url, headers, method, queries})
    },
    emitRes: function(response) {
      let {status, data, headers} = response
      return _emit({url, username, appname, uuid, labels})({status, data, headers})
    }
  }
}

module.exports = watcher