---
title: MATLAB 函数（一）
date: 2018-03-15 4:24:16
tags: MATLAB
---

### **概述**    
> 过了很久才更一次的 MATLAB 笔记。

这次主要讲讲 MATALB 中的函数的基础部分。函数就是有封装的特定功能的代码实现，说白了就是一段可以实现自定义功能的代码。使用函数的好处在于简化了代码同时增加了代码的可读性。

<!--more-->
### **编写 MATLAB 函数**
#### 方法一：使用 MATLAB 的自动生成
点击工具栏标签 new 下拉菜单中的 function 按钮，系统自动创建一个未命名的函数 Untitled ，
进入编辑状态，格式如下：
```matlab
function [ output_args ] = Untitled( input_args )
%UNTITLED 此处显示有关此函数的摘要
%   此处显示详细说明

end
```
这里逐项来解释以上内容：
- function 是 MATLAB 中的一个关键字（保留字，只允许作为语法结构使用），可以用于定义函数。
- [ output_args ] 输出参数列表
- = 赋值符号
- Untitle 函数名，可以自定义只要与文件名字相同（检索的时候只根据文件名检索） 
- ( input_args ) 输入参数列表
- 第二行的 % 及之后的内容 函数的摘要（可以被 lookfor 命令检索的内容）
- 之后的% 及之后的内容 函数的帮助文档（可以简单介绍一下变量的含义，方便修改）
- 接着就是函数的主体 
- end 宣告函数已经写完
#### 方法二：依照函数语法编写 m 文件
依照 MATLAB 给出的标准函数格式，你也可以直接使用 edit 命令编写一个新的 m 文件，依照语法编写后，MATLAB 会自动保存为相应的函数文件。
当你熟悉了 MATLAB 语法后，即可使用方法二定义自己需要的函数，在此之前，建议先使用方法一快速创建 MATLAB 函数。
#### 自定义 MATLAB 函数
既然已经各个组分的含义，不妨自己来修改它。
1. 尝试将函数名改为 my_fun（一般取一些有意义且不要重名的函数名）。
2. 输出参数设为 y (只有一个变量时可不加中括号)
3. 输入参数设为 x
4. 函数内容写上： y = x * x;
5. Ctrl + S 保存文件名为 my_fun.m
```matlab
function [ y ] = my_fun(x)
%UNTITLED 此处显示有关此函数的摘要 
%   此处显示详细说明 
y = x * x;
end
```
恭喜你，第一个能够计算平方的 MATLAB 函数大功告成。
### **调用 MATLAB 函数**
在命令行或者脚本文件（同一个文件夹）中使用 my_fun(x) 可以调用该函数。
```matlab
>> y1 = my_fun(3)
y1 =
     9
>> x2 = 4;
>> y2 = my_fun(x2)
y2 =
    16
```
那么问题来了：函数可不可以调用另一个函数呢？可以！
新建另一个 MATLAB 函数，保存到同一个文件夹，像命令行使用即可。
```matlab
function [ y ] = my_fun_2(x)
%UNTITLED 此处显示有关此函数的摘要 
%   y = x*(x+1)
y = my_fun(x) + x;
end
```
 *大胆的想法*
>函数可不可以调用他自己呢？
>可以的！在函数主体中调用自身就可以了。为了不至于发生死循环（无穷无尽的调用下去），可以通过限制调用的次数并逐次返回函数结果。这种方法叫做递归，斐波那契数列就可以用这种方法解决。
### **更多需求**
#### 需求一：更多输出参数
```matlab
% 将多个输出参数在括号中用中逗号隔开即可
% 这时中括号不可省略
function [y1,y2] = my_mutiply(x1)
y1 = x * x;
y2 = x * x * x;
end
```
#### 需求二：更多输入参数
```matlab
% 将多个输入参数在括号中用逗号隔开即可
function y = my_add(x1,x2,x3)
y = x1 + x2 + x3;
end
```
#### 需求三：不需要输入参数
```matlab
% 这时加不加小括号都可以
% function y = my_rand_100()
% function y = my_rand_100
function y = my_rand_100
% 产生一个 1-100 的随机整数
y = randperm(100,1);
end
```
#### 需求四：不需要输出
```matlab
% function 后直接加函数名字即可
function my_print(x1,x2)
y2 = x1 + x2;
disp(y2);
end
```
#### 需求五：不想写 end
```matlab
function my_say_hello
disp('hello');
```
#### 需求六：交互方式使用函数
```matlab
function a = my_square
    a = input('enter your number');
    a = a^2;
end
```
#### 需求七：输入参数是矩阵
```matlab
% MATLAB 才不会管你输入的是什么
% 传递的变量都可以在函数里操作
function average = my_average(x)
average = sum(x)/length(x);
end
```
### **设计 MATLAB 函数**
我们该如何从头开始设计一个 MATLAB 函数？以计算存款的利息为例：
有复利计算公式如下
> 利息=本金*(1+利率)^存期-本金 
#### 思路
先确定需要的函数成分：输入参数、输出参数和中间变量
1. 输入参数：三个
   1. 本金（present_value）
   2. 计息期数（number_of_periods）
   3. 利率（interest_rate）
2. 输出参数：利息（interest）
3. 中间变量：终值（future_value）
4. 函数名：interest_calculator
#### 编写
```matlab
function interest = interest_calculator(present_value,number_of_periods,interest_rate)
% interest calculator with present_value, number_of_periods and interest_rate
% 原理：利息=本金*(1+利率)^计息期数-本金
future_value = present_value * (1 + interest_rate)^number_of_periods;
interest = future_value - present_value;
end
```
#### 调试
~~这样一来函数就完成了。~~

想得美，每段代码都应该经过重复重复再重复的调试。在脚本文件中键入以下内容并运行：

```matlab
my_present_value = 10000;
my_number_of_periods = 2;
my_interest_rate = 0.02;
my_interest = interest_calculator(my_present_value,my_number_of_periods,my_interest_rate)
```

输出结果为

```matlab
my_interest =
   404
```

（多次）确认没有问题后就可以宣告结束了。

### 小结
MATLAB 函数部分的内容确实比较多，以我拙劣的水平只能多花些时间挑出来，尽可能无误地、简明地写完。