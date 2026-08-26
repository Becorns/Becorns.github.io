
# 文件系统

## 文件目录

| 目录    |                      |
| ----- | -------------------- |
| /bin  | 存放系统最基础的命令           |
| /boot | 开机                   |
| /dev  | 设备文件                 |
| /etc  | 系统配置文件               |
| /home | 普通用户目录               |
| /lib  | 库文件                  |
| /mnt  | 临时挂载点                |
| /opt  | 第三方软件安装目录            |
| /srv  | 服务器的数据，http/ftp等     |
| /usr  | 系统软件安装目录             |
| /proc | 内核/进程的信息             |
| /sys  | 系统硬件信息               |
| /run  | 运行时的进程信息(pid，socket) |
| /var  | 经常变化的文件(日志，邮件，临时文件)  |
|       |                      |

## etc

| 路径                  |                |
| --------------------- | -------------- |
| etc/hosts             | 主机和ip的映射 |
| etc/sysconfig/network | 配置主机名     |

## 敏感文件

#### apache

* /apache/apache2/conf/httpd.conf
* /apache/apche/conf/httpd.conf
* /etc/apache/apache.conf
* /etc/apache/httpd.conf
* /etc/apache2/apache.conf
* /etc/apache2/httpd.conf
* /etc/apache2/sites-available/default
* /etc/apache2/vhosts.d/00_default_vhost.conf

#### at

* /etc/at.allow
* /etc/at.deny

#### cron

* /etc/cron.allow
* /etc/cron.deny
* /etc/cront
* /etc/anacrontab

#### php

* /apache/php/php.ini
* /bin/php.ini

#### 系统配置文件

* /etc/host.conf

```

/etc/fstab
/etc/httpd/conf.d/httpd.conf
/etc/httpd/conf.d/php.conf
/etc/httpd/conf/httpd.conf
/etc/httpd/htdocs/index.html
/etc/httpd/htdocs/index.php
/etc/httpd/logs/access.log
/etc/httpd/logs/access_log
/etc/httpd/logs/error.log
/etc/httpd/logs/error_log
/etc/httpd/php.ini
/etc/init.d/httpd
/etc/init.d/mysql
/etc/ld.so.conf
/etc/motd
/etc/my.cnf
/etc/mysql/my.cnf
/etc/mysql/my.cnf
/etc/network/interfaces
/etc/networks
/etc/passwd
/etc/php.ini
/etc/php/apache/php.ini
/etc/php/apache2/php.ini
/etc/php/cgi/php.ini
/etc/php/php.ini
/etc/php/php4/php.ini
/etc/php4.4/fcgi/php.ini
/etc/php4/apache/php.ini
/etc/php4/apache2/php.ini
/etc/php4/cgi/php.ini
/etc/php5/apache/php.ini
/etc/php5/apache2/php.ini
/etc/php5/cgi/php.ini
/etc/phpmyadmin/config.inc.php
/etc/resolv.conf
/etc/shadow
/etc/ssh/sshd_config
/etc/ssh/sshd_config
/etc/ssh/ssh_config
/etc/ssh/ssh_config
/etc/ssh/ssh_host_dsa_key
/etc/ssh/ssh_host_dsa_key
/etc/ssh/ssh_host_dsa_key.pub
/etc/ssh/ssh_host_dsa_key.pub
/etc/ssh/ssh_host_key
/etc/ssh/ssh_host_key
/etc/ssh/ssh_host_key.pub
/etc/ssh/ssh_host_key.pub
/etc/ssh/ssh_host_rsa_key
/etc/ssh/ssh_host_rsa_key
/etc/ssh/ssh_host_rsa_key.pub
/etc/ssh/ssh_host_rsa_key.pub
/etc/sysconfig/network
/etc/sysconfig/network
/home/apache/conf/httpd.conf
/home/apache2/conf/httpd.conf
/home/bin/stable/apache/php.ini
/home2/bin/stable/apache/php.ini
/NetServer/bin/stable/apache/php.ini
/opt/www/conf/httpd.conf
/opt/www/htdocs/index.html
/opt/www/htdocs/index.php
/opt/xampp/etc/php.ini
/PHP/php.ini
/php/php.ini
/php4/php.ini
/php5/php.ini
/root/.atftp_history
/root/.bashrc
/root/.bash_history
/root/.mysql_history
/root/.nano_history
/root/.php_history
/root/.profile
/root/.ssh/authorized_keys
/root/.ssh/identity
/root/.ssh/identity.pub
/root/.ssh/id_dsa
/root/.ssh/id_dsa.pub
/root/.ssh/id_rsa
/root/.ssh/id_rsa.pub
/root/anaconda-ks.cfg
/tmp/apache/htdocs/index.html
/tmp/apache/htdocs/index.php
/usr/lib/php.ini
/usr/lib/php/php.ini
/usr/local/apache/conf/httpd.conf
/usr/local/apache/conf/php.ini
/usr/local/apache/htdocs/index.html
/usr/local/apache/htdocs/index.php
/usr/local/apache/logs/access.log
/usr/local/apache/logs/access_log
/usr/local/apache/logs/access_logaccess_log.old
/usr/local/apache/logs/error.log
/usr/local/apache/logs/error_log
/usr/local/apache/logs/error_logerror_log.old
/usr/local/apache2/conf/httpd.conf
/usr/local/apache2/conf/php.ini
/usr/local/apache2/htdocs/index.html
/usr/local/apache2/htdocs/index.php
/usr/local/cpanel/logs
/usr/local/cpanel/logs/access_log
/usr/local/cpanel/logs/error_log
/usr/local/cpanel/logs/license_log
/usr/local/cpanel/logs/login_log
/usr/local/cpanel/logs/stats_log
/usr/local/cpanel/logs/stats_log
/usr/local/etc/php.ini
/usr/local/httpd/conf/httpd.conf
/usr/local/httpd2.2/htdocs/index.html
/usr/local/httpd2.2/htdocs/index.php
/usr/local/lib/php.ini
/usr/local/mysql/bin/mysql
/usr/local/mysql/my.cnf
/usr/local/php/lib/php.ini
/usr/local/php4/lib/php.ini
/usr/local/php4/lib/php.ini
/usr/local/php4/php.ini
/usr/local/php5/etc/php.ini
/usr/local/php5/lib/php.ini
/usr/local/php5/php5.ini
/usr/local/share/examples/php/php.ini
/usr/local/share/examples/php4/php.ini
/usr/local/tomcat5527/bin/version.sh
/usr/local/Zend/etc/php.ini
/usr/share/tomcat6/bin/startup.sh
/usr/tomcat6/bin/startup.sh
/var/apache2/config.inc
/var/httpd/conf/httpd.conf
/var/httpd/conf/php.ini
/var/httpd/conf/php.ini
/var/httpd/htdocs/index.html
/var/httpd/htdocs/index.php
/var/lib/mysql/my.cnf
/var/lib/mysql/mysql/user.MYD
/var/local/www/conf/httpd.conf
/var/local/www/conf/php.ini
/var/log/access.log
/var/log/access_log
/var/log/apache/access.log
/var/log/apache/access_log
/var/log/apache/error.log
/var/log/apache/error_log
/var/log/apache2/access.log
/var/log/apache2/access_log
/var/log/apache2/error.log
/var/log/apache2/error_log
/var/log/error.log
/var/log/error_log
/var/log/mysql.log
/var/log/mysql/mysql-bin.log
/var/log/mysql/mysql-slow.log
/var/log/mysql/mysql.log
/var/log/mysqlderror.log
/var/mail/root
/var/mysql.log
/var/spool/cron/crontabs/root
/var/spool/mail/root
/var/www/conf/httpd.conf
/var/www/htdocs/index.html
/var/www/htdocs/index.php
/var/www/index.html
/var/www/index.php
/var/www/logs/access.log
/var/www/logs/access_log
/var/www/logs/error.log
/var/www/logs/error_log
/web/conf/php.ini
/www/conf/httpd.conf
/www/htdocs/index.html
/www/htdocs/index.php
/www/php/php.ini
/www/php4/php.ini
/www/php5/php.ini
/xampp/apache/bin/php.ini
/xampp/apache/conf/httpd.conf
root/.ssh/authorized_keys
root/.ssh/identity
root/.ssh/identity.pub
root/.ssh/id_dsa
root/.ssh/id_dsa.pub
root/.ssh/id_rsa
root/.ssh/id_rsa.pub
```

# 磁盘


磁盘不能直接使用，需要：分区，格式化，挂载到文件。
/dev是系统存放各种设备节点的。当插入磁盘，会创建磁盘的节点.
数据存储是分块的(block)，每个块的大小在初始化就决定了，不会再改变的。一个格子只能存放一个文件。比如：每个块4kb，文件9k，占用3个块，显示12k。
启动流程：通电，主板bios自检，找到启动设备，在(磁盘，U盘)上找到bootlader(GRUB)。
	bootloader会寻找 /boot的initramfs.img 以及内核，并加载到内存。形成临时挂载点:Linux Kernel ，initramfs。包含/init,/bin等目录，这就是临时根文件系统。
	然后再initramfs中加载驱动，创建设备节点，挂载系统盘。形成真正的文件系统。
## 分区类型
分区类型用来告诉系统这个分区大概用来做什么，不影响数据存储

## 文件系统类型
分区格式化后的数据组织格式，决定如何被存储，读取，管理。
常见文件系统类型：

| 十六进制代码 | 分区类型（标识）             | 通常对应的文件系统                   |
|--------|----------------------|-----------------------------|
| 83     | Linux 文件系统           | ext2 / ext3 / ext4 / xfs    |
| 8e     | Linux LVM            | 实际文件系统在 LVM 之上，如 ext4, xfs  |
| 82     | Linux swap / Solaris | swap（交换空间，无独立文件系统）          |
| fd     | Linux RAID 自动检测      | 实际文件系统在 RAID 之上，如 ext4, xfs |
| 7      | HPFS/NTFS            | ntfs (Windows)              |
| c      | W95 FAT32 (LBA)      | fat32 (Windows)             |
| ef     | EFI (FAT-12/16/32)   | vfat (EFI 系统分区)             |


## 相关指令
* df 查看磁盘使用情况
```bash
df -Options
-h 单位转换为人能理解的单位
-a 查看所欲文件，包括虚拟文件，/proc等
-i 查看innode 情况
```
* du 查看磁盘空间占用情况
```bash
du -Options <file\direcotry>
-a 显示所有子文件的占用情况
-h 单位转换
-s 统计占用量
```
* 其他
```bash
fsck -y /dev/sdb1  修复磁盘
dump2efs <device>  显示磁盘状态

```
## 分区

> linux设备都被抽象为/dev/下的文件，命名为hd/sd[a-z]。
> 如sda，hdb。sda是完整的一个物理盘，系统盘位于某个分区，sda1，或者sda2等
a，b，c表示不同的物理盘
* 分区
  命名：sda1，sda2，sdb
  分区必须挂载到目录下才能使用。

### fdisk 
管理/查看磁盘分区。只能划分小于2t的磁盘
```bash
fdisk 磁盘  #进入管理页面  
p  显示分区表
t  修改分区类型
n  新建分区
d  删除分区
w  保存修改
q  直接退出
l  列出分区类型查看表
g  抹除所有分区，并新建一个空的GPT分区表
o  抹除所有分区，并创建一个空的mbr分区表
```
p
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260721162237048.png)
### parted 
可以划分大于2t的磁盘
```shell
parted <设备> #进入交互模式
```

| 命令                                     | 说明                |
| -------------------------------------- | ----------------- |
| `check NUMBER`                         | 对指定分区进行简单的文件系统检测。 |
| `cp FROM-DEVICE FROM-NUMBER TO-NUMBER` | 将一个分区复制到另一个分区。    |
| `help [COMMAND]`                       | 显示帮助信息。           |
| `mklabel LABEL-TYPE`                   | 创建新的磁盘分区表。        |
| `mkfs NUMBER FS-TYPE`                  | 在指定分区创建文件系统。      |
| `mkpart PART-TYPE [FS-TYPE] START END` | 创建一个分区。           |
| `move NUMBER START END`                | 移动分区。             |
| `name NUMBER NAME`                     | 给分区命名。            |
| `print`                                | 显示分区信息。           |
| `quit`                                 | 退出。               |
| `rescue START END`                     | 恢复丢失的分区。          |
| `resize NUMBER START END`              | 调整分区大小。           |
| `rm NUMBER`                            | 删除分区。             |
| `select DEVICE`                        | 选择磁盘。             |
| `set NUMBER FLAG STATE`                | 设置分区标志。           |
| `toggle NUMBER FLAG`                   | 切换分区标志。           |
| `unit UNIT`                            | 设置显示单位。           |
| `version`                              | 查看版本。             |

## 格式化
分区之后需要格式化才能挂载使用
mkfs指令
```bash
kmfs -t 分区类型 分区名 # mkfs -t ext4 /deb/sdb2
```

## 挂载
linux的磁盘分区后/dev/[sd/hd]无法直接使用，需要挂载到文件目录
## 配额
quota 用于账户/组 在指定分区的 文件大小，文件数量做限制。
分为软硬两种限制:
* 软限制
在固定的期限内(默认7天)，可以超过这个配额限制
* 硬限制
无法超过限制，硬限制需要大于软限制

条件：
* 内核必须支持配额
- 有quota指令
修改/etc/fstab 配置磁盘配额
* 用户配额
```text
分区        挂载点 文件系统类型 挂载选项
/dev/sdb1  /home  ext4  defaults,usrquota,grpquota  0  0
选项
userquota用户配额
grpquota 组配额
```
配额之后重新挂载
mount -o remount /data

## 卷
分为物理卷和逻辑卷。
物理卷：物理上的硬盘/分区
逻辑卷：逻辑硬盘，硬盘必须格式化才能创建逻辑卷。
卷组： 将多个物理卷合在一起。可以来自任何硬盘的任何分区

| 功能         | 物理卷管理     | 卷组管理      | 逻辑卷管理     |
| ---------- | --------- | --------- | --------- |
| scan 扫描    | pvscan    | vgscan    | lvscan    |
| Create 建立  | pvcreate  | vgcreate  | lvcreate  |
| Display 显示 | pvdisplay | vgdisplay | lvdisplay |
| Remove 删除  | pvremove  | vgremove  | lvremove  |
| Reduce 缩减  |           | vgreduce  | lvreduce  |
| Extend 扩展  |           | vgextend  | lvextend  |
### 物理卷
先使用fdisk/parted 进行分区，分区类型使用LVM的 8e
然后使用pvcreate创建物理卷
```
pvcreate [设备文件名]
```
### 卷组

使用vgcreate指令创建卷组。
```
vgcreate -Options vgName pvName
-s 指定大小
```
* 增加卷组
```
vgextend vgName pvName
```
* 减少卷组
```bash
vgextend vgName pvName
```
### 建立逻辑卷
1. 格式化盘并分区，也可以不分区
2. 将物理盘/物理卷组为卷组
3. 将卷组划分逻辑卷
4. 逻辑卷格式化+挂载

创建逻辑卷
```bash
lvcreate -Options  -n lvName vgName
-L 指定逻辑卷大小
```
格式化
```
mkfs -t ext4 lvname
注意这里的lvname是 /dev/scvg/lvname 
```
挂载
```bash
mount /dev/scvg/lvname /mnt/1
```

调整逻辑卷大小
```
lvresize -L 容量 lvName
```
这里只是修改了逻辑卷的大小，文件1还没有感知到卷变化了。
需要resize2fs来调整(针对ext文件系统)
```
resize2fs [选项] [设备文件名] [调整的大小]
```
# 用户

> 给予三种角色(root，普通，虚拟)，虚拟无法登录，用于系统服务(如http的www)
>
> 用户信息在/etc/passwd

* uid

  每个用户都有唯一uid

| uid     |      |
| ------- | ---- |
| 0       | root |
| 1-200   |      |
| 201-999 |      |
| 1000+   | 普通   |

* 添加用户
```
useradd -Option <username>
```

| Option |                                  |
| ------ | -------------------------------- |
| -M     | 不创建home                          |
| -G     | 指定附属组,多个,分割                      |
| -g     | 主组                               |
| -s     | 指定登录shell，/sbin/nologin不能登录shell |
| -u     | 指定uid                            |
| -d     | 登录的起始目录                          |

* 修改密码
  passwd user

* 修改用户
  usermod

# 用户组

> 创建用户时，会创建一个同名的组
>
> 在/etc/group

* 新建组
  groupadd
* 组管理员
gpasswd -A 用户名 组名

| option |                 |
| ------ | --------------- |
| -g     | 指定gid           |
| -r     | 创建系统组(gid<1000) |

* 删除组
  groupdel
* 增加成员

* 修改
  groupmod

| Option |      |             |
| ------ | ---- | ----------- |
| -n     | 改名   |             |
| -g     | 改gid | -g 新gid  组名 |

  



# shell编程

### 基础

* 构成

> 1.# !/bin/bash

* source和bash

  > bash执行sh，是新开一个bash进程执行
  >
  > source是在当前bash

* 界定

  > ```shell
  > read -p "请输入用户名:" u
  > echo $u
  > stty -echo
  > read -p "请输入密码:" p
  > stty echo
  > echo $u 
  > ```

如果不想要执行信息，就添加&> /dev/null把信息写入不存在的文件

### 变量

#### 用户变量

> 只在当前会话有用
> 没有类型一说，基本都是字符串，特殊情况会是数字

* 定义时直接赋值

  ```shell
  name="hutao"
  ```

* 调用
  使用 $name 或者 \${name}

  ```shell
  echo ${name}
  ```

> \		将功能性字符转义为普通字符
> “ ”		强引用
> ' '		弱引用
> \*		通配符
> ？ 		单字符通配符

位置变量

| 变量   |                       |
| ------ | --------------------- |
| ${1-9} | 第几个参数            |
| $0     | 当前脚本名            |
| $#     | 参数个数              |
| $@     | 所有参数(分开)        |
| $$     | 脚本的pid             |
| $?     | 上一条命令的返回值    |
| $!     | 最近一个后台认为的pid |

#### 环境变量

> export发布环境变量，只在子bash和当前bash有效。
> export a
> export -n a 撤销全局变量。

| 变量     |      |
| -------- | ---- |
| PATH     |      |
| HOME     |      |
| SHELL    |      |
| USER     |      |
| ID       |      |
| PWD      |      |
| TERM     |      |
| HOSTNAME |      |
|          |      |

#### 系统变量

| Variabel |                       |
| -------- | --------------------- |
| $0       | 当前脚本名            |
| $n       | 脚本的第n个变量       |
| $*       | 脚本的所有参数        |
| $#       | 参数个数              |
| $?       | 执行完后的状态。0成功 |
| $$       | 程序的pid             |

### 运算

```bash
a=10
$[a+1] #a不变
let a++ #变
```

### 条件

```bash
[ abc == abc ] #要有空格
[ -z $a ] #是否为空
[ 123 -eq 123 ] #等于
[ 1 -gt 2 ] #1>2
[ -le ] #小于
[ -le  ] #小于等于
[ -e ] #判断是存在 
[ - ] #
[  ] #
```

* ping通？

  ```shell
  ping -c 3 -i 0.2 ip
  #成功返回0
  ```


### 计划任务

> 一行为单位，一行一个计划
>
> \*	任意数	
> \-	1-2 4-5	
> /	每隔多长时间
> ,	2,3,7
>
> ```shell
> 分 时 日 月 周几  命令(绝对路径，witch查看)
> ```
>
> * 每天18:00到23:00，每隔30分钟执行
>
>   ```bash
>   */ 18-23 * * * 命令
>   ```
>
> 

## 条件循环

#### if

```shell
if conddtion; then 
	..
fi
#二分支
if condition;
	...
else
	...
fi
#多分枝
if condition;
	..
elif condiddion; then
	..
elif condition; then
	..
fi
```

### for

```shell
for 变量 in list
do
	..
done
# `sqe 10`生成1-10
#for i in {1..3}
```

### while

```shelll
while()
do
	..
done
```



### case
```shell
case $a in
case1)
	Operation;;
case2)
	Operation;;
*)
	Operation;;
esac
```
匹配到，最后会跳转到esac。
## 函数

```shell
#!/bin/bash
Max(){

}

```

* 截取

  ```shell
  [a:3:1]#从第三位开始，取1位
  ```

* 替换

  ```shell
  
  ```

  

* 删除

  ```shell
  ${a#pattern}  #变量a，从头匹配，
  ${a##pattern} #最长匹配
  ${a%patter} #结尾，删除最短匹配
  ```

# 包管理

## rpm

Redhat 系列linux的rpm(redhat package manager)软件包的管理工具。
/var/lib/rpm 包数据在这个文件下。
```bash
-a 全部包
-q 查询
-i 安装包
-v 显示进程
-h 使用\#来 显示进度
-e 删除包
-f 查询指定文件的软件包
-l 显示列表
-s 显示文件状态
```
```bash
rpm -qa  | grep str # 查询包含str的包的名称
rpm -q sever_name # 是否安装了这个
rpm -ivh  pack_name # 安装包
```
# 环境变量

# 权限

> 文件权限有三重(拥有者，所属组成员，其它用户)

* 权限严格顺序——  rwx，

|     | 对文件           | 对目录                |
| --- | ------------- | ------------------ |
| r   | read读 cat     | 是否查看ls             |
| w   | write写  vi    | 是否修改mkdir，touch，rm |
| x   | excute执行 bash | 进入cd               |

* 用进制代表

  > 101—— r-x 可读可执行，不能修改，101对应数字5修改文件权限

## 权限修改chmod

> 权限修改需要root

* 数字格式

> chamod file_name 757。
>
> 所属组的用户没有修改权，拥有者和其它用户有所有权限

* 字母格式

  > user--u，group--g，other(o)
  > 赋予=
  > 添加+
  > 删除-
  >
  > ```bash
  > chmod o+r file/目录 #为其它添加读
  > ```
## Acl
访问控制列表。
```bash
setfacl -Option  值 file
-m 修改
-x 删除
-b 删除所有

setfacl -m u:manager:rwx filename
```

## 特殊权限
> 4代表suid
> 2代表sgid
> 1代表sbit

#### setUid
二进制文件的才有的权限。
* 运行时获得所有者的权限。
* 可以利用进行提权。
* passwd默认具有s权限，但是无法执行命令。
#### setGid
对文件和目录生效。
文件：
* 和suid类似，只不过是把组暂时赋予
* /usr/bin/locate 具有sgid，组是slocate
目录:
* 目录新建的目录和文件自动继承组
#### sticky bit
粘连位，sbit。只对目录起作用
* 该目录下，只能删除自己创建的文件。
# 服务/进程 

## 系统运行级别
* 0：关机
* 1：单用户登录，只能登录root，进行系统维护
* 2：多用户模式，只不过没有NFS服务
* 3：完全多用户模式，默认的级别
* 4：特定的级别
* 5：Xll，图形化界面，有图形化界面启动的级别
* 6：重启
启动时运行级别由/etc/systemd/system/default.target 来控制。这是一个软连接，由/lib/systemd/system/runlevel*.target 创建来
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260722152335663.png)
 * runlevel
   查看当前等级
* init设置等级
```bash
init 0 关机
```
设置启动等级
* ln
  改变/etc/systemd/system/ 下的default.target 连接文件
* systemctl
  systemctl set-default runlevel*.target
## systemctl
管理服务的状态，会根据服务定义文件(name.service)，进行管理。
服务定义文件在以下目录
* /lib/systemd/system/
  这是系统默认的服务定义文件，比如sshd.service
* /etc/systemd/system/
  专门为用户提供的，存放用户服务定义文件的目录。
* /usr/lib/systemd/system/
  一些发行版可能将文件放到这里面
* /run/systemd/system/ 
  临时的定义文件存放位置
## 进程
进程分为：交互进程，批处理进程，守护进程

### 指令
#### ps
查看进程信息
#### pstree
#### top
按P键：以CPU使用时间进行排序
按M键：以内存使用率排序
按N键：以进程启动时间排序
按A键：以pid排序，按q键退出
#### kill
-9 强制停止

### 运行控制
控制进程在前台还是后台运行。
* 前台运行
  ctrlc 停，ctrlz 挂起
* 后台运行
  在运行程序的末尾加上&，进程将会在后台运行。结果不会在终端上显示。
  jobs -l 查看后台程序任务有哪些
  fg 将后台调到前台运行
  bg 转到后台

## yum

> 基于rpm，一次性安装依赖和本体

* 换源
  centos

  > 更换/etc/yum.repos.d/CentOS-Base.repo

* 搜索

  ```bash
  yum search
  ```

* 卸载

  ```bash
  yum remove
  ```

# 计划任务
## at
延迟任务调度。指定时间运行，只运行一次
```bash
at -f <filename> [-m 时间]
```
这里的时间可以是相对时间，3分钟后。也可以是绝对时间几年几月几日几时
```bash
at -f command.txt -m 10:00 tomorow/today/或MM/DD/YYYY
```
```bash
at -f -m now+2minites/hours/days/weeks
```

## crontab
计划周期性执行。

```bash
crontab -Options
-u 为指定用户创建任务.需要root
-l 查看计划表
-e 进入计划任务编辑界面，基本都要带
-r 删除，要root
```
crontab 计划任务文件存储在 /var/spool/cron
![image.png](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260722170631330.png)



# 常用指令


## 文件操作

### vi

#### 基本操作

| 操作       | 说明           |
| -------- | ------------ |
| gg       | 到第一行         |
| G        | 最后一行         |
| 数字 G     | 到第几行         |
| yy       | 复制所在列        |
| \#yy     | 复制从光标处开始的#行内 |
| 1，2yy    | 复制几行         |
| p        | 粘贴           |
| dd       | 删除行          |
| 数字dd:2dd |              |
| u        |              |
#### 替换

| 命令               | 功能                             |
|------------------|--------------------------------|
| :s /old/new      | 将当前行中查找到的第一个字符串“dd”替换为“new”    |
| :s /old/new/g    | 将当前行中查找到的所有字符串“old”替换为“new”    |
| :#,# s/old/new/g | 将行号“#，#”范围内替换所有的字符串“old”为“new” |
| :% s/old/new/g   | 在整个文件范围内替换所有的字符串“old”为“new”    |
| :s /old/new/c    | 在命令末尾加入c，将对每个替换动作进行提示，由用户进行确认  |
#### 其他命令

| 指令             | 说明          |
| -------------- | ----------- |
| :r \<filename> | 将文件导入到当前行   |
| :! \<bash>     | 执行命令行指令     |
| :r ! \<bash>   | 将命令结果写到光标位置 |


|           |          |
| --------- | -------- |
| /关键字      | 搜索       |
| :n        | 搜索结果的下一个 |
| :set nu   | 显示行号     |
| :set nonu | 关闭行号     |

### mkdir

> 创建目录

|     | 说明                 |
| --- | ------------------ |
| -m  | 设置权限 -m 755 [目录名称] |
| -p  | 创建多级目录 a/b/c       |

### touch

> 创建文件

### ln

* 创建软连接

ln -s <源路径\> <目标路径\>

* 创建软连接，任意位置可执行

sudo ln -s checksec /usr/local/bin/checksec

### cp

cp [-opt] file_name file_name2

| option |      |
| ------ | ---- |
| -r     | 递归 |
|        |      |



### rm

* rm  <dir\> dir 
* rm -r <dir\> 
  递归删除/文件夹
* rm -f <dir\>
  强制删除

### mv

> 剪切

### gzip

> 解压缩指令，只能对单个文件进行

| Option | 说明       |
| ------ | ---------- |
| -r     | 递归压缩   |
| -d     | 解压       |
| -k     | 保留源文件 |

### tar

> 将文件/目录打包为一个文件
> tar [Option] [tar后的fileName] [文件/目录] 

| Option | 说明                                          |
| ------ | --------------------------------------------- |
| -f     | 指定打包文件名(必须有)                        |
| -c     | 创建归档文件                                  |
| -C     | 指定解压目录                                  |
| -v     | 显示打包过程                                  |
| -u     | 更新已经创建的tar文件，用于向里面添加新的文件 |
| -t     | 查看打包内容                                  |
| -z     | 调用gzip压缩/解压                             |
| -j     | 调用bzip2                                     |
| -J     | 调用xz                                        |

### find

> 查找文件

| Option |         |     |
| ------ | ------- | --- |
| -name  | 按照文件名搜索 |     |
| -type  | 按照文件类型  |     |
| -perm  |         |     |
| -user  |         |     |
| -exec  |         |     |
|        |         |     |
|        |         |     |

### grep

> 搜索文件内容
>
> grep -Option keyWord 路径

| Option |                |
| ------ | -------------- |
| -i     | 忽略大小写     |
| -n     | 显示行号       |
| -I     | 忽略二进制文件 |
| -v     | 排除，支持正则 |

### scp

> Secure Copy。用于远程通过ssh复制问价
>
> ```bash
> scp [Option] 源 目标位置
> ```
>
> * 本地到远程
>
>   ```bash
>   scp /flag.txt user@host:/home/user/
>   ```
>
> * 

### 挂载

> 外部设备输入时，将设备内容映射到空目录(通常在/mnt/)。对于vmware，是镜像文件，目录/dev/sr0。

chown

> 修改文件/目录的拥有者/组
>
> chown [Option] user:group  文件/目录

| Option |      |
| ------ | ---- |
| -r     | 递归 |



## 信息命令

### uname

> 系统信息
> -a 所有信息

### ls

| 选项 |                                                           |
| ---- | --------------------------------------------------------- |
| -l   | 显示文件的类型(d代表目录)，权限，拥有者，所属组，创建时间 |
| -h   | 显示占用空间                                              |
| -a   | 也显示隐藏文件                                            |

### whoami

>  当前用户

### type

> 判断命令是外部还是内部命令

### history

> 查看历史目录

| 命令     | 作用          |
| -------- | ------------- |
| clear    | 清除          |
| wget url | 下载url处文件 |
|          |               |

### cat

> 查看全内容

* \>\>追加内容

  \> 覆盖

### tac

> 倒着cat

### head

> 前几行 -n指定几行

### tail

> 最后几行

| Option |      |
| ------ | ---- |
|        |      |



### more/less

> 以翻页的形式输出

> less可翻页，pg dn ，pgup

| Operation |        |
| --------- | ------ |
| d         | 翻半页 |
| 空格      | 翻一页 |
| enter     | 一行   |

### wc

> 统计文件内容信息

| Option |          |
| ------ | -------- |
| -l     | 只行数   |
| -w     | 只单词数 |
| -c     | 只字节数 |

### du

> 查看文件大小

| Option |              |
| ------ | ------------ |
| -h     | 选择合适单位 |
| -k     | 指定kb       |
| -m     | 指定mb       |
| -a     | 目录的空间   |
| -s     | 全部的看空间 |

### ps

> 显示进程（静态，当前）

| Option   |      |
| -------- | ---- |
| -e 或 -A | 全部 |
| -ef      | 详细 |

### top

> 查看进程占用的资源（动态）
>
> M: 内存降序排列
> P: cup使用率升序排
> 1：有多个时，可以显示详细

### free

> 查看内存的使用

### ss

> 查看端口监听

```bash
ss -ln
```



### netstat

> 需要安装net-tools

| Option |                  |
| ------ | ---------------- |
| -a     | 所有连接         |
| -t     | 只显示tcp        |
| -u     | 只显示udp        |
| -n     | 数字形式显示     |
| -l     | 只显示处于监听的 |
| -p     | 显示pid 和进程   |

## 其它

### systemctl

```bash
systemctl list-units --type service #运行的service
systemctl status sshd #服务状态
```

### enable

> 开机自启

### Hostnamectl

> 显示/更改主机名
>
> static:静态。transient:临时 pretty:灵活

```shell
hostnamectl --mode set-hostname name
```

### ln

> 创建软/硬连接
> ln -Option 源 目标
> 默认硬链接
>
> * 软连接：快捷方式
> * 硬链接：共享内容，但删除其中一个不会影响其它

| Option |        |
| ------ | ------ |
| -s     | 软连接 |

### rpm

> 

```bash
#查看rpm软件包
rpm -qa

#卸载rpm安装的
rpm -e rpm_name

#安装rpm
rpm -ivh xxx.rpm
```

### wget

网络工具包，包括tcpdump等

> yum instally

### kill

> 结束进程
>
> killall需要 安装`psmisc`

```bash
kill -9 pid
```

### source

### sed

> 非交互式修改文本。逐行操作
```bash
sed [选项] '地址1,地址2{命令1;命令2;...}' 文件
-n 	只输入p显式打印的
-i  直接修改
-e  执行命令
```

| 命令 | 全称            | 作用              |
|----|---------------|-----------------|
| p  | print         | 打印当前行（常与 -n 搭配） |
| d  | delete        | 删除当前行           |
| s  | substitute    | 替换文本：s/旧/新/     |
| n  | next          | 读取下一行           |
| a  | append        | 在当前行后追加文本       |
| i  | insert        | 在当前行前插入文本       |
| c  | change        | 替换整行内容          |
| w  | write         | 将当前行写入文件        |
| r  | read          | 从文件读取内容并插入      |
| q  | quit          | 退出 sed          |
| y  | transliterate | 字符转换            |
| =  |               | 打印当前行号          |
| {} |               | 将多个命令组合成一个命令块   |

```bash
sed 1d file #查看，除去第一行不修改1文件
sed -i 1d file #查看并删除文件第一行
```

* 替换文件内容

  ```shell
  sed 's/str1/str2' file #str1替换为str2，默认第一列
  sed 's/str1/str2/g' file #全部替换
  ```

### awk

> 文本处理工具。

```bash
awk 'pattern { action }' file
```
### unshare
用于创建命名空间，
```bash
unshare --option 程序 程序选项
```

| Options | 说明  |
| ------- | --- |
| -m      |     |
|         |     |
|         |     |


# iptables

> 防火墙工具，内核是netfilter，四表五链
> 链：流量处理
> 表：不同的功能

![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260728163711343.png)

### 表

* raw表
* mangle表
  
* nat表
  
* filter表
### 链
不同的表中有不同的链(方向)

* INPUT
  处理入站数据包
* OUTPUT
  处理出站数据包
* FORWARD
  处理转发数据包
* POSTROUTING
  在进行路由选择后处理数据包
* PREROUTING
  在进行路由选择前处理数据包
## 指令
不指定表名时，默认表示filter表
不指定链名时，默认表示该表内所有链
除非设置规则链的缺省策略,否则需要指定匹配条件

```c
iptables [-t 表名]  -options  [链名] [条件匹配] [-j 目标动作]

-A 在链尾追加一条新的规则
-I 在指定位置（或链首）插入一条新的规则
-P 设置指定链的默认策略
-L 列表查看各条规则信息
-D 删除指定位置或内容的规则
-F:清空规则链内的所有规则
-h 查看iptables命令的使用帮助

保存规则集：# service iptables save
备份规则集：# iptables-save > /etc/iptables-save
恢复规则集：# iptables-restore < /etc/iptables-save
```
条件匹配
```c
-p协议名
-d目的地址
-s源地址
-i接收用网络接口名
-o发送用网络接口名 
--sport源端口
--dport目标端口
--tcp-flags
--tcp-flags
```
ACCEPT:放行数据包
DROP:丢弃数据包
REJECT:拒绝数据包
SNAT:修改数据包的源地址信息
DNAT:修改数据包的目标地址信息

# firewalld


### 区域

| 区域名称     | 默认配置说明                                                              |
|----------|---------------------------------------------------------------------|
| Trusted  | 允许所有的传入流量                                                           |
| Home     | 允许与ssh、mdns、ipp-client、samba-client或dhcpv6-client预定义服务匹配的传入流量，其余均拒绝 |
| Internal | 默认值时与home区域相同                                                       |
| Work     | 允许与ssh、ipp-client或dhcpv6-client预定义服务匹配的传入流量，其余均拒绝                   |
| Public   | 允许与ssh或dhcpv6-client预定义服务匹配的传入流量，其余均拒绝。是新添加网络接口的默认区域。               |
| External | 允许与ssh预定义服务匹配的传入流量，其余均拒绝。默认将经过此区域转发的IPv4地址传出流量进行地址伪装。               |
| Dmz      | 允许与ssh预定义服务匹配的传入流量，其余均拒绝。                                           |
| Block    | 拒绝所有传入流量                                                            |
| Drop     | 丢弃所有传入流量                                                            |


### 配置
使用firewall-cmd 这个工具来配置
> 规则有两种：运行，永久（默认运行）
>
> firewall-cmd --zone=public --add-service=http 临时 立即生效
>
> firewall-cmd --zone=public --add-service=http  --permanent 永久 需要firewal-cmd --reload

```bash
--list-all //所有规则
--get-default-zone  //当前默认区域
--get-zones		所有可用的区域
```
* 区域
```bash
--get-zones
--get-default-zone  //当前默认区域


--add-interface=ens37 --zone=trusted  将接口加入区域
```
* 端口
```bash
--add-port=3306/tcp
-remove-port=3306/tcp
--add-port=2048-2050/udp --zone=public

--add-forward-port=port=8080:proto=tcp:toport=80 转发
```
* 服务
```bash
--add-service=http --add-service=https


```
# ufw

ubuntu的防火墙

```bash
ufw allow 端口/[tcp/udp]
sudo ufw status
```




# 内核
                 Linux Kernel
                      │
    ┌─────────────────┼──────────────────┐
    │                 │                  │
  进程管理         内存管理           文件系统
    │                 │                  │
    ├────IPC          ├──分页            ├──VFS
    ├────Signal       ├──页表            ├──inode
    ├────Namespace    ├──Cache           ├──dentry
    ├────Scheduler    ├──Swap            ├──ext4/xfs
    └────Cgroup       └──OOM             └──Buffer
            │
            │
      网络子系统
            │
      TCP/IP Socket

## 概述

linux内核 是一个单内核设计，所有的核心功能(进程调度，内存，文件管理等)都在这个内核地址内
## 内存
在32位 x86架构 linux 系统下，会为每个程序分配4g的虚拟内存，其中高1g为内核的内存，低3g为程序的内存。通过映射关系，映射到物理内存上。每个程序的内核空间映射到同一内核分页中。当物理内存不足时，cpu就是使用分页，置换。保证按需分配。
## IPC
Inter-Process-communication，进程间通信。指由内核维护，供多个进程共享和通信的机制。
不同的进程没有权限访问其他进程的内存。但是内核具有所有分页的控制。所以借由内核空间，让两个程序数据交互。其中有7中方法：管道，信号，消息队列，信号量，内存共享，套接字。
### Pipe

管道，本质是内核空间里的一个缓冲区。用于分为匿名管道和命名管道。
由于管道位于内核空间，程序并不能直接读取或写入。需要向内核请求，由内核进行读写。
管道根据有无名称分为 匿名管道 和 命名管道:
* 匿名管道：
  半双工，只能进行一方读写。
  只能用于有子父关系进程的通信。
* 命名管道
  
### signal
### queue
### share memery
### socket
### semaphore

## 命名空间

命名空间是资源隔离机制，将计算机的全局资源(进程，cpu，内存等)划分为多个区域，各个区域只能访问自己的空间，每个进程只能使用自己的命名空间资源。每个空间有自己的网络接口。

内核从2.6.15开始引入命名空间。
### PID命名空间

隔离：PID，进程之间的关系。
* 每个容器内部有 独立的 pid编号。互不影响。子容器有pid=1的init进程，
* 子容器无法查看父容器的pid信息。在父容器中能看到子容器的pid，两个容器中pid不同，子容器是1，父容器中可能是3234。
* 每个子容器都有自己的init进程，负责进程清理。删除init进程，导致整个容器进程退出。

>创建容器
>[[linux.md#unshare]]

```bash
unshare --pid --fork bash
```
### IPC命名空间


### NeotWork

### UTS

### Mount

### User
