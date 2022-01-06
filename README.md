# 爬虫下载一条龙

## 请求体数据结构

| 版本号 | 头部长度 | id | 请求标识长度 | 消息体类型 | 消息体长度 | 保留选项 | 请求标识 | 消息主体 |
| :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: |
| 4 | 4 | 16 | 8 | 4 | 16 | 32 | 任意长度 | 任意长度 |

### 版本号
默认01
### 头部长度
默认54
### 请求标识长度
根据请求标识长度来确定具体数值
### 消息体类型
buffer 01
string 02
json 03
### 消息体长度
根据消息主体长度来确定具体数值
### 保留选项
根据不同的请求来确定具体内容
