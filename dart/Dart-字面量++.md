---
title: Dart-字面量
date: 2019-06-16 05:55:33
tags: Dart
---

Dart 字面量
shi y
Dart 字面量是 Dart 内置的类型，既不能拓展也不可以实现。

### Dart 整数

Dart 整数的类型是 int 类，int 类是 num 类的子类。逻辑上一个整数范围可能是无限的，在 Dart 中，整数的范围受限于 int 类型的长度（64bits）


### Dart 浮点数

Dart 浮点数的类型是 double 类，double 类是 num 类的子类。double 类型指的是依照 IEEE754 实现的 64-bit 浮点数。

> 特别的： -0.0 和 0.0 相等但不相同；NaN（Not a Number）与自身相等但不相同；

### Dart 布尔

bool 变量只有两个值：true 和 false。
与其他语言不同的是，Dart 语言的 bool 变量不能通过其他类型进行转换（如 C++ 中允许非 0 整数值自动转为 true）

### Dart 字符串

Dart 字符串常量通常可以在同一行中使用成对存在的单引号，双引号来包含。对于需要在内部进行换行的字符串既可以使用成对三个单引号或双引号来包含，也可以使用转移富豪 "\n" 来表示换行符。


```dart
'单引号包含的字符串内部可以使用"双引号"，但是使用单引号需要反斜杠转义\''
"双引号包含的字符串内部可以使用'单引号'，但是使用双引号需要反斜杠转义\""
'''1
2
''' // 等价于 '1\n2\n'
"""1
2
""" // 等价于 '1\n2\n'
'1''2''3''4' // 等价于 '1234'
```
Dart 字符串还支持字符串插值，使用美元符号（$）将表明字符串中需要嵌入一个 Dart 表达式，而表达式内容以大括号（{}）包含，最终插值的结果是表达式的运算结果并执行其 toString() 方法。特别的表达式若只有单个标识符，可以省略大括号。


```
'1 + 2 = ${1 + 2}' // 等价于 '1 + 2 = 3'
r'1\n2' // r 前缀表示字符串为 raw String，无需进行转义此时字符串不进行换行。 
```

Symbol

一个 Symbol 对象表示一个操作符或者标识符。

具体表示形式

```dart
'#' (operator | (identifier ('.' identifier)*))
```

一般来说，我们几乎不会用到 Symbol 类型，但是实际上我们在之前曾经见过 Symbol 类型的使用。
在 Function 类的静态方法 Function.apply() 方法中，命名参数的就是以 Symbol
作为键的类型。理论上来说，Symbol 表示的内容可以用 String 类型没有什么不同，这样做会在编译为 JavaScript 或者压缩 Dart 代码时出现问题。

> 关于 Symbol 的详细内容应该查看[官方的日志](https://news.dartlang.org/2013/04/goodbye-invocationmirror-hello.html)


### List 列表

List 就是常见的列表类型，是一种泛型类 List<E> 。
可以使用 new List() 或 new List<E>() 的方式创建 List 对象，也可以用方括号包含逗号分隔的表达式序列。

> 结果而论，两种形式会在类型推断上有一些不同之处。前者可以为 List 对象显式指定接受对象的类型（不指定接受类型时为 dynamic）；而后者会触发 Dart 的类型推断机制，List 接收对象的类型是所有元素的共同的基类。

```dart
class Animal {}

class Cat extends Animal {}

class Dog extends Animal {}

void main() {
  var list1 = new List(); //  List<dynamic>
  list1..add(1)..add(2)..add(3);
  print('"new List()" is ${list1.runtimeType}. It receive dynamic object');
  var list2 = new List<int>(); //  List<int>
  list2..add(1)..add(2)..add(3);
  print('"new List<int>()" is ${list2.runtimeType}. It receive int object');

  var listInt = [1, 2, 3]; //  List<int>
  print(
      '[1, 2, 3] is refered to ${listInt.runtimeType}. It receive int object');

  var listDouble = [1.0, 2.0, 3.0]; //  List<double>
  print(
      '[1.0, 2.0, 3.0] is refered to ${listDouble.runtimeType}. It receive double object');

  var listNum = [1, 2, 3.0]; //  List<num>
//  Due to type inference, the type of value is num (the common base class of int and double);
  print(
      '[1, 2, 3.0] is refered to ${listNum.runtimeType}. It receive num object');

  var listCat = [new Cat(), new Cat(), new Cat()]; //  List<Cat>
  print(
      '[new Cat(), new Cat(), new Cat()] is refered to ${listCat.runtimeType}');

  var listAnimal = [new Cat(), new Cat(), new Dog()]; //  List<Animal>
  print(
      '[new Cat(), new Cat(), new Dog()] is refered to ${listAnimal.runtimeType}');

  var listObject = [new Cat(), new Cat(), new Dog(), 1]; //  List<Object>
//  the common base class of int and Animal is Object;
  print(
      '[new Cat(), new Cat(), new Dog(), 1] is refered to ${listObject.runtimeType}');
}


```

### Map 字典

Map 字典是以键值对的方式存储数据的容器，键和值都可以是任意类型 Map<K,V>。
可以使用 new Map() 或 new Map<K,V>() 的方式创建 List 对象，也可以使用大括号包含逗号分隔的键值对序列，其中每对键值对以冒号表示映射关系。

> 与 List 类似，两种方式会在类型推断上有不同之处。前者可以为 Map 对象显式分别指定键和值的类型（不指定接受类型时为 <dynamic,dynamic>）；而后者会触发 Dart 的类型推断机制，Map 接收对象的类型是所有元素的共同的基类。

```dart
class Animal {}

class Cat extends Animal {}

class Dog extends Animal {}

void main() {
  var map1 = new Map() //<dynamic, dynamic>
    ..['1'] = 'a'
    ..['2'] = 'b'
    ..['3'] = 'c';
  print(
      '"new Map()" is ${map1.runtimeType}. It receive dynamic key and dynamic value.');
  var map2 = new Map<String, dynamic>() //<String, dynamic>
    ..['1'] = 'a'
    ..['2'] = 1
    ..['3'] = true;
  print(
      '"new Map<String,dynamic>()" is ${map2.runtimeType}. It receive String key and dynamic value.');
  var map3 = new Map<dynamic, String>() //<dynamic, String>
    ..[1] = 'a'
    ..[true] = 'b'
    ..['3'] = 'c';
  print(
      '"new Map<dynamic,String>()" is ${map3.runtimeType}. It receive dynamic key and String value.');

  var mapStringInt = {'1': 1, '2': 2, '3': 3};//<String, int>
  print("{'1': 1, '2': 2, '3': 3} is ${mapStringInt.runtimeType}. It receive String key and int value." );
  var mapIntString = {1: '1', 2: '2', 3: '3'};//<int, String>
  print("{1: '1', 2: '2', 3: '3'} is ${mapIntString.runtimeType}. It receive int key and String value." );
  var mapStringNum = {'1': 1, '2': 2, '3': 3.0};//<String, num>
//  Due to type inference, the type of value is num (the common base class of int and double);
  print("{'1': 1, '2': 2, '3': 3.0} is ${mapStringNum.runtimeType}. It receive String key and num value." );

  var mapCat = {1:new Cat(),2:new Cat(),3:new Cat()};//<int, Cat>
  print("{1:new Cat(),2:new Cat(),3:new Cat()} is ${mapCat.runtimeType}. It receive int key and Cat value.");
  var mapAnimal = {1:new Cat(),2:new Cat(),3:new Dog()};//<int, Animal>
  print("{1:new Cat(),2:new Cat(),3:new Cat()} is ${mapAnimal.runtimeType}. It receive int key and Animal value.");
  var mapObject = {1:new Cat(),2:new Cat(),3:new Dog(),4: 4};//<int, Object>
//  the common base class of int and Animal is Object;
  print("{1:new Cat(),2:new Cat(),3:new Cat(),4: 4} is ${mapObject.runtimeType}. It receive int key and Object value.");
}
```

### 标识符和关键字

标识符可以由下划线和大小写字母构成，可以标识一个变量，函数，类型或者库。
关键字是在编译期间做区别对待的词，应当尽可能避免使用关键字作为标识符。 [Dart  关键字](https://dart.dev/guides/language/language-tour#keywords)

> 事实上部分的关键字仅在部分于有含义，用于命名变量和类型时可能不会出错。这种方式本身的可读性很差，对于编码习惯没有太大的好处，甚至会给读者误导。

标识符的本身标识了一个声明，其作用就是定位相应的声明。编译器从当前作用域向外部块不断递归检索，直到栈顶。



### final 与 const

final 变量指的是只能进行初始化而不能进行赋值操作的变量；
const 变量指的必须使用编译时常量进行初始化并且不能进行赋值操作的变量（因此 const 变量总是隐式地具有 final 属性）；

final 变量

在之前的应用中而可以知道，final 变量常见于无需赋值操作的类实例变量。这类变量没有 setter 因此，其初始化要在构造函数启动之前，因此初始化操作可以在构造函数参数或构造函数的初始化列表中。另一方面，由于延迟初始化的行为，初始化又只在第一使用才进行。

const 变量

如果在类的内部使用了常量变量应当在 const 之前加上 static 将其设置为静态常量变量。const 变量总是使用编译时常量进行初始化。


编译时常量

编译时常量的严格划分比较复杂，，包括数字字面量、布尔、null、列表、map 常量、顶层函数、静态方法、常量对象和一些编译时常量地组合。总的来说是只依赖于字面量进行计算可以在编译时完全计算得到。

```dart
const constList_1 = [1]; // const List variable. 
const constList_2 = const [2]; // const List variable. |use const redundantly
var constList_3 = const [3]; // List variable. | but [3] is is contant.
constList_3.add(4); // error
constList_3 = [5]; // no error
```