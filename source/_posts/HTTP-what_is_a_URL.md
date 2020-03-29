---
title: 什么是 URL
date: 2020-03-29 06:43:23
tags: http
---

### URL

URL（Uniform Resource Locator，统一资源定位符）访问网页时需要输入的网页地址，表示资源的地点。URL的作用是指向一个特定的互联网资源


<!--more-->

```
http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
```

URI 格式依次由：协议方案(scheme，常见的有http,https,ftp,mailto)、登陆信息、服务器地址(常见为域名或者IP地址)、服务器端口号（http协议默认是80端口）、带层次的文件路径（path）、查询字符串（query）和片段标识符构成。

- "http://"是超文本传输协议，这里指明浏览器应当使用的协议。常用的还有 mailto:（打开邮件客户端）和 ftp:（文件传输协议）
- "www.example.com" 是域名，标识一台服务器。在知道ip地址时这里也可以替换为IP地址（不方便也不常用）。
- ":80"是端口。特别的 HTTP 协议的默认端口为 80，HTTPS 的默认端口为 443。
- "/path/to/myfile.html" 是资源的路径。既可以是实体路径（存在这个文件）也可以是抽象路径（不存在实际文件，但服务器会提供一种回应方式）。
- "?key1=value1&key2=value2"是用于告知服务器的额外参数，使用 & 间隔凭借的键值对。
- "#SomewhereInTheDocument"锚点参数，告知当前页面的参数。如跳转到指定的标签。



