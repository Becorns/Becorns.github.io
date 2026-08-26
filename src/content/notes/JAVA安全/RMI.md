# 协议简介

RMI(remote method invocation)：远程方法调用。
用于实现分布式计算。RMI允许JVW的对象调用另一台计算机JVM上的方法。

# 原理

<img src="https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260424132039224.png" style="zoom: 80%;" />

```java
① 服务端：
   - 创建对象 helloImpl
   - exportObject → 生成 stub + 开启监听端口
   - 注册到 Registry（key: sayhello_key）

② 客户端：
   - 连接 Registry（IP + 端口）
   - lookup("sayhello_key") → 获取 stub

③ 调用过程：
   client 调用 stub.sayHello()

   ↓
   stub：
     - 序列化参数
     - 发送到服务端（IP + 动态端口）

   ↓
   服务端：
     - 反序列化参数
     - 调用 helloImpl.sayHello()

   ↓
   返回结果（再序列化）

   ↓
   客户端反序列化
```



# 例子1

### 接口

> 接口继承remote，定义方法，需要 throw remoteException

```java
public interface hello extends Remote {
    String sayHello(String input) throws RemoteException;
}
```

### 服务端

```java
public class helloImpl implements hello{
    @Override
    public String sayHello(String input) throws RemoteException {
        return input;
    }
}
//服务类，实现接口，客户端要调用的
```

```java
public class Server {
    public  static void main(String args[]) throws RemoteException {
        hello skeleton = (hello) UnicastRemoteObject.exportObject(new helloImpl(),0);  //skeleton，真正调用方法并返回，类似代理对象
        Registry registry = LocateRegistry.createRegistry(1011); //注册到RMI Registry，客户端通过端口获取有哪些服务

        registry.rebind("sayhello_key",skeleton);  //将skeleton 绑定到Registry，简单说客户端通过sayhello_key,在registry中找到skeletong，进而调用new helloImpl的方法。
    }
}

```

### 客户端

```java
   public static void main(String args[]) throws RemoteException, NotBoundException {
        Registry registry = LocateRegistry.getRegistry("localhost", 1011);  //stub，包含服务器ip，端口。
        hello sayHello = (hello) registry.lookup("sayhello_key");   //寻找registry中，sayhello_key的 对象

        String output = sayHello.sayHello("Hello, RMI");   //调用方法
        System.out.println(output);
    }
```

# RMI 动态类加载

java.rmi.server.codebase 用于指定 RMI 字节码位置，告诉服务端 哪里可以找到指定的类文件。
确保客户端能加载服务端不存在的类。

RMI中，若客户端传递一个可以序列化对象，但是这个对象在服务端不存在，会抛出异常。
RMI支持动态加载类。如果设置了codebase，会尝试从codebase的地址获取.class，并反序列化。

开启codebase：

* 代码

  ```java
  System.setProperty("java.rmi.server.codebase", "http://127.0.0.1:9999/");
  ```

* 运行参数

  ```bash
  java -Djava.rmi.server.codebase="http://127.0.0.1:9999/" RMIServer
  ```

* 安全策略文件

  ```
  
  ```

  

# RMI 攻击

针对客户端的攻击

开启了codebase，可以从远处下载类class，如果一个类：
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260516124058657.png)

初始化会执行恶意代码。
