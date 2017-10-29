const axios = require('axios')
const md5 = require('md5')
const { GLOBAL_CONFIG } = require('./config')

const __emit__ = function({ path, username, appname, createdAt, uuid, request, response, logger, labels = [], save }) {
  return axios.post(path, {
    username, appname, createdAt, uuid, request, response, logger, labels, save
  })
}

// 自动创建 createdAt
const _emit = function({ path, username, appname, uuid, labels = [] }, save) {
  return function({ request, response, logger }) {
    const createdAt = new Date()
    return __emit__({ path, username, appname, createdAt, uuid, request, response, logger, labels, save })
  }
}

// 传递 path username appname labels
// 自动创建 uuid
const watcher = function(params={}) {
  let { origin, username, appname, labels = [], save } = params

  const uuid = md5(new Date().toString() + Math.random())

  origin = origin || GLOBAL_CONFIG.origin
  username = username || GLOBAL_CONFIG.username
  appname = appname || GLOBAL_CONFIG.appname
  labels = labels || GLOBAL_CONFIG.labels
  save = save || GLOBAL_CONFIG.save

  const path = origin + '/receiver'

  return {
    emitReq: function(request) {
      let { url, headers, params, method } = request
      request = { url, headers, params, method }
      return _emit({ path, username, appname, uuid, labels })({ request })
    },
    emitRes: function(response) {
      let { status, data, headers } = response
      response = { status, data, headers }
      return _emit({ path, username, appname, uuid, labels })({ response })
    },
    emitLog: function(logger) {
      let { title, content } = logger
      logger = { title, content }
      return _emit({ path, username, appname, uuid, labels })({ logger })
    }
  }
}

// 将 watcher.global 作为一个 config 收集器
watcher.global = GLOBAL_CONFIG

// Logger
watcher.logger = function(title, content) {
  if (!content) {
    content = title
  }
  title = title.toString()
  const { emitLog } = watcher()
  emitLog({ title, content })
}

watcher.use = function (watcherFunc) {
  if (typeof watcherFunc === 'function') {
    watcherFunc(watcher)
  } else {
    throw new Error('Given arg is not supported')
  }
}

module.exports = watcher