---
title: MATLAB 函数（二）
date: 2018-03-18 19:59:36
tags: MATLAB
---

### **概述**    
> 尽可能趁有空更一次的 MATLAB 笔记。

这次内容讲讲 MATALB 中的函数的高级部分。

- MATLAB 函数的原理：使用函数的好处在于简化了代码同时增加了代码的可读性。但是在使用函数的时候可能会有一些有偏差的理解，因此需要从机器的尺度上取解释 MATLAB 函数的原理。
- MATLAB 可选参数：同一个可能要求不同的使用方法，如果逐一编写单独的函数实现不仅浪费而且难以使用，因此调用函数的使用要能够自适应不同的输入参数和输出参数。
- MATLAB 函数的其他类型：MATLAB 官方定义 MATLAB 函数有四种其他类型：匿名函数、局部函数、嵌套函数和私有函数。（私以为前两种可能更常用）

<!--more-->

### **MATLAB 函数的原理**
对于某一个 MATLAB 函数而言，它就像一个黑盒子（Black Box），用户只需要知道函数的用途而不必知道函数内部是怎么实现的。在主程序调用函数时，计算机开辟另一块内存空间，进入函数内部，运行函数命令，函数运行结束后，系统自动将这块内存空间回收，除了输出参数以外的所有函数内容都不再存在。

> **请务必记得：在函数内部做的一切不会对外部造成任何影响。**

以下方这个函数为例

```matlab
function add_1(x)
	x = x + 1;
	disp(['In function: x = ' num2str(x)]);
end
```

运行如下命令

```matlab
x = 1;
add_1(x); % 在函数内部，x 的值被修改了
disp(['In main: x = ' num2str(x)]); % 主程序的 x 并没有被修改
```

结果得到

```
In function: x = 2
In main: x = 1
```

这又是什么情况呢？事实上，两个 x 是不同的值（函数并不执行“手递手式”地传递参数，而是将原来的变量拷贝一份放进函数的内存空间中），因此修改了函数内部的 x 后，在函数结束时就被回收，而外部的 x 并没有受到任何影响。

你可以将主程序的 x 替换成 a ，并在函数内部的“x = x + 1;”添加断点（只需单击每一行最左侧行号后的区域，即显示一个红色的断点；再次单击可以取消断点）。运行时，会在函数内部暂停，观察 Workspace 可以发现函数内部的 x = 1。点击工具栏中的 Continue 则可以继续运行看到主程序仍然是 a = 1。

```matlab
a = 1;
add_1(a); % 在函数内部，x 的值被修改了
disp(['In main: a = ' num2str(a)]); % 主程序的 a 并没有被修改
```

由此可见，函数内部的变量在主程序中是“看不见”，函数内部无法使用主程序中的变量，同样地，主程序也无法使用函数内部的变量。因此，函数与主程序的“交流”就依赖于输入参数和输出参数。

> 将函数需要使用的变量传入，将函数计算所得结果传出。

### **MATLAB 可选参数**

MATLAB 中的许多函数都有着各种灵活的输入方式，可以支持不同数量的输入参数和输出参数，比如常用的 zeros 函数就可以根据不同数量的输入参数创建不同维度的零矩阵。这种灵活性就基于 MATLAB 函数中的可选参数。

MATLAB 提供的可选参数有如下：

- nargin	函数输入参数数目
	 nargout	函数输出参数数目
	  varargin	可变长度输入参数列表
	  varargout	可变长度的输出参数列表
	  narginchk	验证输入参数数目
	  nargoutchk	验证输出参数数目
	  validateattributes	检查数组的有效性
	  validatestring	检查文本的有效性
	  inputParser	函数的输入解析器
	  inputname	函数输入的变量名称
	  mfilename	当前正在运行的代码的文件名

#### 样例一：对于不同输入参数执行不同操作

有时候对于一个函数希望有多种的调用方式时，使用可选参数 nargin。同理对于不同的输出参数采用不同的调用方式时，使用可选参数 nargout。

```matlab
function report_name_id(name,id)
    switch nargin % 在函数中 nargin 就是调用函数时输入参数的数量
        case 2
            disp(['name: ' name ' id:' num2str(id)]); 
            % 两个输入参数时输出名字和 id
        case 1
            disp(['name: ' name ' without id information.']);
            % 仅输入一个参数名字（就是第一个参数）时输出名字和 无 id 信息
        otherwise
            disp('null');
            % 不给输入参数时，输出 null。
    end
end
```

执行以下命令

```
report_name_id('Tom',153412); % 两个输入参数时输出名字和 id
report_name_id('Tom'); % 输出名字和 无 id 信息
report_name_id(); % 输出 null
```



#### 样例二：对于未知数量参数执行不同操作

有时候调用函数甚至不知道有多少个输入参数时，又该如何处置呢？这时就可以使用 varargin 来接收任意个输入参数，通过 varargin{index)}来访问对应的输入参数。

```matlab 
function information_items(name,varargin)
	disp(name);
    for index = 1:nargin-1
    	disp(varargin{index});
    end
end
```

三种调用方式会导致不同的结果，可以看到 varargin 都可以将多余的任意数量个参数都取得，并且可以通过 varargin{index}来访问。（事实上，varargin 是一个 cell 型变量）

```matlab
information_items('Tom','height:180','weight:72kg','age:17');
information_items('Jack','height:169','weight:74kg');
information_items('Bill','height:171','weight:88kg','age:23','shcool:Stanford');
```

同理，也可以对应地向 varargout{index} 赋值，将任意数量个输出参数传出。

#### 样例三：验证输入参数数目

narginchk 是基于给定的输入参数上下限来验证输入参数是否符合要求的命令。

```matlab
function two_or_three_inputs(varargin)
	narginchk(2,3);
	disp('There are two or three inputs');
end
```

同样使用三种调用方式

```matlab
two_or_three_inputs(1); % 报错 error，输入参数不够
two_or_three_inputs(1,1);
two_or_three_inputs(1,1,1,1); % 报错 error，输入参数过多
```

同理也可以使用 nargoutchk 对输出参数验证，此外，不妨尝试自己使用 error 函数给出合适的调用函数提示信息。

#### 样例四：函数输入的变量名称

你可能会想函数输入的变量名称肯定是已知的，为什么还要特地设计这样一个函数呢？这个函数是有一定作用的。



```matlab
function y = data_to_string(varargin)
	y = [];
	for index = 1:nargin
		y = [y inputname(index) ':' varargin{index} ';'];
	end
end
```

这个函数可以将数据根据对应的变量类型串成一个数据包。

```
name = 'Tom';
age = '18';
height = '180cm';
weight = '70kg';
str = data_to_string(name,age,height,weight);
```

### **MATLAB 函数其他类型**

MATLAB 官方确定的其他类型的函数包括四种：

- 匿名函数
- 局部函数
- 嵌套函数
- 私有函数

#### 匿名函数

匿名函数是仅包含一句 MATLAB 命令的函数。匿名函数的优点在于无需另外创建保存一个 m 文件，甚至可以在脚本文件和命令行中随时定义随时使用。形如下式的命令可以创建一个匿名函数：

```matlab
fun = @(x,y)x.^2+y.^2-2*x*y+4;
```

其中 fun 是函数句柄，@ 运算符则用于创建一个句柄。

#### 局部函数

局部函数也叫做子函数，相当于某个完整函数的附属函数。局部函数编写于某个函数最后一行之后，是该函数的附属函数。这意味着局部函数使用范围有限：仅能被同一个文件中的其他函数调用，对其他函数和命令行不可见。

```matlab
function [avg, med] = mystats(x)
% 主函数 可以被外部检索调用
n = length(x);
avg = mymean(x,n);
med = mymedian(x,n);
end

function a = mymean(v,n)
% 子函数 1 
% 只能被主函数和其他子函数调用
a = sum(v)/n;
end

function m = mymedian(v,n)
% 子函数 2
% 只能被主函数和其他子函数调用
w = sort(v);
if rem(n,2) == 1
    m = w((n + 1)/2);
else
    m = (w(n/2) + w(n/2 + 1))/2;
end
end
```

> 特别地，如果你习惯省略函数体结尾的 end，在同一个文件中应当保证子函数和主函数使用同一种格式。

#### 嵌套函数

嵌套函数是定义在函数中的函数，外层函数可以调用内层函数并且如果内层函数变量在外层函数中有定义，那么嵌套函数可以访问和修改在其父函数中定义的变量。

```matlab
function main1
x = 5;
nestfun1

   function nestfun1 
     x = x + 1;
   end 

end
```

#### 私有函数

假设当前工作路径为 “/xxx”，在文件夹 xxx 创建一个名为“private”子文件夹，可以指定一个函数为私有函数。这样一来，只有文件夹 xxx下的函数可以调用这个私有函数。

### 小结

到此函数的内容也告一段落，本文除了 MATLAB 函数的内容外，还有一个额外的点就是断点调试（快速地中断和保留中断时的变量，能够让你加快调试的步骤）。