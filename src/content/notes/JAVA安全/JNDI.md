# jndi概述

java 命名和目录 接口 (Java Naming Direcotory Interface )

先了解为什么需要jndi，以前企业中有很多查找的服务(DNS，RMI，ldap，找文件等)。调用这些服务的api都不同。服务多了，项目大了，而且分布式系统逐渐发展。就难管理。所以就需要统一的调用方式。采用的方法就是为这些服务资源命名，将服务的配置/调用交给容器(tomcat,WebLogic,JBoss等)，容器把命名和资源绑定。需要使用时只需要提供资源名称。我们不用管资源是DNS还是RMI。


核心是 **命名**和 **目录**:

* 命名：
  为资源起名，通过lookup()找到资源对象，返回Object

  ```java
  Context ctx = new InitialContext();  #初始化
  Object db = ctx.lookup("java:comp/env/jdbc/RDB");   #查找对象
  ```

  `jdbc/RDB` 就是一个名字 ，而`java:comp/env/` 是一个前缀，不同的服务前缀不同，这里的java:comp 就是表示当前java组件的命名空间(容器自动创建的 )。常见java命名空间：

  ```java
  java:
   ├── comp     ← 当前组件
   ├── module   ← 当前模块
   ├── app      ← 当前应用
   └── global   ← 全局共享
  ```

  jndi根据uri去找对应的服务提供者(RMI，LDAP，DNS等)

  ```java
  Object obj = ctx.lookup("rmi://localhost:1099/HelloService")  // rmi调用
  Object obj = ctx.lookup("ldap://localhost:389") 	// ldap
  Object obj = ctx.lookup("ldap://10.0.0.1/ou=users,dc=example,dc=com")
  Object obj = ctx.lookup("dns://8.8.8.8/www.baidu.com") 	
  Object obj = ctx.lookup("file:/tmp/config")
  Object obj = ctx.lookup("")
  Object obj = ctx.lookup("")
  ```

* 目录：
  命名可以说是名字-资源的映射，目录是数据库(树状，带有属性)。目录可以查到资源的属性，比如RMi，可以查找Registry的表

![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260516145057450.png)

# jndi注入

lookup是根据uri去检索资源的，如果uri可控。就会造成漏洞。
比如 控制 uri  "rmi://ip/hack"。
jndi对jdk版本有要求：

| 协议 | JDK6      | JDK7      | JDK8      | JDK11      |
| ---- | --------- | --------- | --------- | ---------- |
| LADP | 6u211以下 | 7u201以下 | 8u191以下 | 11.0.1以下 |
| RMI  | 6u132以下 | 7u122以下 | 8u113以下 | 无         |

既然jndi 能检索多种服务，那么漏洞组合也有很多:jndi+rmi，jndi+ldap等

# jndi+rmi

正常调用流程：rmi注册远程对象，jndi调用。这样代码运行是在rmi服务器上。
恶意调用流程：rmi不直接注册远程对象，而是先实现一个Reference，收到后会按照Reference的信息去下载class到本地，再运行。但是reference不是远程对象，不能绑定到rmi注册上，所以包装一层ReferenceWrapper，这样就可以将reference注册

## rmi-Server

也就是攻击端

```java

```

## jndi-Client

受害机

```java

```

