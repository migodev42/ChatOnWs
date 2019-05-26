const ws= new WebSocket("ws://localhost:3000/chatRoom");
const wsClientPrefix='ws client: ';

ws.addEventListener('open', async ()=>{
  console.log(wsClientPrefix,'ws 连接已建立');
})