---
title: git 笔记
date: 2019-08-19 20:49:00
tags: git
---
 
### 使用 Git 的坑与自救

之前使用 Gerrit 时出现过代码被 Abandoned 之后导致代码无法提交到 Gerrit 服务器的情况。

自救方案：

1. **（非常重要）使用 git stash ，将当前所有代码保存到暂存区。**

2. 确认被 Abandoned 的 Commit 的时间和 commit Id;

3. Checkout 到某一次 commit （在 Abandoned 之前）;

4. git fetch 拉取最新的代码，并且解决 Conflict;

5. git commit -m "solve Abandoned problem" && git push  提交并推至 Gerrit 



