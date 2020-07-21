---
title: 重拾《图解HTTP》
date: 2020-07-21 22:25:24
tags: HTTP
---

## 又一次学习《图解HTTP》

时隔两年，再次复习《图解HTTP》的内容。



<!--more-->



### Q: URL 输入浏览器中发生了什么？

A:浏览器通过 HTTP(超文本传输协议) 这一协议将信息发送至 Web 服务器获取文件资源，将内容显示在为 Web 页面。

- DNS(域名系统) 域名解析
- 建立 TCP 连接，三次握手
- 发起 HTTP 请求
- 接受 HTTP 响应
- 浏览器显示网页
- 断开 TCP 连接，四次挥手


### Q:HTTP 逐代都有哪些特点？

A：
1. HTTP 1.X -> HTTP 1.0
   - 引入更多的缓存控制策略；
   - 带宽优化，允许请求部分；
   - 错误通知，增加了错误码；
   - Host 头处理，支持虚拟主机多域名同一 IP 地址；
   - 支持长连接，多个 HTTP 请求，默认 keep-alive；

2. HTTPS(HTTP + SSL 层，安全的 HTTP)
   - HTTPS 协议需要 CA 申请证书；
   - HTTPS 运行在 SSL/TLS 之上，对传输内容加密；
   - HTTPS 使用 443 端口，HTTP 使用 80 端口；
   - HTTPS 可以防止运营商挟持

3. SPDY(HTTP 2.0 雏形) -> HTTP 1.X
   - 多路复用，多个请求 stream 共享 TCP 连接；
   - 请求优先级
   - header 压缩
   - 基于 HTTPS 的加密协议传输，强制 HTTPS
   - 支持服务端推送


4. HTTP 2.0 -> HTTP 1.X
   - 头信息支持使用二进制格式，HTTP 1.X 头信息使用 ASCII 码
   - 多路复用，连接共享，低延迟
   - header 压缩，cache header
   - 服务端推送

5. HTTP 2.0 -> SPDY
   - 支持明文 HTTP 传输，SPDY 强制使用 HTTPS
   - header 使用 HPACK 压缩；SPDY 使用 DEFLATE 压缩







