---
title: js 重定向问题
date: 2019-10-18 13:42:56
tags: JavaScript
---

## 重定向问题 

处理 TWebCollectDetailsAvtivity 跳转 www.shejiben.com 时，会出现重定向的干扰，这里分析一下这个问题。


### HTTP 重定向

> 场景：直接在移动 webView 中访问 www.shejiben.com

> 结果：服务器返回 302 状态码，页面定向到 Location 指定链接

Http 返回的情况

```
HTTP/1.1 302 Found
Server: openresty/1.13.6.2
Date: Fri, 18 Oct 2019 03:33:01 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Powered-By: PHP/7.1.7
Location: https://m.shejiben.com/?channel=to8to123&appversion=7.12.0&systemversion=28&appid=15&version=2.5&appostype=1&appversioncode=17120&cityName=%E6%B7%B1%E5%9C%B3&first_id=97822deafdae9f38fdd5ed2ab0e135b8&isnew=0&cityid=1130&imei=866370030115364&t8t_device_id=866370030115364&pro_sourceid=104&pro_s_sourceid=101&apkPackageName=com.to8to.housekeeper&deviceModel=BND-AL10-BND-AL10&cityId=1130
Cache-Control: no-cache

0

```





### JavaScript 重定向

### window.location.href = ;

通过直接改变页面当中 window.location.href 实现跳转

> 场景通过土巴兔 APP 打开 链接 www.shejiben.com，自动重定向至 m.shejiben.com

```
HTTP/1.1 200 OK
Server: openresty/1.13.6.2
Date: Fri, 18 Oct 2019 03:33:08 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
X-Powered-By: PHP/7.1.7
Set-Cookie: to8to_auth=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_la=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_nick=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_uid=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_ind=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_styleid=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_referer=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_username=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_tbdl_login=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_to8to_tbdl_login=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=shejiben.com
Set-Cookie: to8to_app_source=1; expires=Fri, 18-Oct-2019 04:03:08 GMT; Max-Age=1800; path=/; domain=shejiben.com
Set-Cookie: to8to_appversion=7.12.0; expires=Sat, 19-Oct-2019 03:33:08 GMT; Max-Age=86400; path=/; domain=shejiben.com
Set-Cookie: to8to_appostype=1; expires=Sat, 19-Oct-2019 03:33:08 GMT; Max-Age=86400; path=/; domain=shejiben.com
Cache-Control: no-cache,must-revalidate
Pragma: no-cache
Expires: 0
Content-Length: 485

<script type="text/javascript">
    window.location.href='https://m.shejiben.com/?app_source=1&time=1571369588&channel=to8to123&appversion=7.12.0&systemversion=28&appid=15&version=2.5&appostype=1&appversioncode=17120&cityName=%E6%B7%B1%E5%9C%B3&first_id=97822deafdae9f38fdd5ed2ab0e135b8&isnew=0&cityid=1130&imei=866370030115364&t8t_device_id=866370030115364&pro_sourceid=104&pro_s_sourceid=101&apkPackageName=com.to8to.housekeeper&deviceModel=BND-AL10-BND-AL10&cityId=1130';
</script>

```


### window.location.replace = ;

> 使用 window.location.href 是常见的跳转逻辑的实现；这种方式的问题在于，当前页面作为一个中间页面被存在了浏览记录中。由此会导致自动执行 window.location.href 的页面又会重新跳转至目标页面。

