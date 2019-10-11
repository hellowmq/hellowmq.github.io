---
title: git 笔记
date: 2019-08-19 20:49:00
tags: git
---
 


### git 使用规范

1. ***请务必在提交信息中提供有价值的内容***

git commit 的提交信息应当传达代码修改的目的。一方面应当传达修改的模块和范围，另一方面也可以简要描述编码思路以通过 Code Review。

```git
git commit -m "[ADD/EDIT/DELETE/REFACTOR/FIX] 2019-10-11 14:40:48 Add kotlin support to this project. / Refactor a algorithm. "

```

2. 尽可能使用英文来进行你的每一次提交

尽管个人的英文水平不同，但是有一点要注意的是，Github 是一个全球的社区，每个人的代码都有机会被不同语言的使用者看见，做好 in8n 是程序员的本分工作。


3. 对于需要修复 bug 的情况，应当把相应的 bugId 进行传递

这将会便于项目对于 bug 的跟踪。特别地一个 bug 被重新打开时，也许就是对指定 bugId 下代码进行重构的时候了。












### 急救措施，

之前使用 Gerrit 时出现过代码被 Abandoned 之后导致代码无法提交到 Gerrit 服务器的情况。

自救方案：

1. **（非常重要）使用 git stash ，将当前所有代码保存到暂存区。**

2. 确认被 Abandoned 的 Commit 的时间和 commit Id;

3. Checkout 到某一次 commit （在 Abandoned 之前）;

4. git fetch 拉取最新的代码，并且解决 Conflict;

5. git commit -m "solve Abandoned problem" && git push  提交并推至 Gerrit 