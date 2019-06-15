---
layout: drafts
title: Dart-语句
date: 2019-06-16 05:48:34
tags: Dart
---

Dart 语句

### block

block 是使用花括号包含的一组语句，对于一个 block 语句块，block 中的声明只存在其作用域。

### if else

if else 是最基本的分支语句，

```
if(x > 0) print(x); else print(-x);
if(x > 0){
	print(x);
}else{
	print(-x);
}
```
分支语句的判断是基于布尔表达式的值作为判断基准的，因此传入的表达式的类型推断为非 bool 类型时，会导致编译器的警告；若传入的表达式的类型不确定，也会导致运行时错误。

### loop



#### for & for in

经典 for 循环的写法如下：

```
// for(初始化; 检测; 更新索引) 循环体
for(int index= 0;index < M;index++){
	;
}
```

对于实现了 Iterable 接口的类型，还可以使用 for-in 语句对其进行遍历访问。

for(v in [1,2,3,4]) pritn(v);


#### while & do-while

while 循环基于一个循环条件，如果循环条件检测为真则执行循环体。

do-while 是 while 循环的变体，区别在于 do-while 总是先进入循环体一次再进行循环条件检测。



### try-catch 

try-catch 语句的作用是捕获异常。
try 语句后伴随可能抛出异常的语句；
throw 可以显示的抛出一个对象；
on T catch 可以捕获一个 T 类型的对象；
finally 中的语句无论异常情况如何总是执行；
rethrow 支持将异常重新抛出；

```
void main() {
//  int x = -1;
  int x;
  try {
    if (x >= 0) {
      print('x >= 0');
    } else {
      throw 'negative x = $x';
    }
  } on String catch (e) {
    print(e.toString());
  } catch (o) {
    print('Unknown Type Exception :$o');
  } finally{
    print('Always execute');
  }
}

```


###  switch 

switch 语句支持根据同一类型的编译时常量判断的分支，严格来讲，所有 switch 语句都可以使用 if-else 语句来代替。


### return 

return 语句将函数运行结果交付给函数的调用者，当开发者不显示指定返回值时，默认返回 null；特别的，try-catch 语句中，return 会交付到 finally 子句。


### assert

assert 语句是一种调试断言的手段。在生产环境下不会运行。
assert(value) 接受一个布尔型的参数，一旦参数为 false 则语句会立即抛出 AssertionError 异常。

这一类语句的使用是为了让开发者可以让一些事件符合预期，如以下的代码是 Text 类的构造函数原型。assert 语句能够显示地避免一些异常情况而不增大运行时的时间和空间开销。

```
const Text(
  this.data, {
  Key key,
  this.style,
  this.strutStyle,
  this.textAlign,
  this.textDirection,
  this.locale,
  this.softWrap,
  this.overflow,
  this.textScaleFactor,
  this.maxLines,
  this.semanticsLabel,
}) : assert(
       data != null,
       'A non-null String must be provided to a Text widget.',
     ),
     textSpan = null,
     super(key: key);
```



### yield & yield-each

yield 用于生成器语句中


yield-cach 重写
```
naturalsDownFrom(n) sync* {
	if(n>0){
		yield n;
		yield* naturalsDownFrom(n-1);
	}

}
```


### break & continue

相信学过 C/C++ 的应该对于 break & continue ，这两个关键字是用来控制半结构化控制流。

break： 跳出迭代过程。
contine：直接进入下一次迭代。