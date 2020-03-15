---
title: MATLAB 绘图（二）
date: 2018-04-13 05:00:02
tags: MATLAB
---

### 概述

本次的内容涉及到除了线图以外的绘图，包括离散绘图、极坐标绘图、曲面绘图和统计绘图。

- 离散绘图：茎干图、阶梯图和散点图
- 极坐标绘图：polar前缀
- 曲面绘图：surf 曲面图和 mesh 网格图
- 统计绘图：条形图、统计直方图和饼状图



<!--more-->

### 子窗口

subplot 函数指的是将当前图窗划分为 `m`×`n` 网格，并在编号 `p` 指定的位置创建坐标区。

编号规则为：从第一行自左向右递增。

```matlab
% subplot(m,n,p);
% 将绘图窗口分为 m 行 n 列的矩形区域
% 并在编号第 p 的区域中绘图
figure();
% 2*2 分割的第一块区域也就是左上角
subplot(2,2,1); 
x = linspace(-3.8,3.8);
y_cos = cos(x);
plot(x,y_cos);
title('Subplot 1: Cosine')
% 2*2 分割的第二块区域也就是右上角
subplot(2,2,2);
y_poly = 1 - x.^2./2 + x.^4./24;
plot(x,y_poly,'g');
title('Subplot 2: Polynomial')
% 2*2 分割的第三、四块区域也就是下方
subplot(2,2,[3,4]);
% 也可以写作 subplot(2,1,2); 指的是同一区域。
plot(x,y_cos,'b',x,y_poly,'g');
title('Subplot 3 and 4: Both')
```
![1.png](https://upload-images.jianshu.io/upload_images/8078350-b2e3a5c17fe98d58.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 离散绘图

#### 茎干图（stem）

stem 函数的功能是描述离散数据中的冲激函数，以绘图高度反映一维离散序列中脉冲的强度。

数据值对应每一个脉冲的强度。

```matlab
figure(1)
X = linspace(0,2*pi,50)';
Y = cos(X);
subplot(2,1,1);
stem(X);
subplot(2,1,2);
stem(X,Y); 
```
![2.png](https://upload-images.jianshu.io/upload_images/8078350-3db50d1307370792.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




#### 阶梯图（stairs）

stairs 函数的功能是描述离散数据中的阶跃函数，以绘图高度反映一维阶跃信号中的实时强度。

数据值为每一个时间周期的高度。

```matlab
X = linspace(0,4*pi,40);
Y = sin(X);
figure(1);
subplot(2,1,1);
stairs(Y);
subplot(2,1,2);
stairs(X,Y);% 这种调用方式应当保证 X 有序
```
![3.png](https://upload-images.jianshu.io/upload_images/8078350-44b1b44ad66a1c64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




#### 散点图（scatter）

scatter 函数绘制二维平面上的散点图，也就是不绘制曲线的 plot 函数。

输入参数为散点图的横坐标序列和纵坐标序列。

```matlab 
x = linspace(0,3*pi,200);
y = cos(x) + rand(1,200); 
M_size = linspace(1,100,200);
figure(1);
subplot(2,1,1);
scatter(x,y);
subplot(2,1,2);
scatter(x,y,M_size);
```

![4.png](https://upload-images.jianshu.io/upload_images/8078350-8645080245b3169c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 极坐标绘图

> 我们直到直角坐标和极坐标系都是常用的坐标系，并且两种坐标系之间存在一定的转换关系，但是用 plot 函数绘制转换后的极坐标系图形总是不美观。

~~polar 函数是 MATLAB 中用于绘制极坐标图的函数。~~ 

polar 函数已经被 MATLAB 官方更替，更推荐使用的是新的函数方法：polarplot （新方法在旧版本的 MATLAB 如 2015b 版本仍不可用）。因此如果你在使用旧版本软件，使用 polar 方法；如果你在使用的版本支持 polarplot 函数，那就使用 polarplot 函数。

polarplot 函数就是极坐标系下的 plot 函数。以 polarplot(theta,rho) 形式调用。

```matlab
theta = 0:0.01:2*pi; % 角度
rho = sin(2*theta).*cos(2*theta); % 幅值
figure(1);
polarplot(theta,rho); 
% 此处有版本兼容问题，旧版本无法使用该函数
% 旧版本应当使用 polar(theta,rho);
```
![5.png](https://upload-images.jianshu.io/upload_images/8078350-eb9086dcb346a0fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



同理，也有 polarscatter 函数。

### 曲面绘图

> 曲线上的点是无限的，于是计算机用散点序列代替直线；曲面上由无数曲线构成，自然类比想到使用网格代替平面。

#### surf 函数

surf 函数将创建一个三维曲面图。该函数将矩阵 Z 中的值绘制为由 X 和 Y 定义的 x-y 平面中的网格上方的高度；此外，函数将对三维曲面进行渲染，每个区域的颜色与高度成比例。

```matlab
x0 = 1:0.5:10;
y0 = 1:20;
[X,Y] = meshgrid(x0,y0);
% meshgrid 函数将创建两个由 x0*y0 构成的二维网格矩阵。
% X 表示网格中对应位置的 x0 值
% Y 表示网格中对应位置的 y0 值
% - 可以预见到对于同一个 y0 ，x0 值相同。
Z = sin(X) + cos(Y);
surf(X,Y,Z);
```
![6.png](https://upload-images.jianshu.io/upload_images/8078350-665be90818752b79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




其他 surf 类型曲面图函数

- surfc 函数：在 surf 函数的基础上，在底部绘制等高线图。
- surfl 函数：在 surf 函数的基础上，用光线为三维图渲染。

#### mesh 函数

surf 函数将创建一个三维曲面图。该函数将矩阵 Z 中的值绘制为由 X 和 Y 定义的 x-y 平面中的网格上方的高度；函数仅对于三维网格进行渲染，每个区域的颜色与高度成比例。

```matlab
[X,Y] = meshgrid(-8:.5:8);
R = sqrt(X.^2 + Y.^2) + eps;
Z = sin(R)./R;
figure(1);
mesh(Z);
```
![7.png](https://upload-images.jianshu.io/upload_images/8078350-04ccb7ddf56e5af2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其他 mesh 类型曲面图函数

- meshc函数：在 mesh 函数的基础上，在底部绘制等高线图。
- meshz 函数：在 mesh 函数的基础上，每个网格高度以柱状反映。

### 统计绘图

####  bar 函数

bar 函数顾名思义是绘制条形图的函数。

由于统计图表有着多种形式的表现需求，这里使用子窗口绘图来实现。

```matlab
x = 190:1:200;
y = [75 91 105 123.5 131 150 179 203 226 249 281.5];
z = [2 2 3; 2 5 6; 2 8 9; 2 11 12];
figure(1);
subplot(2,3,1);
bar(y);
subplot(2,3,2);
bar(y,'r')
subplot(2,3,3);
bar(x,y);
subplot(2,3,4);
bar(y,0.4);
subplot(2,3,5);
bar(z);
subplot(2,3,6);
bar(z,'stacked')
```
![8.png](https://upload-images.jianshu.io/upload_images/8078350-e5ae2f4e8eb59f8a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



其他 bar 类型函数：

- bar3 函数：绘制三维条形图
- barh 函数：绘制水平条形图
- bar3h 函数：绘制三维水平条形图

####  histogram 函数

histogram 函数的功能是根据传入的数据绘制统计直方图。

```matlab
x = randn(10000,1);
% 10000 个高斯分布随机数
nbins = 25; 
% 直方图分布区间数量
figure(1);
subplot(2,1,1);
h = histogram(x);
subplot(2,1,2);
h = histogram(x,nbins);
```
![9.png](https://upload-images.jianshu.io/upload_images/8078350-4d96bbabaa0c2ddd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


其他 histogram 函数：

- histogram2 函数：绘制二元统计直方图；
- pareto 函数：绘制帕累托图
- polarhistogram 函数：在极坐标系上绘制根据角度绘制分布图

####  pie 函数

pie 函数的功能是根据传入的比例序列绘制饼状图。

> 特别地：如果 pie(x) 中，
>
> - sum(x) < 1，仅绘制部分饼状图。
> - sum(x) > 1，先做归一化后绘制饼状图。

```matlab
figure(1);
X = [1 3 0.5 2.5 2];
explode = [0 1 0 1 0];
labels = {'A','B','C','D','E'};
subplot(2,2,1);
pie(X);
% 归一化计算比例
subplot(2,2,2);
pie(X,explode);
% explode 选中的块会突出显示
subplot(2,2,3);
pie(X,labels);
% 以标签代替百分数
subplot(2,2,4);
x1 = [0.19 0.22 0.41];
pie(x1);
% 不足 100% 则绘制部分饼状图
```
![10.png](https://upload-images.jianshu.io/upload_images/8078350-9b9861192e89d43d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其他 pie 类型函数：

- pie3 函数：绘制三维饼状图；

#### 其他可视化绘图

> 这部分内容极少使用，不需要在意。

heatmap 函数：根据数据集绘制热图；

wordcloud 函数：使用文本数据创建词云图；

geobubble 函数：以可视方式呈现特定地理位置的数据值

### 小结

本节中提到除了线图以外的另外四种常见绘图：离散绘图、极坐标绘图、曲面绘图和统计绘图。

值得一提的是，对于极坐标绘图的函数方法，官方已经给出更佳的更新，但旧版本中无法应用，这里给出的为新版本的方案。








