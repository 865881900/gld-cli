#1:gld-cli
> 自用脚手架


### 安装
``` sh
npm install -g gld-cli
```

#2: 使用

##2-1: 使用gld-cli 生成vue项目
##### 在该目录下创建projectName项目
``` sh
gld-cli vue projectName
```
##### 以该目录为根目录,创建项目
```sh
gld-cli vue .
```
| 配置参数                 |说明|
|----------------------|------------------------|
| -f, --force          | 如果目录已经存在,使用该参数会覆盖该目录的内容|
| --merge              | 合并当前目录的内容|
| -m, --packageManager | 指定npm包的管理客户端: yarn/pnpm/npm,默认为npm|

##2-2: 使用gld-cli 生成node项目
##### 在该目录下创建projectName项目
``` sh
gld-cli node projectName
```
##### 以该目录为根目录,创建项目
```sh
gld-cli vue .
```
| 配置参数                    | 说明                                                                      |
|-------------------------|-------------------------------------------------------------------------|
| -f, --force             | 如果目录已经存在,使用该参数会覆盖该目录的内容                                                 |
| --merge                 | 合并当前目录的内容                                                               |
| -m, --packageManager    | 指定npm包的管理客户端: yarn/pnpm/npm,默认为npm                                      |
| -gub, --gitUrlAndBranch | 项目需要关联的git仓库地址, 如果要指定分支,使用#分隔; 示例: https://github.com/***/**.git#master |


## 3: 模块
##### api前端缓存模块
##### 动态路由/动态菜单栏模块
