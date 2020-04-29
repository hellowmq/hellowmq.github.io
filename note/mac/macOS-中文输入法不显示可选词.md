macOS 中文输入法不显示可选词


目前发现的一个偶然出现但是经常会出现的bug。

### 结论

> 这是一个 bug，理论上是软件的 bug，最有效的方法是重新启动该进程。



方法一：
1. 打开活动监视器（Activty Monitor）
2. 终止中文输入法进程

方法二：
1. 直接在 Terminal 使用 pkill 指令关闭指定进程

```
pkill -f SCIM.app 
```
