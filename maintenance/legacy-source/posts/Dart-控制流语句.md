---
layout: drafts
title: Dart-语句
date: 2019-06-20 14:23:00
tags: Dart
---

## Dart 控制流语句

对于 Dart 而言，其代码执行的流总是从上而下逐条语句依次进行。但是可以使用一些控制流语句来实现控制 Dart 代码的执行流。

有以下一些语句会直接影响 Dart 代码的执行流：

- if-else 分支
- for 循环
- while 循环
- break & continue
- switch 分支
- try-catch 语句
- return 语句
- assert 语句

<!--more-->

### if else

if else 是最基本的分支语句。

if 语句通过布尔表达式来控制子句的执行与否，可选的 else 语句作为另一选项而存在。

```
if(x > 0) print(x); else print(-x);
if(x > 0){
	print(x);
}else{
	print(-x);
}
```
分支语句的判断是基于布尔表达式的值作为判断基准的，因此传入的表达式的类型推断为非 bool 类型时，会导致编译器的警告；若传入的表达式的类型不确定，也会导致运行时错误。

### for loop

经典 for 循环的写法如下：

```
// for(初始化; 检测; 更新索引) 循环体
for(int index= 0;index < M;index++){
	;
}
```

对于实现了 Iterable 接口的类，还可以使用 for-in 语句对其进行遍历访问。

```dart
for(v in [1,2,3,4]) pritn(v);
```

警惕闭包行为对于 Dart 的异常之处。

### while & do-while loop

while 循环基于一个循环条件，如果循环条件检测为真则执行循环体。

do-while 是 while 循环的变体，区别在于 do-while 总是先进入循环体一次再进行循环条件检测。

```dart
while (!isDone()) {
  doSomething();
}
do {
  printLine();
} while (!atEndOfPage());
```

###break & continue

相信学过 C/C++ 的应该对于 break & continue ，这两个关键字是用来控制半结构化控制流。

break： 跳出迭代过程。
contine：直接进入下一次迭代。

```dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

### switch 

switch 语句支持根据同一类型的整型，字符串编译时常量判断的分支。严格来讲，所有 switch 语句都可以使用 if-else 语句来代替，但是使用 switch 语句能将基础的分支结构变得清晰可见。

每一个 case 子句都伴随一个编译时常量作为分支条件，并且以 break 语句结束；

```dart
var index = 2;
switch (index) {
    case 0:
        print(0);
        break;
    case 1:
        print('hello');
        break;
    case 2:
    case 3:
        print('two or three');
        break;
    default:
        print('Default');
}
```



### try-catch

try-catch 语句的作用是捕获异常，在可能引发异常的情况下，应当使用 try-catch 来控制代码的执行流。
try 语句后伴随可能抛出异常的语句；
throw 可以显示的抛出一个对象；
on T catch 可以捕获一个 T 类型的对象；
finally 中的语句无论异常情况如何总是执行；
rethrow 支持将异常重新抛出；

```dart
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


### return 

return 语句将函数运行结果交付给函数的调用者，当开发者不显示指定返回值时，默认返回 null；特别的，try-catch 语句中，return 会交付到 finally 子句。

### assert

assert 语句是一种调试断言的手段。在生产环境下不会运行。
assert(value) 接受一个布尔型的参数，一旦参数为 false 则语句会立即抛出 AssertionError 异常。

这一类语句的使用是为了让开发者可以让一些事件符合预期，如以下的代码是 Text 类的构造函数原型。assert 语句能够显示地避免一些异常情况而不增大运行时的时间和空间开销。

```dart
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
