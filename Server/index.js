const koa=require('koa');
const http=require('http');
const webSocket=require('ws');
const fs=require('fs');
const path=require('path')

const app=new koa();
const wsChat=new webSocket.Server({noServer:true});
const wsServerPrefix='ws Server: ';

app.use(async (ctx,next)=>{
  ctx.type='html';
  const htmlPath=path.resolve(__dirname,'../Front');
  ctx.body=await fs.readFileSync(path.join(htmlPath,'/index.html'));
})




const server=http.createServer(app.callback());

server.on('upgrade',async (req,socket,upgradeHeader)=>{
  console.log(wsServerPrefix,'收到协议升级请求',req.url);
  
  if(req.url==='/Chat'){
    
    wsChat.handleUpgrade(req, socket, upgradeHeader, function done(ws) {
      wsChat.emit('connection', ws, req);
      console.log(wsServerPrefix,'webSocket连接已建立');
      
      // ws.onopen=function(){
      //   console.log(wsServerPrefix,'webSocket连接已建立');
      // }

      ws.onmessage=function(msg){
        console.log(wsServerPrefix,'webSocket收到Message');
        console.log(msg);
        const {type,data,target}=msg;
        const receive=JSON.parse(data);
        if(receive.type==="msg"){
          // ws.send(receive.value); // 单播，哪个客户端传，返回给哪个客户端

          // 广播，一个传，发给所有
          wsChat.clients.forEach(function each(client) {
            // client !== ws //不给自己发
            if (client.readyState === webSocket.OPEN) {
              client.send(receive.value);
            }
          });
        }
        
      }

      ws.onerror=function(){
        console.log(wsServerPrefix,'webSocket连接出错');
      }

      ws.onclose=function(){
        console.log(wsServerPrefix,'webSocket连接已关闭');
      }

      
    });

  }else{
    socket.destroy();
  }
  
  

})

server.listen(3000);
// app.listen(3000)
console.log('server is runnig')
