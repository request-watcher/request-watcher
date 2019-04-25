import GLOBAL_CONFIG from './config'

/**
 * emit request to path
 * 
 * @param {string, object} {path, ...params} 
 * @returns promise
 */
function __emit__({path, ...params}) {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      body: params
    }
  })
}


/**
 * auto create createdAt
 * 
 * @param {any} {path, ...params} 
 * @returns () => promise
 */
function _emit_({path, ...params}) {
  return function({request, response, logger}) {
    const createdAt = new Date()
    return __emit__({path, createdAt, request, response, logger, ...params})
  }
}

function Watcher({origin, username, appname, labels, save} = GLOBAL_CONFIG) {
  const uuid = Math.random().toString(36).substr(2)
  const path = origin + '/receiver'
  const emit = (params) => _emit_({path, username, appname, uuid, labels, save})(params)

  return {
    emitReq({url, headers, params, method}) {
      const request = {
        url, headers, params, method
      }
      return emit({request})
    },
    emitRes({status, data, headers}) {
      const response = {
        status, data, headers
      }
      return emit({response})
    },
    emitLog({title, content}) {
      const logger = {
        title, content
      }
      return emit({logger})
    }
  }
}

Watcher.logger = function(watcherParams) {
  return function(title, content=title) {
    if (title === undefined) title = 'undefined'
    if (title === null) title = 'null'
    title = title.toString()
    const { emitLog } = Watcher(watcherParams)
    emitLog({title, content})
  }
}

Watcher.global = GLOBAL_CONFIG

Watcher.use = function (watcherFunc) {
  if (typeof watcherFunc === 'function') {
    watcherFunc(Watcher)
  } else {
    throw new Error('Given arg is not supported')
  }
}

export default Watcher