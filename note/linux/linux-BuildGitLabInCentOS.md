---
title: 基于 CentOS 7 搭建 GitLab 
date: 2020-04-26 23:59:28
tags: Git
---

### 搭建 GitLab 服务

通常来讲，商用项目都需要公司内网搭建 GitLab 来提供代码管理服务。本片记录在云服务器上搭建GitLab 服务的流程以及遇到的一些坑。

> 操作本篇内容，需要一定的 Linux 基础和 CentOS 7 系统。

<!--分割线-->

<!--more-->

### GitLab 运行环境

#### 更新软件包

```shell script
yum update -y
```

#### sshd

1. 安装
```shell script
yum install -y curl policycoreutils-python openssh-server
```

2. 启用
```shell script
systemctl enable sshd
```

3. 启动
```shell script
systemctl start sshd
```

#### 配置防火墙 

1. 增加配置项 hexo 

在 `/etc/sysctl.conf` 文件中末尾添加一行：
```shell script
net.ipv4.ip_forward = 1
``` 

2. 启动防火墙
```shell script
systemctl enable firewalld
systemctl start firewalld
```

3. 增加 HTTP 方案 

```shell script
firewall-cmd --permanent --add-service=http
```

4. 重启防火墙
````shell script
systemctl reload firewalld
````

### 安装 GitLab 

1. 使用清华镜像源

出于网络环境，考虑使用清华的镜像源，在 `/etc/yum.repos.d` 创建 gitlab-ce.repo 文件并保存。

```
[gitlab-ce]
name=Gitlab CE Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
gpgcheck=0
enabled=1
```

更新 yum 缓存，更新缓存文件。

```shell script
yum makecache
```

2. 安装 GitLab

```shell script
yum install -y gitlab-ce
```

3. 初始化 GitLab

```shell script
sudo gitlab-ctl reconfigure
```

> 达到这一步，基本的 GitLab 服务就可用了。

### 配置 GitLab 域名

编辑 `/etc/gitlab/gitlab.rb` 文件，增加以下域名解析配置。

```yaml
external_url "http://gitlab.example.com"
```

增加后，运行以下命令生效配置。

```shell script
sudo gitlab-ctl reconfigure
```


### 配置 GitLab 邮箱 SMTP 协议

```yaml
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.server"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "smtp user"
gitlab_rails['smtp_password'] = "smtp password"
gitlab_rails['smtp_domain'] = "example.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_openssl_verify_mode'] = 'peer'

# If your SMTP server does not like the default 'From: gitlab@localhost' you
# can change the 'From' with this setting.
gitlab_rails['gitlab_email_from'] = 'gitlab@example.com'
gitlab_rails['gitlab_email_reply_to'] = 'noreply@example.com'
```


### 相关链接

[http://s0docs0gitlab0com.icopy.site/omnibus/settings/configuration.html](http://s0docs0gitlab0com.icopy.site/omnibus/settings/configuration.html)



