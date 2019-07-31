---
title: Dart 函数
date: 2019-05-17 10:06:46
tags: Dart
---

### Dart 函数

一个 dart 函数同通常包括函数声明和函数体。

<!--more-->

函数的声明有函数名称和函数的参数列表，规定了函数本身如何被调用；函数体提供了函数的运算主体。特别地，抽象函数不需要提供函数体。

函数体具通常使用大括号包含若干语句，函数体依照次序执行直到 return 语句或抛出异常。除了构造函数以外，函数结束时仍没有提供返回值时，返回值将是 null。

在 Dart 语法中，存在这样的语法糖：当函数只需要一个表达式时，使用箭头操作符（=>）为函数的返回值指定一个表达式作为返回值。

#### 使用匿名函数和闭包（Closure）

函数在一些情况下可以不提供函数名而提供一种简洁的方式来使用，这就是匿名函数。
一个匿名函数可以是以下的形式。

```dart
// 这种列表的索引方式很常见
void main() {
  var list = ['apples', 'bananas', 'oranges'];
  list.forEach((item) {
    print('${list.indexOf(item)}: $item');
  });
}
```

匿名函数可以帮助开发者更容易地去创建一个无需手动调用的函数；但更重要的作用是用来实现闭包。

没有学过 JavaScript 的开发者可能会对闭包这一概念比较陌生。闭包具有记录其他作用域的对象的作用。可以看以下的例子，我们还可以利用闭包的一些性质做到一些特殊的操作。	

```dart
/// Returns a function that adds prefix to the
/// function's  String object.
Function makePrefix(String prefix) {
  return (String str) => prefix + str;
}

void main() {
//   This statement will create a "pro" prefix for a String
  var prefixPro = makePrefix("pro");
//   This statement will create a "sub" prefix for a String
  var prefixSub = makePrefix("sub");
  String prefixValue = "pre";
//   This statement will create a prefixValue prefix for a String
  var prefixPre = makePrefix(prefixValue);

  prefixValue = "com";

  print(prefixPro("fessional"));
  print(prefixSub("channel"));
  print(prefixPre("sentation"));
  print(
      "The word presentation show that the closure have nothing about date binding. \nThe closure record the input value as static varible when a closure is definded. ");

//   Another example of closure.
  final values = [1, 2, 3, 4, 5];
  print(values);
  printSumValue(List<int> nums) => nums.reduce((a, b) {
        print('a = ' +
            a.toString() +
            '; b  = ' +
            b.toString() +
            '; a + b = ' +
            (a + b).toString() + ';');
        return a + b;
      });
  printProductValue(nums) => nums.fold(1, (a, b) {
        print('a = ' +
            a.toString() +
            '; b  = ' +
            b.toString() +
            '; a * b = ' +
            (a * b).toString() + ';');
        return a * b;
      });

  print("The sum is :" + printSumValue(values).toString());
  print("The product is :" + printProductValue(values).toString());
}

```

[在 DartPad 上运行此代码](https://dartpad.dartlang.org/fcdcb0f4a30518e917d893b913634d47)
以上的例子说明了闭包可以在定义时将其他作用域的变量作为参数捕获，并且不会随着被捕获对象的改变而变化。因此闭包本身不是数据绑定，而是保存了一个变量副本到闭包的私有空间中。

#### 函数的级联语法

Dart 的级联语法是函数式程序设计的产物，能对同一对象进行一系列操作。使用级联语句与点操作符的作用是几乎一致的（.），只是每一个表达式的返回值都是对象本身而不再关注每个表达式的返回值。

```
querySelector('#confirm') // Get an object.
  ..text = 'Confirm' // Use its members.
  ..classes.add('important') // 
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

#### Function 的静态调用

在 Dart 中，所有的变量和方法都属于 Object 的子类，而所有的函数就属于 Functoin 类。Function 类提供了一个静态方法：

```dart
external static apply(Function function, List positionalArguments,
    [Map<Symbol, dynamic> namedArguments]);
```

因此我们可以使用 Function 类的静态方法显式调用函数，在以下的例子中两种调用方式是完全的。

在 Dart 中，只要实现了 call() 方法，就相当于以接口形式实现了 Function 类。

```dart
class WannabeFunction {
  call(String a, String b, String c) => '$a $b $c!';
}

main() {
  var wf = new WannabeFunction();
  var out = wf("Hi","there,","gang");
  print('$out'); 
 var anotherOut = Function.apply(wf, ["Hi","there,","gang"]);
  print('$anotherOut');
}
```

[在 DartPad 上运行此代码](https://dartpad.dartlang.org/27bf2265822a514b5246c400c5a2ac1c)

#### Function 的对象检查
函数的 runtimeType 检查在于入参和返回值的检查，如果两个函数的入参和返回值类型一致，根据 runtimeType 会判别为相同值；而相等操作符(==)总是检查是否为同一对象。

```dart
f(x) {return (x)=>x;}

g(){
  
  h() => 42;
  print("h.runtimeType : ");
  print(h.runtimeType);
  print(h is Function);// true
  print(h.runtimeType == (()=>42).runtimeType);// true
  print(g.runtimeType == h.runtimeType);//false
  print((()=>42).runtimeType == (()=>42).runtimeType); // true
}
void main(){
  print("f.runtimeType : ");
  print(f.runtimeType);
  print("g.runtimeType : ");
  print(g.runtimeType);
  print("f(2).runtimeType");
  print(f(2).runtimeType);
  print(f is Function);//true
  print(f(3) is Function);// true
  print(g is Function);//true
  print(f(2).runtimeType == f.runtimeType);//true or false
  print(f.runtimeType == g.runtimeType);//false
  g();
}
```

由于函数本身类型地特殊性，闭包在使用之时，常常由于其本身类型的模糊性而难以入手。
使用以下这一例子能更好地帮助我们去使用闭包。


```dart
@proxy
class A {
  int number;
  A(this.number);
}

var independentClosure = () {};

void main() {
  Function function1 = () {};
  Function function2 = () {
    print(function1);
  };
  String Function(int, int) function3 = (int a, int b) {
    print("HelloWorld");
    return '';
  };
  Function function4 = () {};
  Function function5 = function1;
  Function function6 = independentClosure;

// The runtimeType of the Function object is differentiated based on input parameters and output parameters.
  print(
      "The runtimeType of the function is differentiated based on input parameters and output parameters.");
  print(independentClosure.runtimeType);
  print(function1.runtimeType);
  print(function2.runtimeType);
  print(function3.runtimeType);
  print(function4.runtimeType);
  print(function5.runtimeType);
  print(function6.runtimeType);

// operator == of Function object depends on whether their addresses are the same
  print(
      "operator == of Object object depends on whether their addresses are the same");
  print(function1 ==
      function4); // function1 and function4 are at different addresses.
  print(
      function1 == function5); // function1 and function5 are at same addresses.
  print(independentClosure ==
      function6); // independentClosure and function5 are still at same addresses even int the different Scope.

// operator == of Object object depends on whether their addresses are the same
  A a1 = new A(1), a2 = a1;
  print(a1 == a2);
  print(a1);
  print(a2);

//
  print(function1.hashCode == function4.hashCode);
  print(function1.toString() == function4.toString());

// String Function(int,int) Limit the input parameters and return type of a closure
  Function.apply(function3, [1, 2]);
  try {
    Function.apply(function3, [1]);
  } catch (e) {
    print(e);
  }
  try {
    int a = Function.apply(function3, [1, 2]);
  } catch (e) {
    print(e);
  }

//  toString() of closure Depends on its Scope and the order of declaration instead of initialzation
  print(independentClosure.toString());
  print(function1.toString());
  print(function2.toString());
  print(function3.toString());
  print(function4.toString());
  print(function5.toString());
  // function5 is not a real object but a pointer or reference which points to function4
  print(function6.toString());
  // function6 is not a real object but a pointer or reference which points to independentClosure

  print(function1.runtimeType == function4.runtimeType);
}
```








