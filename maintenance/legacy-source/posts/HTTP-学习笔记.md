---
title: HTTP学习笔记
date: 2018-05-04 11:40:19
tags: HTTP
---

### Web 页面的实现



##### Web 基于 HTTP 协议通信

> 客户端（Client）的 Web 浏览器从 Web 服务器端获取文件资源等信息 。



<!--more-->



1. 浏览器的地址栏输入 URL
2. URL 信息送往某处
3. 从某处得到回复
4. 将回复内容显示在 Web 页面上

Web 建立在 **HTTP 协议**（HyperText Transfer Protocol，超文本传输协议）实现通信。

目前主流的 HTTP 版本：HTTP/1.1

##### TCP/IP 网络层

网络分层：

- 设计各层之间接口，若需要改变设计只需改动有变动的层
- 简化设计，只需完成该层的任务

位于应用层的 HTTP 数据每经过一层就会打上属于该层的首部信息，这一过程称为**封装**。

1. **IP** （Internet Protocol）网际协议位于网络层，任务是传输数据包。

   IP 协议中有两种地址：IP 地址和 MAC 地址（Media Access Control Address）

- IP 地址：网络中分配到的地址，全网唯一；（IP 地址分段，就像邮编决定数据流动的方向）


- MAC 地址：每个网卡固定有一个 MAC 地址，无法改变。（ARP 协议用于解析 IP 地址，得到 MAC 地址）

2. **TCP** 位于传输层：提供通过可靠的字节流服务。

   TCP 的可靠传输：三次握手策略（SYN 和 ACK）

- 发送端发送 SYN  标志的数据包；


- 接收端回传 SYN/ACK 标志的数据包传达确认信息；
- 发送端再回传一个 ACK 标志的数据包；

##### DNS 服务

**DNS** （Domain Name System）服务是位于应用层，可以提供域名解析服务。

在网络中，每个主机都有唯一的 IP 地址，在互联网中我们却不太可能全部使用一串数字来记住网站，我们使用的是**域名**。

- 计算机网络使用 IP 地址来实现网络中数据的传输。
- 用户使用域名来访问网站。
- 用户通过访问 DNS 服务器询问域名的 IP 地址，取得 IP 地址后，就可以通过 IP 地址访问。

##### URL 和 URI

- URL（Uniform Resource Locator，统一资源定位符）访问网页时需要输入的网页地址，表示资源的地点。
- URI（Uniform Resource Identifier，统一资源标识符）用字符串标识某一互联网资源。

```
http://user:pass@www.example.jp:80/dir/index/htm?uid=1#ch1
```

URI 格式依次由：协议方案、登陆信息、服务器地址、服务器端口号、带层次的文件路径、查询字符串和片段标识符构成。

### HTTP 协议

##### 客户端和服务器

HTTP 协议中，必然是一方为客户端，一方为服务器。

- 客户端：请求访问文本或图像等资源的一端；
- 服务器端：提供资源响应的一端；

> 通信的双方是不对等的，因此在通信过程中，通常上行速度比下载速度慢很多。

##### 请求和响应

客户端和服务器端通过请求和响应的交换达成通信。

- 客户端先发送请求；
- 服务器再发送响应；
- 服务器本身无法在没有请求时发送响应

1. 客户端发送请求

```http
GET /index.htm HTTP/1.1
Host: hackr.jp
```

- 起始行的 GET 表示请求访问的方法（method）；
- 字符串 /index.htm 指明了请求访问的资源对象，就是请求 URI（request-URI）；
- HTTP/1.1 为客户端 HTTP 版本号；
- 也就是说，向主机名为 hackr.jp 的服务器请求 /index.hem 页面资源。
- 总的来说，请求报文是由请求方法、请求 URI、协议版本、可选的请求首部字段和内容实体构成。

2. 服务器发送响应

```http
HTTP/1.1 200 OK
Date: Tue, 10 Jul 2012 06:50:15 GMT
Content-Length: 362
Content-Type: text/html

<html>
...
```

- HTTP/1.1 为服务器对应的 HTTP 版本。
- 200 OK 为请求的处理结果的状态码（status code）和原因短语（reason-phrase）
- 之后的为首部字段（header field）
- 空一行之后为资源的主体（entity body）
- 响应报文由协议版本、状态码、原因短语、首部字段和实体主题


##### Cookie 解决状态问题

HTTP 协议自身不对请求和响应之间的通信状态进行保存。这样一来，服务器只需要专一化的处理响应 HTTP 请求即可，减少了服务器 CPU 和内存的消耗。

当然 Web 网络中状态管理还是很重要的，如果网站每次都要重新登录和重新认证，结果是很糟糕的。Cookie 技术会在请求和响应报文中加入 Cookie 信息来控制客户端的状态。

1. 没有 Cookie 时发出请求

- 客户端向服务器发出请求
- 服务器通过生成 Cookie 信息（这一时刻记住了客户端信息）
- 在响应中添加 Set-Cookie 的首部字段信息。
- 服务器回复响应
- 客户端收到后就把 Cookie 保存起来。

2. 有 Cookie 状态信息时发出请求

- 客户端主动在请求报文中添加 Cookie 信息
- 客户端向服务器发出请求
- 服务器检查 Cookie 信息
- 服务器回复响应

#####  请求 URI 定位网络资源

HTTP 协议使用 URI 定位互联网上的资源，客户端访问请求资源发送请求时，需要在请求报文中添加 URI 。

1. 使用完整的请求 URI

```http
GET /index.htm HTTP/1.1
```

2. 使用 Host 首部字段写明网络域名或 IP 地址

```http
GET /index.htm HTTP/1.1
```

3. 使用 * 来代替 URI 只访问服务器

```http
OPTIONS * HTTP/1.1
```

#####  HTTP 方法告知服务器意图

- GET ：获取资源

```http
GET /index.html HTTP/1.1
Host: www.hackr.jp
```

返回 index.html 的页面资源。

- POST ：传输实体主体

```http
POST /submit.cgi HTTP/1.1
Host: www.hackr.jp
Content-length: 1560
```

返回 submit.cgi 接收数据的处理结果

- PUT ：传输文件

```http
PUT /example.html HTTP/1.1
Host: www.hackr.jp
Content-Type: text/html
Content-Length: 1560
```

向服务器上传文件，存在安全性问题，一般不使用，需要 Web 验证机制。

- HEAD ：获得报文首部

```http
HEAD /index.html HTTP/1.1
Host: www.hackr.jp
```

告知服务器无需返回报文主体部分，确认 URI 的有效性及资源更新日期时间。

- DELETE ：删除文件

```http
DELETE /example.html HTTP/1.1
Host: www.hackr.jp
```

删除服务器上的资源，存在安全性问题，一般不使用，需要 Web 验证机制。

- OPTIONS ：询问支持的方法

  ```http
  OPTIONS * HTTP/1.1
  Host: www.hackr.jp
  ```

针对服务器查询针对请求 URI 指定的资源支持的方法。

- TRACE ：追踪路径

  ```http
  TRACE / HTTP/1.1
  Host: hackr.jp
  Max-Forward: 2
  ```

让 Web 服务器端将之前的请求通信环回给客户端，不常使用，可能引起跨站追踪（Cross-Site Tracing）。

添加 Max-Forward 首部字段的数值，每经过服务器数值减一，数值为 0 的服务器返回状态码 200 OK 的响应。

- CONNECT ：要求用隧道协议连接代理

  ```http
  CONNECT proxy.hackr.jp:8080 HTTP/1.1
  Host: proxy.hackr.jp
  ```

要求与代理服务器通信时建立隧道，实现用隧道协议进行 TCP 通信。

主要使用 SSL（Secure Sockets Layer，安全套接层）和 TSL（Transport Layer Security， 传输层安全）协议把通信内容加密后经网络隧道传输。

#####  HTTP 方法指挥服务器

使用方法作为命令来向服务器下达命令，可以指定请求的资源的行为。

- HTTP/1.0：GET、POST、PUT、HEAD、DELETE、LINK、UNLINK（HTTP/1.1删除 LINK 和 UNLINK）
- HTTP/1.1：GET、POST、PUT、HEAD、DELETE、OPTIONS、TRACE、CONNECT

#####  持久连接减少通信量

原始的 Web 页面信息很少，每进行一次 HTTP 通信就建立一次 TCP 连接。

- 建立 TCP 连接
- HTTP 请求
- HTTP 响应
- 断开 TCP 连接

通信过程：建立 - 请求 - 响应 - 断开

如果一个页面包含大量数据，那就需要建立多次请求。每次请求又会重新断开和建立 TCP 连接，这就造成了许多无谓的开销。

通信过程：建立 - 请求 - 响应 - 断开 - 建立 - 请求 - 响应 - 断开 - ...

解决方案一：**持久连接**

**持久连接**（HTTP Persistent Connection，也称为 HTTP keep-alive 或者 HTTP connection reuse）的特点是只要任意一方提出断开连接，则保持 TCP 连接状态。这样的好处在于在于减少了 TCP 连接的重复建立和断开所造成的额外开销，减轻了服务器端的负载；同时也减少了传输所用的时间，加快了 Web 页面的显示速度

通信过程：建立 - 请求 - 响应 - 请求 - 响应 - ... - 请求 - 响应 - 断开

解决方案二：**管线化**

**管线化技术**允许客户端无需等待响应可以直接发送下一个请求。这样一来就可以做到同时并行发送多个请求，而不需要等待响应。

通信过程：建立 - 请求 1 - 请求 2 - 响应 1 - 响应 2 - 断开

### HTTP 报文信息

##### HTTP 报文

HTTP 报文是用于 HTTP 协议交互的信息，是由多行数据构成的字符串文本 。客户端发出请求报文，服务器端回复响应报文。

HTTP 报文分为报文首部和报文主体两部分。二者由空行（CR+LF）来划分。通常，并不一定需要报文主体。

- 报文首部：服务器端或客户端需处理的请求或响应的内容及属性。
- 空行 CR + LF：CR（Carriage Return，回车符：0x0d）和 LF（Line Feed，换行符：0x0a）
- 报文主体：应被发送的数据。

##### 请求报文和响应报文结构

###### 请求报文结构

- 请求报文 = 请求报文的首部 + 空行 + 报文主体
- 请求报文首部 = 请求行 + 请求首部字段 + 通用首部字段 + 实体首部字段 + 其他

###### 请求报文实例

```http
GET / HTTP/1.1
Host: hackr.jp
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv13.0) Geoko/20100101 Firefox/13.0.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: ja,en-us;q=0.7,en;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Connection: keep-alive
Pragma: no-cache
Cache-Control: co-cache
 (空行：CR+LF)
```

###### 响应报文结构

响应报文 = 响应报文的首部 + 空行 + 报文主体

响应报文首部 = 状态行 + 响应首部字段 + 通用首部字段 + 实体首部字段 + 其他

###### 响应报文实例

```http
HTTP/1.1 200 OK
Date: Fri, 13 Jul 2012 02:45:26 GMT
Server: Apache
Last-Modified: Fri, 31 Aug 2007 02:02:20 GMT
ETag: "45bael-16a-46d776ac"
Accept-Range: bytes
Content-Length: 362
Connection: close
Content-Type: text/html
 (空行：CR+LF)
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>hackr.jp</title>
</head>
<body>
<img src="hackr.gif" alt="hackr.jp" width="240" height="84" />
</body>
</html>
```

报文的组成

- 请求行：请求的方法，请求 URI 和 HTTP 版本
- 状态行：响应结果的状态码，原因短语和 HTTP 版本。
- 首部字段：请求首部（或响应首部）、通用首部和实体首部
- 其他：HTTP 的 RFC 未定义的首部

##### 编码提升传输速率

HTTP 协议可以通过计算机编码来压缩或分割传输的内容，提升传输的速率。同样地，编码需要额外消耗计算机资源。

###### 报文主体和实体主体

报文是 HTTP 通信的基本单位，由 8 位组字节流组成，通过 HTTP 通信。

实体作为响应或请求的有效载荷数据被传输，其内容有实体首部和实体主体组成。

- 对于没有编码的情况，报文主体等于实体主体；
- 对于有编码的情况，报文主体为实体主体编码之后的产物；

内容编码和分块传输编码

- **内容编码**指明应用在实体内容上的编码格式，并保持尸体信息原样压缩。压缩编码后的实体有客户端接收并负责解码。

- **分块传输编码**通过把数据分割成多块，让大容量数据分块逐步显示在 Web 页面上。

  ###### 多部分对象集合

MIME（Multipurpose Internet Mail Extensions，多用途因特网邮件拓展）允许邮件处理文本、图片、视频等多个不同类型的数据。多部分对象集合最早应用在可以添加多份附件的邮件系统中，HTTP 协议中也采纳了多部分对象集合，发送的一份报文主体中可以含有多类型实体。

包含的对象如下：

- multipart/from-data：在 Web 表单上传文件时使用
- multipart/byteranges：状态码 206（Partial Content，部分内容）响应报文包含了多个范围的内容时使用

###### 获取部分内容的范围请求

**断点续传**是解决大容量传输的另一个方案：为了避免下载中断的引起下载任务从头开始，需要从下载中断处回复下载的机制。实现这样的功能的请求为**范围请求**，范围请求可以通过首部字段 Range 来指定下载的实体字节范围。

范围请求实例

```http
GET /tip.jpg HTTP/1.1
Host: www.usaidesign.jp
Range: bytes =5001-10000
```

范围请求的响应

```http
HTTP/1.1 206 Partial Content
Date: Fri, 13 Jul 2012 04:29:17 GMT
Content-Range: bytes 5001-10000/10000
Content-Length: 5000
Content-Type: image/jpeg

...
```

> 特别地，追对范围请求
>
> - 响应范围请求时，服务器返回状态码 206 Partial Content
> - 无法响应范围请求时，服务器返回状态码 200 OK 

###### 内容协商机制

**内容协商机制**是指客户端和服务器之间就相应的资源内容进行交涉，然后提供给客户端最为合适的资源。

内容协商技术有三种类型：

- 服务器驱动协商
- 客户端驱动协商
- 透明协商

在请求报文中通过使用以下首部字段：

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language
- Content-Language

### HTTP 状态码

状态码的作用是当客户端向服务器端发送请求时，描述返回的请求结果。

|      | 类别          | 原因短语                   |
| ---- | ------------- | -------------------------- |
| 1XX  | Informational | 接受的请求正在处理         |
| 2XX  | Success       | 请求正常处理完毕           |
| 3XX  | Redirection   | 需要进行附加操作以完成请求 |
| 4XX  | Client Error  | 服务器无法处理请求         |
| 5XX  | Server Error  | 服务器处理请求出错         |

##### 2XX 成功

- 200 OK ：请求被正常处理了
- 204 No Content ：接受的请求已经处理，但返回的报文中不包含主体
- 206 Partial Content ：服务器正常响应了范围请求

##### 3XX 重定向

- 301 Moved  Permanently ： 永久性重定向。客户端应该使用新的 URI 
- 302 Found ：临时性重定向。用户（本次）应当使用新的 URI 访问（尽管禁止 POST 改 GET，实际还是这样操作）
- 303 See Other ：由于请求对应的资源存在另一个 URI ，应使用 GET 方法定向获取请求的资源。
- 304 Not Modified ：请求的附带条件不满足，返回 304 Not Modified 不包含任何响应的主体
- 307 Temporary Redirect ：临时性重定向。与 302 一致但不会从 POST 变成 GET。

##### 4XX 客户端错误

- 400 Bad Request ：请求报文中存在语法错误
- 401 Unauthorized ：需要 HTTP 认证或者认证失败（This server could not verify that you are authorized to access the document requested. Either you supplied the wrong credentials (e.g., bad password), or your browser doesn't understand how to supply the credentials required）
- 403 Forbidden ：对请求资源的访问被服务器拒绝了，服务器无需给出理由
- 404 Not Found ：服务器上没有请求的资源（The request URL /a  was found on this server）

##### 5XX 成功

- 500 Internet Server Error
- 503 Service Unavailable

### 与 HTTP 协作的 Web 服务器

一台 Web 服务器可以搭建多个独立域名的 Web 网站，也可以作为通信路径上的中转服务器提升传输效率。

##### 单台主机实现多个域名

HTTP/1.1允许允许一台 HTTP 服务器利用虚拟主机（Virtual  Host）搭建多个 Web 站点。

当两个域名同时部署在同一个服务器上时，只会有一个 IP 地址，这时 DNS 服务器解析域名时，二者的访问 IP 地址也会相同。因此必须在 Host 首部内完成指定主机名或域名的 URI。

##### 通信数据转发程序：代理、网关、隧道

HTTP 通信中除了客户端和服务器以外，还有一些配合服务器工作，用于通信数据的转发的应用程序，例如代理、网关和隧道。

- 代理：位于客户端和服务器中间有转发功能的应用程序。接收客户端的请求并转发给服务器，接收服务器的响应并转发给客户端。
- 网关：转发其他服务器通信数据的服务器，接收客户端发送来的请求时，会像自己拥有资源的服务器一样对请求进行处理。
- 隧道：在客户端和服务器两者之间进行中专，并保持双方通信连接的应用程序。

###### 代理

代理服务器的基本行为是接收客户端的请求后转发给其他服务器。代理不改变请求 URI ，会直接发送给源服务器。多部代理服务器可以级联，转发时，需要附加 Via 首部字段以标记出经过的主机信息。

多种用途：

- 利用缓存技术减少网络带宽
- 组织内部针对特定网站的访问控制
- 获取访问日志为主要目的

两种分类基准：

- 缓存代理：预先将资源的副本保存在代理服务器上，再次接受请求时不从源服务器获取资源，而是将缓存作为响应返回。
- 透明代理：不对报文做任何加工的代理称为透明代理；对报文进行加工的代理称为非透明代理。

###### 网关

网关能使通信线路上的服务器提供非 HTTP 协议服务。网关能在客户端与网关之间的通信线路上加密，提高通信的安全性。

###### 隧道

隧道可以建立一条与其他服务器的通信连接，并使用 SSL 等加密手段进行通信，确保客户端能与服务器进行安全的通信。此外，隧道本身是透明的，隧道本身不解析 HTTP 请求，保持原样中转给之后的服务器，并自动在在通信双方断开连接时结束。

##### 保存资源的缓存

缓存是代理服务器或客户端本地磁盘内保存的资源副本，利用缓存可以减少对源服务器的访问，节省了通信流量和通信时间。

缓存服务器是代理服务器的一种，属于缓存代理。缓存服务器可以利用缓存文件避免多次的从服务器转发资源，一方面通信时间减少，另一方面也可以同时减小服务器的压力。

- 当然缓存必须是有期限，万一源服务器的资源有更新，缓存就会失效。
- 缓存服务器需要根据客户端要求或者缓存的有效期等音速，向服务器确认确认资源的有效性。
- 若缓存失效，将再次获取新的资源
- 浏览器也可以存在于客户端，也会确认并更新资源的有效性。

### HTTP 首部

四种首部字段类型

- 通用首部字段（都会使用的首部）
- 请求首部字段（仅请求）
- 响应首部字段（仅响应）
- 实体首部字段（仅含有实体的报文）

##### 通用首部字段

- Cache-Control：控制缓存的行为
- Connection：控制不再转发给代理的首部字段，控制持久连接
- Date：创建 HTTP 报文的日期时间
- Pragma：只用于请求报文中，要求所有中间服务器不返回缓存的资源
- Trailer：记录报文主体后的首部字段
- Transfer-Encoding：指定报文主体的编码方式
- Upgrade：指定升级为其他通信协议
- Via：追踪客户端和服务器之间请求和响应报文的传输路径
- Warning：告知用户警告内容

##### 请求首部字段

- Accept：用户代理可处理的媒体类型以及媒体相对优先级
- Accept-Charset：用户代理支持的字符集和字符集的相对优先顺序
- Accept-Encoding：用户代理支持的内容编码和内容编码的优先级顺序
- Accept-Language：用户代理能处理的自然语言集和自然语言集的相对优先级
- Authorization：用户代理的认证信息（证书值）
- Expect：告知服务器，期待服务器的特定行为，无法理解时返回 417 Expectation Failed
- From：告知服务器使用用户代理的用户的电子邮箱地址
- Host：告知服务器，请求资源所在的主机名和端口号（必须包含在请求内的首部字段）
- If-Match：比较实体标记（Etag 与字段值匹配一致，服务器才接受请求，否则返回状态码 412）
- If-Modified-Since：比较资源的更新时间（指定时间后有更新，接受请求，否则返回状态码 304）
- If-None-Match：比较实体标记（与 If-Match 相反）
- If-Range：字段值与 ETag 或更新的日期时间匹配一致，就作为范围请求处理（否则返回全部资源）
- If-Unmodified-Since：比较资源的更新时间（与 If-Modified-Since 相反）
- Max-Forwards：最大传输逐跳数（可经过的服务器数量，转发次数）
- Proxy-Authorization：代理服务器要求客户端的认证信息
- Range：范围请求时，服务器资源的字节范围
- Referer：对请求中 URI 的原始获取方
- TE：告知服务器客户端能够处理的响应的传输编码方式和相对优先级
- User-Agent：HTTP 客户端程序的信息（创建请求的浏览器，用户代理名称等信息）

##### 响应首部字段

- Accept-Ranges：告知客户端服务器是否接受字节范围请求（可以时字段值为 bytes，否则为 none）
- Age：由缓存服务器创建，资源经上次认证经过的时间
- Etag：告知客户端实体标识，将资源以字符串形式做唯一性标识的方式分配 ETag
- Location：可以将响应接收方引导至某个与请求 URI 位置不同的资源
- Proxy-Authenticate：把由代理服务器对客户端要求的认证信息发送给客户端
- Retry-After：告知客户端再次发起请求的时间
- Server：当前服务器上 HTTP 服务器应用程序的信息
- Vary：代理服务器缓存的管理信息，仅对请求中含有相同 Vary 指定首部字段的请求返回缓存。
- WWW-Authenticate：HTTP 访问认证。访问请求 URI 制定资源的认证方案和带参数的质询。

##### 实体首部字段

- Allow：资源可支持的 HTTP 方法
- Content-Encoding：实体主体适用的内容编码方式
- Content-Language：实体主体使用的自然语言
- Content-Length：实体主体的大小（单位字节）（内容编码时，不再使用该字段）
- Content-Location：报文主体返回资源对应的 URI
- Content-MD5：报文主体的 MD5 码，验证作用
- Content-Range：实体主体的位置范围
- Content-Type：实体主体内对象的媒体类型
- Expires：实体主体过期的日期时间
- Last-Modified：资源的最后修改日期时间

##### 为 Cookie 服务的首部字段

- Set-Cookie：开始状态管理所使用的 Cookie 信息
- Cookie：服务器接收到的 Cookie 信息

##### 其他首部字段

- X-Frame-Options：响应首部，控制网站内容在其他 Web 网站的 Frame 标签内的显示问题
- X-XSS-Protection：响应首部，针对跨站脚本攻击，控制浏览器 XSS 防护机制的开关
- DNT：请求首部，拒绝个人信息被收集的
- P3P：响应首部，利用 P3P 技术，让 Web 网站上的个人隐私变成仅供程序可理解的形式，保护用户隐私

### HTTPS：安全的 HTTP

HTTP 协议中有可能存在信息窃听或身份伪装等安全问题，使用 HTTPS 通信机制可以有效地防止这些问题。

##### HTTP 的缺点

- 通信使用明文，内容可能遭遇窃听
- 不验证通信双方的身份，可能遭遇伪装
- 无法验证报文的完整性，有可能遭遇篡改

###### 通信使用明文可能会被窃听

>  HTTP 协议不对通信进行加密

互联网由能连通到全世界的网络组成的，通信的数据包在全网中流动传输。只要在互联网中，所有的报文信息都是全网可见的。为了保证通信的安全性，加密处理才是有效的方案。

- 通信的加密（安全的通信线路）

HTTP 协议没有加密机制，但是可以通过和 SSL（Secure Socket Layer，安全套接层）或 TLS（Transport Layer Security）的组合使用，加密 HTTP 的通信内容。与 SSL 组合使用的 HTTP 被称为 HTTPS（HTTP Secure，超文本传输安全协议）或 HTTP over SSL。

- 内容的加密（安全的通信内容）

客户端将 HTTP 报文进行加密处理后再发送请求。为了服从 HTTP 协议的要求，报文首部不加密而只对报文主体加密处理。客户端和服务器需要同时有加密和解密机制，但是没有安全的通信线路，内容仍有被篡改的风险。

######不验证通信双方的身份就可能遭遇伪装

> HTTP 协议不对请求和响应的通信双方进行确认。
>
> - 伪装的 Web 服务器和客户端
> - 无访问权限的通信方
> - 无法判定请求方
> - Dos 攻击（Denial of Service，拒绝服务器攻击）

- 查明对方的证书

虽然使用 HTTP 无法确定通信方，如果使用 SSL 则可以。SSL 不仅提供加密处理，而且还使用证书来验证通信方。**证书**由值得信任的第三方机构颁发根据密码学原理生成，用以证明服务器和客户端是实际存在的。有了证书，就可以证明给通信方就是期望的服务器。

###### 无法证明报文完整性可能已遭篡改

>  HTTP 协议无法证明通信的报文完整性，因此，在请求或响应送出之后直到对方接收之前的时间内，即使请求或响应的内容遭到篡改，也没有办法获悉。（中间人攻击，Man-in-the-Middle attack，MITM）

HTTP 协议存在的确定报文完整性的方法并不便捷、可靠，常用的是 MD5 和 SHA-1 等散列值校验方法和确认文件的数字签名方法。使用这些方法也无法确保结果正确，因为校验值本可能被改写。

**为了防止这三个弊端，因此需要使用 HTTPS。**

##### HTTPS = HTTP + 加密 + 认证 + 完整性保护

HTTPS 不是新的协议，只是 HTTP 通信接口部分用 SSL 和 TLS 协议代替而已。

- 一般情况下，HTTP 直接与 TCP 通信。
- 采用 SSL 时，HTTP 就先与 SSL 通信，再由 SSL 和 TCP 通信。

##### 对称加密和非对称加密

对称加密指的是加密和解密同用一个密钥的加密方式：

- 密钥对于任何一方都是一样的
- 任何人只要持有密钥就可以加密和解密
- 密钥必须安全地提前发给对方
- 安全性的漏洞在于通信过程必须安全地告知对方

非对称加密指的是加密和解密同用一对非对称密钥的加密方式：

- 密钥分为公钥和私钥，公钥对所有人公开，私钥由接收方单独持有
- 持有公钥可以加密，持有私钥可以解密
- 只要将公钥公开交付，交由发送方加密
- 缺点是加密解密的速度更慢

实际上，两种加密机制都有缺点，对称加密无法安全传输密钥，非对称加密的加密过程耗时更多，HTTPS 采用的是两种机密方式并用的混合加密机制。

- 使用非对称加密安全地交换对称加密中的密钥；
- 建立通信后，再使用对称加密方式；

###### 证书证明公开密钥的真实性

证书的作用是证明公开密钥的真实性。

数字证书认证机构是对于客户端和服务器都可信任的第三方机构，专门颁发公开密钥的数字证书。服务器将服务器申请的公开密钥做数字签名，这就是数字证书。数字签名是使用数字证书认证机构的私钥加密的，这能证明文件是从数字证书认证机构颁发的。

服务器将数字证书发送至客户端，客户端可以用数字机构的公开密钥验证，一旦验证就知道认证机构和服务器的公开密钥有效。

###### HTTPS 安全通信机制

> 对于一个主机来说，要想保证绝对的通信安全，唯一可信的只有自己。

在只有主机可信的前提下，怎样建立安全的通信机制。万幸浏览器帮了我们一个大忙，多数浏览器都会实现在内部植入常用认证机关的公开密钥。

- 浏览器事先植入认证机构公钥
- 服务器向客户端发送公钥证书
- 客户端用认证机构的公钥确认证书的真实性
- 客户端取出服务器公钥
- 客户端使用服务器的公钥加密
- 服务器用私钥解密实现安全通信


### 确认访问用户的身份

> 某些 Web 页面需要有一些权限，这就需要认证功能。

HTTP/1.1 使用的认证方式

- BASIC 认证（基本认证）
- DIGEST 认证（摘要认证）
- SSL 客户端认证
- FormBase 认证（基于表单认证）

###### BASIC 认证

BASIC 认证虽然采用 Base64 编码方式，这只是编码方式，不需要任何信息就可以解码。在非 HTTP 的线路上使用 BASIC 认证是很不安全的。此外，浏览器无法注销操作，认证使用上不够灵活。因此 BASIC 认证并不常用。

###### DIGEST 认证

DIGEST 认证是使用质询/响应的方式（challenge/response），但不会像 BASIC 认证那样直接发送明文密码。质询/响应的方式是指，一开始一方会先发送认证要求给另一方，接着使用从另一方接收到的质询码计算生成响应码。最后向响应码返回给对方进行认证的方式。相比 BASIC 认证，安全性更高。

###### SSL 客户端认证

SSL 客户端使用 HTTPS 的客户端证书完成认证。客户端证书由安全性极高的认证机构颁发，但需要支付一定的费用。以客户端证书进行客户端认证，足以证明服务器正在通信的对方是预料的客户端。

SSL 客户端认证不仅依靠证书完成认证，一般会和基于表单认证组合使用一种双因素认证来使用。SSL 客户端证书用来认证客户端计算机，基于表单认证用来确定这时本人的行为。

###### 基于表单认证

基于表单认证并不是在 HTTP 协议中定义，客户端会像服务器上的 Web 应用程序发送登录信息，按登录信息的验证结果验证。BASIC 认证和 DIGEST 认证安全性和便利性都不够，SSL 客户端足够安全但成本过高，基于表单认证足够安全，也不需要一定的标准规范，因此比较常见。

###### Session 管理及 Cookie 应用

基于表单认证的标准的缺点是 HTTP 的无协议特性，无法实现状态管理，因此使用 Cookie 管理 Session（会话）。

客户端发送已登陆信息，服务器向用户发放 Session ID 记录认证状态，之后通过验证 Session ID 来判定对方是真实用户。

### 基于 HTTP 的功能追加协议

##### HTTP 瓶颈

基于 HTTP 协议无法做到实时更新 Web 页面上的内容。

HTTP 的一些标准会成为瓶颈：

- 一条连接上只可发送一个请求。
- 请求只能从客户端开始。客户端不可以接收除响应以外的指令。
- 请求/响应首部未经压缩就发送。首部信息越多延迟越大。
- 发送冗长的首部。每次互相发送相同的首部造成的浪费较多。
- 可任意选择数据压缩格式。非强制压缩发送。

###### Ajax 的解决方法

Ajax（Asynchronous JavaScript and XML，异步 JavaScript 与 XML 技术）是一种有效利用 JavaScript 和 DOM（Document Object Model，文件对象模型）达到局部 Web 页面替换加载的异步通信手段（只更新部分页面，减少响应中传输的数据量）。

###### Comet 的解决方案

Comet 延迟响应，挂起状态，直至内容更新返回响应。

这一过程模拟了服务器向客户端推送（Server Push）功能。尽管 Comet 实现了实时更新，但维持连接消耗更多资源，仍未解决 HTTP 协议的问题。

##### SPDY 缩短 Web 页面的加载时间

SPDY 没有完全改写 HTTP 协议，而是在 TCP/IP 的应用层与运输层之间通过新加会话层的形式运作，同时 SPDY 规定通信中使用 SSL。

HTTP 处于应用层，SPDY 会话层，SSL 处于表示层，TCP 处于传输层。

使用 SPDY 后，HTTP 协议额外获得一些功能：

- 多用复用流：一次 TCP 连接可以无限制处理多个 HTTP 请求，效率提高。
- 赋予请求优先级：SPDY 可以给请求分配优先级顺序，解决带宽低而相应变慢的问题。
- 压缩 HTTP 首部：减少通信数据包的字节数。
- 推送功能：支持服务器主动向客户端推送功能。
- 服务器提示功能：服务器可以主动提示客户端所需的资源。

##### 使用浏览器进行全双工通信的 WebSocket

利用 Ajax 和 Comet 级数进行通信可以提升 Web 的浏览速度，WebSocket 网络技术是避免 HTTP 的瓶颈的新协议及 API。WebSocket 既支持服务器向客户端推送数据，也支持持续保持 WebSocket 连接，以更短的首部减少通信量。

WebSocket，即 Web 浏览器与 Web 服务器之间全双工通信标准。一旦 Web 服务器与客户端之间建立起 WebSocket 协议的通信连接，之后所有的通信都依靠这个专用协议进行，通信过程中可互相发送 JSON、XML、HTML 或图片等任意格式，并且双方都可以直接向对方发送报文。

###### 握手·请求

为了实现 WebSocket 通信，需要用到 HTTP 的 Upgrade 首部字段，告知服务器通信协议发生改变，以达到握手的目的。

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Conection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

- Sec-WebSocket-Key：记录握手过程中必不可少的键值
- Sec-WebSocket-Protocol：记录使用的子协议

###### 握手·响应

响应 WebSocket 通信，返回的状态码为 101 Switching Protocols。

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgeade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

Sec-WebSocket-Accept 的值根据握手请求中 Sec-WebSocket-Key 的字段值生成。成功握手确立 WebSocket 连接之后，通信时不在使用 HTTP 的数据帧，而采用 WebSocket 独立的数据帧。

###### WebSocket API

JavaScript 可调用 “The WebSocket API” 内提供的 WebSocket 程序接口，以实现 WebSocket 协议下全双工通信。

```javascript
var socket = new WebSocket('ws://game.example.com:12010/updates');
socket.onopen = function(){
    setInterval(function(){
        if (socket.bufferedAmount == 0)
            socket.send(getUpdateData());
    }, 50);
};
```

##### Web 服务器管理文件的 WebDAV

WebDAV（Web-based Distributed Authoring and Versioning，基于万维网的分布式创作和版本控制）是一个可对 Web 服务器上的内容直接进行进行文件复制、编辑等操作的分布式文件系统。

HTTP/1.1的 PUT 方法和 DELETE 方法，可以对 Web 服务器上的文件进行创建和删除操作，出于安全性和便捷性一般不使用。

WebDAV 新增加的概念：

- 集合（Collection）：一种统一管理多个资源的概念。以集合为单位可进行各种操作，也可实现类似集合的集合这样的操作。
- 资源（Resource）：文件或集合称为资源。
- 属性（Property）：定义资源的属性。定义以“名称 = 值”的格式执行。
- 锁（Lock）：把文件设置成无法编辑状态。多人同时编辑时，可防止在同一时间进行内容写入。

###### WebDAV 新增的方法

- PROPFIND：获取属性
- PROPPATCH：修改属性
- MKCOL：创建集合
- CPOY：复制资源及属性
- MOVE：移动资源
- LOCK：资源加锁
- UNLOCK：资源解锁

###### WebDAV 拓展的状态码

- 102 Processing：可正常处理请求，但目前是处理中状态
- 207 Muti-Status：存在多种状态
- 422 Unprocessible Entity：格式正确，内容有误
- 423 Locked：资源已被加锁
- 424 Failed Dependency：处理与某请求关联的请求失败，因此维持依赖关系
- 507 Insufficient Storage：保存空间不足

### 构建 Web 内容的技术

##### HTML

###### 超文本标记语言 HTML 

HTML（HyperText Markup Language，超文本标记语言）是一种标记语言。标记语言通过标签控制构建 Web 页面

###### 层叠样式表 CSS

CSS（Cascading Style Sheets，层叠样式表）可以指定如何展现 HTML 内的各种元素。

##### 动态 HTML

动态 HTML（Dynamic HTML）值使用客户端脚本语言将静态的 HTML 内容变成动态的技术的总称。

###### 客户端脚本语言 JavaScript 

动态 HTML 调用客户端脚本语言 JavaScript 实现对 HTML 的 Web 页面的动态改造；

###### 文档对象模型 DOM

DOM 将 HTML 内的元素当作对象操作，指定欲发生动态变化的 HTML 元素。

##### Web 应用

###### Web 应用作用于动态内容之上

由程序创建的内容为动态内容；事先准备好的内容称为静态内容。Web 应用作用于动态内容上。

###### 与 Web 服务器及程序协作的 CGI

CGI（Common Gateway Interface，通用网关接口）是 Web 服务器在接收到客户端发送过来的请求后转发给程序的一组机制。（CGI 程序一般用 Perl、PHP、Ruby 和 C 等编程语言编写而成）

###### 因 JAVA 而普及的 Servlet

Servlet 是一种能在服务器创建动态内容的程序，是用 JAVA 语言实现的一个接口。

> Servlet 常驻内存，CGI 程序则需要不断启动。

##### 数据发布的格式及语言

###### 可拓展标记语言

XML（eXtensible Markup Language，可拓展标记语言）是一种可按应用目标进行拓展的通用标记语言。

> HTML 更适合显示 Web 页面，XML 更适合数据交换。

###### 发布更新信息的 RSS/Atom

RSS（建议信息聚合，也叫聚合内容）和 Atom 都是发布新闻或博客日志等更新信息文档的格式的总称。

###### JavaScript 衍生的轻量级易用 JSON

JSON（JavaScript Object Notation）是一种以 JavaScript（ECMAScript）的对象表示法为基础的轻量级数据标记语言。JSON 字符串形式可以被 JavaScript 轻易读入，能处理 false / null / true / 对象 / 数组 / 数字 / 字符串这七类数据。

### Web 的攻击技术

##### 针对 Web 的攻击技术

###### HTTP 不具备必要的安全功能

HTTP 是一个纯粹的通信协议，无法应对针对 Web 的攻击。开发者需要自行设计并开发认证及会话管理来满足 Web 应用的安全，这样也可能会有安全漏洞。

###### 在客户端即可篡改请求

浏览器接收到的 HTTP 请求的全部内容都可以在客户端自由更变、篡改。若 Web 应用有漏洞，服务器的信息将被窃取，权限被夺取。

##### 针对 Web 应用的攻击模式

- 以服务器为目标的主动攻击：直接访问 Web 应用，传入攻击代码。
- 以服务器为目标的被动攻击：不直接对 Web 应用访问，而利用圈套策略执行攻击代码。

##### 因输出值转义不完全引发的安全漏洞

- 跨站脚本攻击：通过存在安全漏洞的 Web 网站用户的浏览器内运行 HTML 标签或 JavaScript 进行攻击。
- SQL 注入攻击：针对 Web 应用使用的数据库，通过运行非法的 SQL 产生攻击。
- OS 命令注入攻击：通过 Web 应用，执行非法的操作系统命令达到攻击的目的。
- HTTP 首部注入攻击：攻击者通过在相应首部字段内插入换行，添加任意相应首部或主体的攻击。
- 邮件首部注入攻击：攻击者通过向邮件首部 To 或 Subject 内任意添加非法内容发起的攻击。
- 目录遍历攻击：对本无意公开的文件目录，通过非法截断其目录路径后达成访问目的。
- 远程文件包含漏洞：利用外部服务器的 URL 充当以来文件，让脚本读取后，运行任意脚本的一种攻击。

##### 因设置和设计上的缺陷引发的安全漏洞

- 强制浏览：从安置在 Web 服务器的公开目录下的文件中，浏览那些原本非自愿公开的文件。
- 不正确的错误消息处理：Web 应用的错误消息内包含对攻击者有用的信息。
- 开放重定向：对指定的任意的 URL 作重定向跳转值特定的 Web 网站。

##### 因会话管理疏忽引发的安全漏洞

- 会话挟持：攻击者窃取用户的会话 ID，并非法使用次会话 ID 伪装成用户达到攻击目的。
- 会话固定攻击：强制用户使用攻击者指定的会话 ID
- 跨站点请求伪造：攻击者通过设置好的陷阱强制对已完成认证的用户进行某些状态更新。

##### 其他安全漏洞

- 密码破解：算出密码，突破认证。
- 点击挟持：利用透明的按钮或连接做成陷阱，覆盖在 Web 页面上，诱使用户访问特定内容。
- DoS 攻击：让运行中的服务呈停止状态。（过量请求或安全漏洞使服务器过载）
- 后门程序：开发设置的隐藏入口，可不按正常步骤使用受限功能。

