const GLOBAL_CONFIG = {
    username: 'username',
    appname: 'appname',
    origin: 'http://0.0.0.0:2333',
    labels: [],
}

module.exports = {
    get GLOBAL_CONFIG() {
        return GLOBAL_CONFIG
    },
}