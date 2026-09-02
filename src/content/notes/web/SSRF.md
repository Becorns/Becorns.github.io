---
date: 2025-01-15
---

[SSRF](https://blog.csdn.net/qq_48904485/article/details/123653514?ops_request_misc=&request_id=&biz_id=102&utm_term=SSRF&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-3-123653514.142^v100^pc_search_result_base5&spm=1018.2226.3001.4187)：服务端伪造请求


## 1.NAT：(网络地址转换）

#### NAT端口映射(PAT)

dhcp分配私网ip。设备请求送到NAT设备(防火墙/路由器)，NAT设备将私有ip换为自己的公网ip，并替换端口。然后发送给服务器。得到响应后，根据端口将数据包发送给指定设备

#### 静态NAT地址转换

一个设备一个公网ip

#### 动态NAT

从ip池中分配公网ip，链接结束后释放公网ip

## 2.原理

无法访问的内部系统A。但另一个目标B可以访问A。伪造请求让B去访问A的一些数据。

#### file_get_content()

#### fsockopen()

#### curl_exec()

## 利用

![5004a6758d3cab84ec484b7f91770605|311](D:\picture\node\5004a6758d3cab84ec484b7f91770605.png)

#### 可能出现的地方：

> 1.社交分享功能：获取超链接
>
> 2.转码服务：通过URL地址把内容调整使它适合手机浏览
>
> 3.在线翻译网站：将指定url网页翻译
>
> 4.图片下载/加载：
>
> 5.图片/文章收藏功能：主要其会取URL地址中title以及文本的内容作为显示以求一个好的用具体验
>
> 6.云服务厂商：它会远程执行一些命令来判断网站是否存活等，所以如果可以捕获相应的信息，就可以进行ssrf测试
>
> 7.网站采集，网站抓取的地方：一些网站会针对你输入的url进行一些信息采集工作
>
> 8.数据库内置功能：数据库的比如mongodb的copyDatabase函数
>
> 9.邮件系统：比如接收邮件服务器地址
>
> 10.编码处理, 属性信息处理，文件处理：比如ffpmg，ImageMagick，docx，pdf，xml处理器等
>
> 11.未公开的api实现以及其他扩展调用URL的功能：可以利用google 语法加上这些关键字去寻找SSRF漏洞。一些的url中的关键字：share、wap、url、link、src、source、target、u、3g、display、sourceURl、imageURL、domain……
>
> 12.从远程服务器请求资源（upload from url 如discuz！；import & expost rss feed 如web blog；使用了xml引擎对象的地方 如wordpress xmlrpc.php）

url:

> share  
> wap  
> url  
> link  
> src  
> source  
> target  
> u  
> 3g  
> display  
> sourceURl  
> imageURL  
> domain  

#### 判断

> 1.排除法：浏览器f12查看源代码看是否是在本地进行了请求。比如：该资源地址类型为 http://www.xxx.com/a.php?image=（地址）的就可能存在SSRF漏洞
>
> 2.dnslog等工具进行测试，看是否被访问
>
> 3.可以在盲打后台用例中将当前准备请求的uri 和参数编码成base64，这样盲打后台解码后就知道是哪台机器哪个cgi触发的请求。
>
> 4.抓包分析发送的请求是不是由服务器的发送的，如果不是客户端发出的请求，则有可能是，接着找存在HTTP服务的内网地址
>
> 5.从漏洞平台中的历史漏洞寻找泄漏的存在web应用内网地址
> 通过二级域名暴力猜解工具模糊猜测内网地址
>
> 6.直接返回的Banner、title、content等信息
> 留意bool型SSRF
>

## 用协议内网信息收集

#### file://

> 一种URL协议，表示访问本地文件，
>
> file://[host[path],host省略表示本地

```php
file:///etc/passwd 
file:///etc/hosts  #查看当前设备的网段
file:///proc/net/arp   #显示arp缓存标 配合burpsuit找出所有的服务器
```

#### dict:\//访问字典资源

```php
dict://ip:port ##ip用file扫出了
#根据响应长短查看。开着的端口响应长   
```



#### ftp:\//端口扫描

和dict差不多，查看响应时间判断端口是否开启。查看但时间长。

#### http:\//扫描有哪些网页

#### sftp:/\/SSH文件传输协议或安全文件传输协议

#### ldap:/\/轻量级目录访问协议

#### ftfp:\//简单文件传输协议

#### gopher:\//分布式文档传递服f务

```
#goupher不会转发第一个字符
使用方法：gopher://ip:port/_payload(需要%0d%0A回车换行)    默认端口是70
```

### 



## 绕过

#### @符绕过

对于URL,实际访问的URL是以URL之后为准。`www.baidu.com@www.bilibili.com

> abc@host
> abc是作为用户名
> host是访问的主机	

#### 域名解析绕过

网站后面加xip.io    nip.io

> 域名+ip.xip.io。会解析为ip
> 用于测试子域名，或绕过web不能使用ip访问

#### ip进制转换

转换为8进制，16进制等

#### [Enclosed numbers](https://symbl.cc/cn/unicode/blocks/enclosed-alphanumerics/)

用被圆圈或者括号封闭起来的数字或字母
①②⑦.⓿.⓿.①

#### 添加端口号绕过

127.0.0.1:8080

#### 短网址绕过

> 短网址，将URL简化。
>
>
> 原理：将长连接交予短域名服务器S1，获得映射到S1的短链接，当访问短链接，S1会返回重定向信息。定位到原链接
> 国外：[bit.ly](https://bitly.com/)   [t.co](http://t.co/) [tinyurl](http://tinyurl.com/)
>
> 国内：[urlc]([](https://www.urlc.cn/))

#### URL重定向

> 诱导服务器访问网站，控制网站302实现重定向，让服务器访问内网。
>
> 结合gophera;// . file:// 实现想要操作

#### DNS重绑定

> 先绑定一个正常ip，让服务器解析该域名，更新解析缓存，通过判定。短时间内DNS服务器不会更新该域名的ip。利用这个时间差，将域名绑定的ip更换为内网ip。实现访问内网。

