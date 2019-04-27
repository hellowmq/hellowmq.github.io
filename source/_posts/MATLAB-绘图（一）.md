---
title: MATLAB 绘图（一）
date: 2018-04-03 09:07:24
tags: MATLAB
---






### 概述

MATLAB 经常用于科学研究中的科学计算，因此 MATLAB 也支持完善的绘图功能，本次主要介绍 MATLAB 中的曲线图的绘制。尽管 MATLAB 中的绘图可以用鼠标交互式操作在本次内容中也会开始使用一些相应的绘图函数。本章的内容可以用于绘制论文中一些相关的图。

<!--more-->


### plot 函数：线性二维曲线图

plot 函数是我们最常使用的函数之一，可以根据传入的点坐标对应描点连线。

#### 一条简单的曲线

传入两个序列：横坐标序列，纵坐标序列（很自然地，横坐标的总数和纵坐标的总数应该一样，这两个序列理应等长）。函数将打开绘图窗口，依次将对应的点以连续的直线连接。

```matlab
x = -10:0.1:10; 
y = sin(x);
plot(x,y);
```

上述代码将绘制正弦函数的一部分。
![1.png](https://upload-images.jianshu.io/upload_images/8078350-fb436e01fe98365d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 直线还是曲线？

我们有这样一个疑问：刚才不是说依次将对应的点用直线连接吗？为什么刚才出现的不是折线。这个现象的秘密在于散点的密度：只要点的密度足够到，在视觉效果上就能还原连续平滑的曲线效果。

> 线由无限的点组成，计算机处理的点的数量却是有限的，因此 plot 函数做的事是连点成线，只要点足够密集，就可以当作曲线看待，至少绘图效果上没有什么区别。

不妨尝试把点的密度降低，运行以下代码。

```matlab
x = -10:1:10; 
y = sin(x);
plot(x,y);
```

![2.png](https://upload-images.jianshu.io/upload_images/8078350-94cc942c9e5a0c38.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上述代码也绘制正弦函数的一部分，原则上它也是正弦函数（尽管不怎么像）这种现象就是采样点间距过大引起的图形失真。**因此有一点建议：在算力足够的情况下，可以适当提高绘图的精度达到比较好的视觉效果**

#### 用 plot 绘制多条曲线

在已经掌握了使用 MATLAB 绘制一条曲线的方法之后，正准备用于研究函数曲线的伸缩变换，希望有一种方法可以一次性绘制多条曲线。不妨看一下 plot 函数的帮助信息，直接依次传入对应的横纵坐标即可（x1,y1,x2,y2,x3,y3, ...），同时系统还会自动使用不同的颜色绘制不同的曲线。

```matlab
x1 = -10:0.1:10; 
y1 = sin(x1);
x2 = -5:0.05:5;
y2 = sin(2*x2);
x3 = -10:0.1:10;
y3 = 2*sin(x3);
plot(x1,y1,x2,y2,x3,y3);
% plot(x1,y1);plot(x2,y2);plot(x3,y3);
% 你可能会好奇被注释的三条命令能否实现同样的效果
% 答案是做不到，绘图结果永远只有最后一个曲线。
% 你可以使用稍后提到的 hold on 命令来实现。
```
![3.png](https://upload-images.jianshu.io/upload_images/8078350-340dde90305ce8e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
额，看起来这个显示效果有点差。虽说不同曲线的颜色不同，但是即使你能勉强分辨出三条线的轨迹，也看不出哪条曲线对应哪个函数。更重要的是这样：

> 你查看了打印版的绘图结果，不同颜色的曲线经过黑白打印后几乎没有区别。这时，你迫切需要一个额外的区分曲线的方法。

### plot 参数：线型，颜色和标记

为了区分不同的曲线，MATLAB 提供三种参数：为曲线指定不同的线型，颜色和标记。

指定这三种信息的跟随在对应的横坐标和纵坐标之后，以字符串形式传入（也就是使用单引号包含）

```matlab
x1 = -10:0.1:10; 
y1 = sin(x1);
x2 = -5:0.05:5;
y2 = sin(2*x2);
x3 = -10:0.1:10;
y3 = 2*sin(x3);
plot(x1,y1,'r.-',x2,y2,'go',x3,y3,'b*--');
% 函数一：颜色为红色（r），标记为实心圆点（.），线型为实线(-)；
% 函数二：颜色为绿色（g），标记为空心圆点（o），线型为无线
%（尽管默认使用实线，使用标记而不指定线型时为无线）；
% 函数三：颜色为蓝色（b），标记为星号（*），线型为虚线(--)；
```
![4.png](https://upload-images.jianshu.io/upload_images/8078350-45c090319eac946a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 请不要刻意记住以下这几个表格，与其花时间记住，还不如直接使用 help plot 命令查看帮助来得更快。




| 线型   | 说明         |
| ------ | ------------ |
| -      | 实线（默认） |
| --     | 虚线         |
| :      | 点线         |
| -.     | 点划线       |
| (none) | 无曲线       |



| 标记 | 说明   |
| ---- | ------ |
| o    | 圆圈   |
| +    | 加号   |
| *    | 星号   |
| .    | 点     |
| x    | 叉号   |
| s    | 方形   |
| d    | 菱形   |
| ^    | 上三角 |
| v    | 下三角 |
| >    | 右三角 |
| <    | 左三角 |
| p    | 五角形 |
| h    | 六角形 |





| 颜色 | 说明   |
| ---- | ------ |
| y    | 黄色   |
| m    | 品红色 |
| c    | 青蓝色 |
| r    | 红色   |
| g    | 绿色   |
| b    | 蓝色   |
| w    | 白色   |
| k    | 黑色   |



现在的视觉效果挺不错的，但是你仍然会注意到这个图的一个致命缺陷——没有绘图描述。

### 绘图窗口的控制命令



#### 使用 figure 命令

打开新的一个绘图窗口（指示当前时刻应当执行绘制曲线的窗口）。

用法：在 plot 命令之前使用 plot 命令。

```matlab
x1 = -10:0.1:10; 
y1 = sin(x1);
x2 = -5:0.05:5;
y2 = sin(2*x2);
x3 = -10:0.1:10;
y3 = 2*sin(x3);
figure(1); % 指定窗口一用于绘图
plot(x1,y1,'r.-'); 
figure(2); % 指定窗口二用于绘图
plot(x2,y2,'go'); 
figure(); % 指定一个新窗口用于绘图 
figure; % 等同于 figure();
plot(x3,y3,'b*--'); 
figure(1); % 重新指定窗口一用于绘图
plot(x2,y2,'go'); % 曲线一除去，绘制曲线二

```



#### 使用 legend 命令

允许用字符串来对曲线进行注解。

用法：在 plot 命令之后加上 legend 命令。

```matlab
x1 = -10:0.1:10; 
y1 = sin(x1);
x2 = -5:0.05:5;
y2 = sin(2*x2);
x3 = -10:0.1:10;
y3 = 2*sin(x3);
plot(x1,y1,'r.-',x2,y2,'go',x3,y3,'b*--');
legend('函数一','函数二','函数三');
```

![5.png](https://upload-images.jianshu.io/upload_images/8078350-ed31bd5e8a4a587b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

相比之前的绘图结果，legend 命令的作用就是将曲线的注释在绘图窗口标记出来，这回就可以根据注释找到对应的曲线了。

#### 使用 title 命令

嗯，这时正弦函数的变换关系就确定了。为了应用到论文中取，这个图还需要一个标题（title）。在 plot 命令之后加上 title 命令。

```matlab
x1 = -10:0.1:10; 
y1 = sin(x1);
x2 = -5:0.05:5;
y2 = sin(2*x2);
x3 = -10:0.1:10;
y3 = 2*sin(x3);
plot(x1,y1,'r.-',x2,y2,'go',x3,y3,'b*--');
legend('函数一','函数二','函数三');
title('正弦函数伸缩变换关系图');
```
![6.png](https://upload-images.jianshu.io/upload_images/8078350-4b60e808347b8715.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 使用 label 命令

label 命令指的是 xlabel 和 ylabel 两个命令。其作用就是在坐标轴上加上想要的字符串描述。

```matlab
x1 = -10:0.1:10; 
y1 = sin(x1);
x2 = -5:0.05:5;
y2 = sin(2*x2);
x3 = -10:0.1:10;
y3 = 2*sin(x3);
plot(x1,y1,'r.-',x2,y2,'go',x3,y3,'b*--');
legend('函数一','函数二','函数三');
title('正弦函数伸缩变换关系图');
xlabel('自变量');
ylabel('因变量');
```

![7.png](https://upload-images.jianshu.io/upload_images/8078350-dcc9591ccfe219e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

看上去效果不错，这个图已经有了基本的可视化效果。

#### 其他控制命令

为了实现更好的视觉效果，还有一些“无关紧要”的命令可以用来控制绘图窗口。

- grid on 命令可以在图中加上刻度网格。
- grid off 命令可以取消 grid on 命令的效果。 
- hold on 命令可以让绘图窗口中的曲线保留，从而实现一个绘图窗口绘制多个曲线。
- hold off 命令可以取消 hold on 的效果。
- axis([xmin xmax ymin ymax])  用于限制两个坐标轴的范围也就是绘图范围。



#### 拓展绘图控制命令（了解即可）

这一部分只是为了告诉你曲线的线宽，标记的大小，颜色都可以通过特定的命令来控制。使用时在搜索引擎中搜索即可。

```matlab
x = -pi:pi/10:pi;
y = tan(sin(x)) - sin(tan(x));

figure
p = plot(x,y,'--gs',...
    'LineWidth',2,...
    'MarkerSize',10,...
    'MarkerEdgeColor','b',...
    'MarkerFaceColor',[0.5,0.5,0.5]);
p.LineWidth = 5;
p.Marker = '*';
```

![8.png](https://upload-images.jianshu.io/upload_images/8078350-fb3205054f2a2cd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

甚至更完全的控制命令可以使用 set 命令，但这不属于应当熟练掌握的范围，这里就不多赘述。

### 对数（非线性）绘图函数

使用 plot 函数可以将图像画在一个 XY 平面坐标系中，美中不足的是：往往数据点分布的不均匀性并不能让我们如愿地绘制足够连续的图案。（如果仍然使用 plot 函数绘制指数分布型的变量，结果将是绝大部分数据点集中于绘图窗口的一侧）

三种非线性绘图函数：

- semilogx 函数：在 X 轴上使用对数坐标轴绘制曲线；
- semilogy 函数：在 X 轴上使用对数坐标轴绘制曲线；
- loglog 函数：在 X 轴和 Y 轴上使用对数坐标轴绘制曲线；

semilogx 函数

```matlab
x1 = 2.^(0.1:0.2:20); % 自变量呈指数分布
y1 = ones(size(x1));
semilogx(x1,y1,'r.-');
title('x 轴上分布的指数分布型数据变得均匀');
```


![9.png](https://upload-images.jianshu.io/upload_images/8078350-0f2142a37d6853ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

semilogy 函数

```matlab
x2 = 0.1:0.2:20;
y2 = exp(x2);  % 因变量呈指数分布
semilogy(x2,y2,'r.-');
title('y 轴上分布的指数分布数据变得均匀');
```


![10.png](https://upload-images.jianshu.io/upload_images/8078350-f5e9ede0d3c6beb5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

loglog 函数

```matlab
x3 = 2.^(0.1:0.2:20); % 自变量呈指数分布
y3 = 5.^(0.1:0.2:20); % 因变量呈指数分布
loglog(x3,y3,'r.-');
title('xy 两轴上分布的指数分布数据都变得均匀');
```

![11.png](https://upload-images.jianshu.io/upload_images/8078350-3ababe1551402eb6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注：以上三个函数的用法无异于 plot 函数，同样可以使用标记、颜色和线型等特性。

### plot3 函数：三维曲线图

plot3 函数用于绘制三维曲线图，是 plot 函数的变体。

```matlab
% plot3 函数仍然沿用 plot3(x,y,z,...)的调用方式
t = 0:pi/50:10*pi;
st = sin(t);
ct = cos(t);
plot3(st,ct,t);
```

![12.png](https://upload-images.jianshu.io/upload_images/8078350-be2ae5836120a135.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里可以看到一条螺旋上升的曲线，也更加印证了 plot 函数是一个遵循描点连线的函数，即使是 plot3 函数也只是绘制三维曲线图 ，而不是三维曲面图。

> 具体的三维曲面图会在下一节中介绍（曲面图参考实例：在命令行输入 peaks ）。

### 小结

plot 函数是本节内容的核心知识，所有内容都从这里展开，也是使用频率最高的绘图。另一方面，尽管 MATLAB 也支持使用鼠标的交互式绘图，读者可以尝试绘图窗口的各个选项。