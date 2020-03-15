mvvm in android



ViewModel

```java
MutableLiveData<T> 定义一个可以被监听的对象。T 是监听的类型参数
通常创建一个普通的 getter 和一个条件性的 setter（通常伴随网络请求）

Activity 使用 ViewModel 的成员的 getter 为其设置 Observer;
Observer 提供的 onChange() 方法会在 setter 执行完后进行，yin；


```















