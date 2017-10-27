# request-watcher

A tool that forwards network requests

![](https://lisiur.com/2017/10/22/%E5%85%88%E5%8D%A0%E4%B8%AA%E5%9D%91/1.png)
![](https://lisiur.com/2017/10/22/%E5%85%88%E5%8D%A0%E4%B8%AA%E5%9D%91/2.png)
## Install

```bash
$ npm install -g request-watcher-server
$ npm install -D request-watcher
```

## Usage

### Start Server

> **The server requires node v7.6.0 or higher for ES2015 and async function support**

Once you globally installed the request-watcher-server, you will get a global cmd `request-watcher-server` and also `rws` for short.

And then you can use the following cmd:

```bash
$ rws [-a 0.0.0.0] [-p 2333]
```

> default address is 0.0.0.0:2333
> you can use `rws -h` to get more help

### Watch Request

```javascript
const watcher = require('request-watcher')
const watcherParams = {
  username: 'username',
  appname: 'appname',
  labels: [],
}

// e.g.
// before send a request, emit the request to request-watcher-server
const { emitReq, emitRes } = watcher(watcherParams)
const requestParams = { url, params, headers, method: 'POST' }
emitReq(requestParams)
axios.post(url, params, headers)
  .then(res => {
    // after get the response, emit the response to request-watcher-server
    const { status, data, headers } = res
    const responseParams = { status, data, headers }
    emitRes(responseParams)
    // your biz code bellow
  })
  .catch(err => {
  })

```

> **Note that each time you watch a request, you need to use the `watcher` function to regenerate the matching `emitReq` and `emitRes`**

#### watcherParams

> watcherParams is an Object Containing the following properties

Args              | Type                                | Description
-------------     | -------------                       | --------
origin            | String (optional)                   | watcher origin
username          | String (required)                   | one of the request markers
appname           | String (required)                   | one of the request markers
labels            | \[String\] (optional)               | add extra label to request to differentiate

#### requestParams

> requestParams is an Object Containing the following properties

Args              | Type                 | Description
------------------|----------------------|---------
url               | String (optional)    | request url
method            | String (optional)    | request method
headers           | Object (optional)    | request headers
params            | Object (optional)    | request params in body


#### responseParams

> responseParams is an Object Containing the following properties

Args              | Type                 | Description
------------------|----------------------|---------
status            | Integer (optional)   | response status
headers           | Object (optional)    | response headers
data              | Object (optional)    | response data

### Watch Logger

You can just emit a log to the server, like bellow:

```javascript
const { emitLog } = watcher(watcherParams)

const loggerParams = { title: 'logger', content: 'this is a log' }
emitLog(loggerParams)

```

#### loggerParams

> loggerParams is an Object Containing the following properties

Args              | Type                 | Description
------------------|----------------------|---------
title             | String (optional)    | logger title
content           | Any (optional)       | logger content

### Global Config

You can use `watcher.global` to define global params, and thus you can just use `watcher()` without passing params.

```javascript
watcher.global.origin = 'http://127.0.0.1:8080' // default is 'http://0.0.0.0:2333'
watcher.global.username = 'lisiur' // default is 'username'
watcher.global.appname = 'test-app' // default is 'appname'

const { emitReq, emitRes } = watcher()
const { emitLog } = watcher()
```

## Plugins

We support plugin to simplify the configs. And now we have those plugins:

- [request-watcher-axios](https://github.com/lisiur/request-watcher-axios)

### Plugin Usage

Using axios for example:

```javascript
const watcher = require('request-watcher')
watcher.use(require('request-watcher-axios'))
```

And then, you can just focus on your biz code without inserting redundant code before or after the ajaxing code.

## Eggs

- Clicking the `Console` button outputs the data to the browser's console and obtains a global variable `$it` pointing to that data.

## Example

Refer to this [example](https://github.com/request-watcher/request-watcher-example)

Enjoy! :)