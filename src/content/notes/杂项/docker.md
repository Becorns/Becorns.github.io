# 简介

docker，将服务的主体和依赖，以及环境打包。
用linux的namespace，cgroup等技术，隔离环境/独立资源。

* name

# 配置
/etc/docker/daemon.json
```json
{
  "registry-mirrors": [
    "https://docker.xuanyuan.me",
    "https://docker.1ms.run",
    "https://docker.m.daocloud.io"
  ],
}

```

/etc/systemd/system/docker.service.d/http-proxy.conf
```json
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7897"
Environment="HTTPS_PROXY=http://127.0.0.1:7897"
Environment="NO_PROXY=localhost,127.0.0.1"
```
# 操作

## 镜像操作

* 基础操作

```
docker pull/push image_name  向服务器拉取/推送镜像
docker search  //查找相关镜像
docker rmi -f [IMAGE ID]   //删除指定镜像
docker search	从hub搜索
```

* docker save -o file_name tar  镜像
  导出镜像为文件
* docker load -i file_name.tar 
  导入文件为镜像
* 构建images

```bash
docker build -t name{:tag} .
docker build -t name:v1 -f dockerfile111.xx .#
docker build --no-cache -t myapp .
docker tag old_image:latest new_image:v1
```



## 容器操作

* docker run [Option] images
  启动容器

| options   | 说明              | 例子 |
| --------- | ----------------- | ---- |
| -d        | 后台运行          |      |
| -it       | 交互式,           |      |
| --name    | 指定容器名称      |      |
| -p        | 主机port:容器port |      |
| -v        | 挂载              |      |
| --network | 网络模式          |      |

```bash
* docker ps  #正在运行的容器
* docker ps -a   #所有容器，包括退出的
```

```bash
* docker stop/start/restart container  #/停止/启动/重启容器
```

```bash
docker exec {option} cmd  #在容器中执行命令
-i 保持stdin输入
-t 使用tty 输出格式更接近shell
-it  进入容器
-u 	指定用户
-w  指定工作目录
-e	设置临时环境变量，本次执行生效
--priviledged 赋予特殊权限
-d 后台运行

```

* docker rm 容器
  删除容器

* docker attach 容器
  附加到容器工作台

* docker logs [-f] 容器

  查看日志。-f实时查看

* docker top 容器 
  查看容器内进程

## 数据卷

* docker volume create volume_name

  创建数据卷

* docker lolume ls
  查看本地数据卷

* docke volume inspect html
  查看数据卷信息

* docker volume rm html 
  删除数据卷

## 其它

* docker compose -f docker-compose.yml up -d --build
  在当前目录建立image并启动
* up -d

## docker network

```bash
docker network ls  #查看有哪些docker网络
```

# 架构

## 守护进程

docker daemon，负责接收客户端的请求，在后台创建一个服务端。服务端处理请求，client收到回复后，client就结束。

## 客户端

与守护进程通信，可以使用 pull，run，build等指令。这些指令会通过http api传递给daemon，

* 将lib依赖，扩展库，配置等打包，叫镜像(images)

* 将镜像运行，这个进程就是容器(Container)。形成一个进程。这些容器相互独立。

* 数据卷

  > 就是将容器中文件挂载到本机的目录

* cs模式

* 镜像的命名是 proper:tag 格式

# dockerfile

dockerfile是构建images的构建文件。告诉docker怎么构建image

```bash
FROM 		#基础镜像，一切从这里开始构建
MAINTAINER	#镜像是谁写的，姓名+邮箱
RUN			#镜像构建时需要运行的命令
ADD			#步骤，tomcat镜像，这个tomcat压缩包；添加内容
WORKDIR		#镜像工作目录
VOLUME		#挂载的目录
EXPOSE		#暴露端口配置
CMD			#指定这个容器启动的时候要运行的命令,只有最后一个会生效，可被替代
ENTRYPOINT	#指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD		#当构建一个被继承DockerFile 这个时候就会运行 ONBUILD 的指令，触发指令
COPY		#类似ADD,将我们的文件拷贝至镜像中
ENV			#构建的时候设置环境变量
```

# docker sdk

[reference](https://blog.csdn.net/Dxy1239310216/article/details/149355198)

* 连接

```python
docker_client=docker.from_env() #本地docker

docker_client=docker.DockerClient(base_url="tcp://ip:port") #连接远程引擎
client.info()  # 获取Docker系统信息
client.version()  # 查看API版本
```

* 镜像操作

```python
image = client.images.pull('nginx:latest')
image, logs = client.images.build(path='./dockerfile_dir', tag='myapp:v1')

#上传本地镜像到仓库
client.login(username='admin', password='123456', registry='registry.example.com')
for line in client.images.push('myapp:v1', stream=True):
    print(line)
client.images.remove('myapp:v1', force=True)
```

* 容器操作

```python
# 创建并启动容器
container = client.containers.run(
    'python:3.9-slim', 
    command='python app.py', 
    detach=True, 
    name='my_python_app',
    ports={'5000/tcp': 5000}  # 端口映射
)
container = client.containers.get()


container.start()
container.stop()
container.restart()
container.remove(force=True) 

logs = container.logs(stream=True)
for log in logs:
    print(log.decode('utf-8').strip())
```

* 网络操作

```python
network = client.networks.create('my_network', driver='bridge')

# 连接容器到网络
container = client.containers.get('my_python_app')
network.connect(container)

# 断开网络连接
network.disconnect(container)

```

