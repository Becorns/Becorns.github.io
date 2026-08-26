## [PHP伪协议](https://www.php.net/manual/zh/wrappers.php.php)：

php内置的协议，用自定义的协议在web服务器和php脚本之间的通信。允许php能直接访问服务器资源。不用通过http协仪

* 支持的伪协议：

  * ```php
    file://  访问本地文件系统 
    http://  	访问http网址
    php://		访问各个输入/输出流
    ftp://		访问文件url
    zlib://		压缩流
    data://		数据
    glob://		查找匹配的文件路径模式
    phar://		php归档
    ssh2://		secure shell 2
    rar:// 		RAR
    ogg://		音频流
    expect://	交互式处理的流
    ```

## php://

* ### 条件：（php.ini配置）

|              | allow_url_fopen | allow_url_include |
| ------------ | --------------- | ----------------- |
| php://input  | on/off          | on                |
| php://stdin  | on/off          | on                |
| php://memory | on/off          | on                |
| php://temp   | on/off          | on                |
| php://filter | on/off          | on/off            |

### php://filter

封装器，允许将文件内容作为数据流处理，封装器可以对文件进行解码，解压缩等操作。按照指定的过滤器进行过滤。当被包含函数包含时，会把文件内容当作代码执行

* ##### 参数：

|   fds  |   fds  |
| --- | --- |
|     |     |

| 名称        | 描述                     |
| --------- | ---------------------- |
| resource= | 必须，指定要处理的数据流(文件名)      |
| read=     | 可选，可设定一个或多个筛选过滤器，读文件使用 |
| write=    | 可选，用于写文件时使用，           |

* ##### read/write过滤器：

  * **string**字符串过滤器：
    通常用string开头，每个字符都进行同样方式处理
  
| 过滤器            | 作用         |
| ----------------- | ------------ |
| string.rot13      | 向右移动13位 |
| string.toupper    | 大写         |
| string.tolower    | 小写         |
| string.strip_tags | 去除XML标签  |
|                   |              |
  
    

  * **convert**转换过滤器：
    对数据流进行编码，用来读取文件源码。
  
| 过滤器                       | 作用                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| convert.base64-encode/decode | 64解码/编码                                                  |
| convert.quoted-printable     | 转为可打印字符                                               |
| convert.iconv.*.**           | iconv是一种字符集转换工具。可以在不同的字符集之间转换。*代表原字符集，**目标字符集 |
  
    > 常见字符编码：
    >  UCS-4*
    >  UCS-4BE
    >  UCS-4LE*
    >  UCS-4LE
    >  UCS-2
    >  UCS-2BE
    >  UCS-2LE
    >  UTF-32*
    >  UTF-32BE*
    >  UTF-32LE*
    >  UTF-16*
    >  UTF-16BE*
    >  UTF-16LE*
    >  UTF-7
    >  UTF7-IMAP
    >  UTF-8*
    >  ASCII*
    >  EUC-JP*
    >  SJIS*
    >  eucJP-win*
    >  SJIS-win*
  
  * **compression**压缩过滤器
  
  * **mcrypt**加密过滤器

* ##### 常用：

  * 获取取源码
  
  ```
  php://filter/reader=convert.base64-encode/resource=filename
  //将文件内容加密，不让他执行，从而获取源码
  php://filter/resource=filename
  ```
  
  * 死亡exit()绕过
    >文件中有<php? exit();?\>。遇到会直接结束，不会执行后面的代码。
    >
    >一般情况会把exit拼接到输入的webshell前面。
    >
    >所以把webshell经过base64加密。在输入。然后利用strip_tag消除exit功能。再base64解密还原shell。为了在解码时不破坏结构，exit过滤后只有phpexit。所以在**webshell前面添加一个字母**
  
    绕过
  
    > <?php exit();?\>实际上是一个php标签。filter有一个string.strip_tags过滤器。可以把html和php标签删除。exit()过滤掉。**7.3后移除**
    >
    > ```
    > php://filter/read=string.strip_tags|convert.base64-encode/resource=
    > ```
  
    > 和上面base64加解密相同，可以用string.rot13（一个替换密码）加解密。
  

### php://==input==



> enctype="multipart/form-data" 的时候 php://input 是无效的。 
> 

## data://

> 可以让用户控制输入流。和包含函数结合时，输入的流会作为代码执行

* 使用

  > 1.data://text/plain,post输入
  > ?file=data://text/plain,<?php%20phpinfo();?\>
  >
  > 2.data://text/plain;base64,输入
  > ?file=data://text/plain;base64,base64编码

## file://

> 不受allow_url_fopen,allow_url_include影响。读取文件
> file:///etc/password
> file:///C:\usr\f

## zip://

> 访问压缩包内容，遇到包含文件流作为代码执行
> zip://[压缩包绝对路径]%23[压缩包内文件]：
> zip://D:\zip.jpg%23phpinfo.txt