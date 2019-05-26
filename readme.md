使用Node+koa+ws搭一个（暂时）十分简陋的在线聊天项目。

### 启动服务器
```
npm start
```

### 项目结构
- 生成
```
/* 生成项目结构的markdown > directortList.md(默认) */

> npx mddir
```
- 结构
```
|-- ChatOnWS
    |-- directoryList.md    mddir生成的项目结构.md
    |-- package-lock.json
    |-- package.json
    |-- readme.md
    |-- Front               前端文件目录
    |   |-- index.html
    |   |-- websocket.js
    |-- Server              服务端文件目录          
        |-- handleWsConn.js
        |-- index.js
```

