---
title: flickr api test
date: 2019-07-01 18:34:53
tags: [flickr, api]
---

### Flickr API

Flickr API 比较方便，可以从 [官方文档页](http://flickr.com/services/api/) 查看。其中 REST 服务的端点是 [http://api.flickr.com/services/rest/](http://api.flickr.com/services/rest/) 。

### API key

API key 需要通过 Yahoo ID 登录申请。

### URI 结构

相应的请求可以通过拼接 API 参数。

### 相关参数

- method 参数：传递需要调用的方法

- api_key 参数：传递申请的 API key

- format 参数：告知服务器返回的参数

- nojsoncallback 参数：使用 1 告知 Flickr 返回的数据不应包括封闭方法名和括号，便于解析数据。

  