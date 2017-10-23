# request-watcher
An util for request-watcher-server

![](https://lisiur.com/2017/10/22/%E5%85%88%E5%8D%A0%E4%B8%AA%E5%9D%91/1.png)
![](https://lisiur.com/2017/10/22/%E5%85%88%E5%8D%A0%E4%B8%AA%E5%9D%91/2.png)
## Install

```bash
yarn add request-watcher request-watcher-server -D
```

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
#### watcherParams 说明

> watcherParams 是一个对象，包含如下属性

参数               | 类型                                | 说明
-------------     | -------------                       | --------
path              | String (path or origin required one)| watcher 服务器地址(需要手动在 origin 后加上/receiver) 
origin            | String (path or origin required one) | watcher origin (会自动加上 /receiver) 
username          | String (required)                    | 请求标志符之一
appname           | String (require)                     | 请求标志符之一
labels            | \[String\] (optional)                | 为请求添加额外 label 以区分

#### requestParams 说明

> requestParams 是一个对象，包含如下属性

参数               | 类型                 | 说明
------------------|----------------------|---------
url               | String (optional)    | 请求地址
method            | String (optional)    | 请求方法
headers           | Object (optional)    | 请求头
queries           | Object (optional)    | query string params
params            | Object (optional)    | 在 body 中的请求参数


#### responseParams 说明

> responseParams 是一个对象，包含如下属性

参数               | 类型                 | 说明
------------------|----------------------|---------
status            | Integer (optional)   | 返回状态
headers           | Object (optional)    | 返回头
data              | Object (optional)    | 返回数据

**需要注意的是，每次对请求进行监控都需要使用 `watcher` 函数来重新生成匹配的 `emitReq` 和 `emitRes`**

## MORE

点击 `Console` 按钮会将数据输出到浏览器的 console 中，并获得一个指向该数据的全局变量 `$it`
## Example

可以参考[这个示例](https://github.com/lisiur/request-watcher-webapp/tree/master/end-user-app-test)。