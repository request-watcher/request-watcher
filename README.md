# request-watcher

An util for [request-watcher-server](https://github.com/lisiur/request-watcher-webapp/tree/master/server)

![](https://lisiur.com/2017/10/22/%E5%85%88%E5%8D%A0%E4%B8%AA%E5%9D%91/1.png)
![](https://lisiur.com/2017/10/22/%E5%85%88%E5%8D%A0%E4%B8%AA%E5%9D%91/2.png)
## Install

```bash
yarn add request-watcher request-watcher-server -D
```

**The app requires node v7.6.0 or higher for ES2015 and async function support**

## Usage

### Start Server

```javascript
// server.js
const server = require('request-watcher-server')
server.listen(3000)
```

```bash
node server.js
```

### Watch Request

```javascript
const watcher = require('request-watcher')
const watcherParams = {
  path: 'http://localhost:3000/receiver',
  username: 'username',
  appname: 'appname',
  labels: [],
}

const { emitReq, emitRes } = watcher(watcherParams)

// emitReq :: request -> Promise 
emitReq(requestParams)
// emitRes :: response -> Promise
emitRes(responseParams)

```
#### watcherParams

> watcherParams is an Object Containing the following properties

Args              | Type                                | Description
-------------     | -------------                       | --------
path              | String (path or origin required one)| watcher server path(need to manually add '/receiver' after origin) 
origin            | String (path or origin required one) | watcher origin (will automatically add '/receiver') 
username          | String (required)                    | one of the request markers
appname           | String (require)                     | one of the request markers
labels            | \[String\] (optional)                | add extra label to request to differentiate

#### requestParams

> requestParams is an Object Containing the following properties

Args              | Type                 | Description
------------------|----------------------|---------
url               | String (optional)    | request url
method            | String (optional)    | request method
headers           | Object (optional)    | request headers
queries           | Object (optional)    | query string params
params            | Object (optional)    | request params in body


#### responseParams

> responseParams is an Object Containing the following properties

Args              | Type                 | Description
------------------|----------------------|---------
status            | Integer (optional)   | response status
headers           | Object (optional)    | response headers
data              | Object (optional)    | response data


## MORE

- **Note that each time you monitor a request, you need to use the `watcher` function to regenerate the matching `emitreq` and `emitres`**

- Clicking the `Console` button outputs the data to the browser's console and obtains a global variable `$it` pointing to that data
## Example

Refer to this [example](https://github.com/lisiur/request-watcher-webapp/tree/master/end-user-app-test)