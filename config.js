const GLOBAL_CONFIG = {
    username: 'username',
    appname: 'appname',
    origin: 'http://0.0.0.0:2333',
    labels: [],
}

function setConfig({username=GLOBAL_CONFIG.username, appname=GLOBAL_CONFIG.appname, origin=GLOBAL_CONFIG.origin, labels=GLOBAL_CONFIG.labels}) {
    GLOBAL_CONFIG.username = username || GLOBAL_CONFIG.username
    GLOBAL_CONFIG.appname = appname || GLOBAL_CONFIG.appname
    GLOBAL_CONFIG.origin = origin || GLOBAL_CONFIG.origin
    GLOBAL_CONFIG.labels = labels || GLOBAL_CONFIG.labels
}

module.exports = {
    get GLOBAL_CONFIG() {
        return GLOBAL_CONFIG
    },
    setConfig,
}